import { useEffect, useRef, useState } from "react";
import { Map, MapStyle, config } from "@maptiler/sdk";
import { SegmentedControl, Slider } from "@radix-ui/themes";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import {
  WindLayer,
  PrecipitationLayer,
  TemperatureLayer,
  PressureLayer,
  RadarLayer,
  ColorRamp,
} from "@maptiler/weather";
import "../styles/map.css";

const DARK_STYLE = MapStyle.DATAVIZ?.DARK ?? MapStyle.DARKMATTER;
const STYLE_OPTIONS = {
  Streets: MapStyle.STREETS,
  Satellite: MapStyle.SATELLITE,
  Dark: DARK_STYLE,
  Hybrid: MapStyle.HYBRID,
  Outdoor: MapStyle.OUTDOOR,
};

const HOUR_MS = 3600000;

export default function SdkMap({ weather }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  // state
  const [styleLabel, setStyleLabel] = useState("Streets");
  const [activeLayer, setActiveLayer] = useState("wind"); // initial weather layer
  const [progress, setProgress] = useState(0);            // 0..100 for Slider
  const [timeLabel, setTimeLabel] = useState("");         // current frame label
  const [rangeLabels, setRangeLabels] = useState({ start: "", end: "" }); // range labels
  const [sliderStep, setSliderStep] = useState(1);        // % step per hour (computed)

  // refs to DOM controls
  const playPauseBtnRef = useRef(null);
  const pointerDataRef = useRef(null);
  const currentStyleRef = useRef("Streets");
  const dateFmt = useRef(
    new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    })
  );

  // timeline range (ms epoch)
  const animRangeRef = useRef({ start: null, end: null });

  // misc refs
  const pointerLngLatRef = useRef(null);
  const isPlayingRef = useRef(false);
  const currentTimeRef = useRef(null);

  // scrub state (so we pause while dragging, resume after)
  const isScrubbingRef = useRef(false);
  const wasPlayingBeforeScrubRef = useRef(false);

  // store layer instances + metadata
  const weatherLayersRef = useRef({
    precipitation: { layer: null, value: "value", units: " mm" },
    pressure: { layer: null, value: "value", units: " hPa" },
    radar: { layer: null, value: "value", units: " dBZ" },
    temperature: { layer: null, value: "value", units: "°" },
    wind: { layer: null, value: "speedMetersPerSecond", units: " m/s" },
  });

  // helpers
  function pauseAnimation(layer) {
    layer?.animateByFactor(0);
    if (playPauseBtnRef.current)
      playPauseBtnRef.current.innerText = "Play 3600x";
    isPlayingRef.current = false;
  }
  function playAnimation(layer) {
    layer?.animateByFactor(3600);
    if (playPauseBtnRef.current) playPauseBtnRef.current.innerText = "Pause";
    isPlayingRef.current = true;
  }
  function refreshTime() {
    const wl = weatherLayersRef.current[activeLayer]?.layer;
    if (!wl) return;
    const d = wl.getAnimationTimeDate();
    setTimeLabel(dateFmt.current.format(d));
  }
  function updateProgressFromLayer(wl) {
    const now = +wl.getAnimationTimeDate();
    const { start, end } = animRangeRef.current;
    if (!start || !end) return;
    const p = ((now - start) / (end - start)) * 100;
    setProgress(Number.isFinite(p) ? Math.max(0, Math.min(100, p)) : 0);
  }
  function changeLayerAnimation(wl) {
    if (!wl) return;
    if (!isScrubbingRef.current) {
      if (isPlayingRef.current) playAnimation(wl);
      else pauseAnimation(wl);
    }
    updateProgressFromLayer(wl);
  }
  function updatePointerValue(lngLat) {
    if (!lngLat) return;
    pointerLngLatRef.current = lngLat;
    const entry = weatherLayersRef.current[activeLayer];
    const wl = entry?.layer;
    if (!wl) {
      if (pointerDataRef.current) pointerDataRef.current.innerText = "";
      return;
    }
    const value = wl.pickAt(lngLat.lng, lngLat.lat);
    if (!value) {
      if (pointerDataRef.current) pointerDataRef.current.innerText = "";
      return;
    }
    const units = entry.units;
    const key = entry.value;
    if (pointerDataRef.current) {
      const num =
        typeof value[key] === "number" ? value[key].toFixed(1) : value[key];
      pointerDataRef.current.innerText = `${num}${units}`;
    }
  }

  function snapMsToHour(ms) {
    // Round to nearest hour in UTC (epoch ms)
    return Math.round(ms / HOUR_MS) * HOUR_MS;
  }

  // convert progress (0..100) to seconds for setAnimationTime, snapping to hour
  function seekLayerToProgressSnapped(p) {
    const wl = weatherLayersRef.current[activeLayer]?.layer;
    const { start, end } = animRangeRef.current;
    if (!wl || !start || !end) return;

    const clamped = Math.max(0, Math.min(100, p));
    const rawMs = start + (clamped / 100) * (end - start);
    const snapMs = snapMsToHour(rawMs);

    // clamp snapped time to range, in case rounding overshoots
    const boundedMs = Math.max(start, Math.min(end, snapMs));

    wl.setAnimationTime(boundedMs / 1000); // expects seconds

    // update UI to the snapped position
    const snappedPct = ((boundedMs - start) / (end - start)) * 100;
    setProgress(Number.isFinite(snappedPct) ? snappedPct : clamped);
    setTimeLabel(dateFmt.current.format(new Date(boundedMs)));
  }

  // create a weather layer (once per type)
  function createWeatherLayer(type) {
    let wl = null;
    switch (type) {
      case "precipitation":
        wl = new PrecipitationLayer({ id: "precipitation" });
        break;
      case "pressure":
        wl = new PressureLayer({ opacity: 0.8, id: "pressure" });
        break;
      case "radar":
        wl = new RadarLayer({ opacity: 0.8, id: "radar" });
        break;
      case "temperature":
        wl = new TemperatureLayer({
          colorramp: ColorRamp.builtin.TEMPERATURE_3,
          id: "temperature",
        });
        break;
      case "wind":
        wl = new WindLayer({ id: "wind" });
        break;
      default:
        return null;
    }

    // events
    wl.on("sourceReady", () => {
      // time range known
      const startDate = wl.getAnimationStartDate();
      const endDate = wl.getAnimationEndDate();
      animRangeRef.current = { start: +startDate, end: +endDate };

      // compute slider step = percentage of one hour
      const total = animRangeRef.current.end - animRangeRef.current.start;
      const pctPerHour = total > 0 ? (HOUR_MS / total) * 100 : 1;
      // clamp to avoid 0 or crazy small steps
      setSliderStep(Math.max(0.1, Math.min(100, pctPerHour)));

      setRangeLabels({
        start: dateFmt.current.format(startDate),
        end: dateFmt.current.format(endDate),
      });

      updateProgressFromLayer(wl);
      refreshTime();
      changeLayerAnimation(wl); // maintain play/pause
    });

    wl.on("tick", () => {
      // while playing, keep UI in sync (but don't fight scrubbing)
      if (!isScrubbingRef.current) {
        refreshTime();
        updatePointerValue(pointerLngLatRef.current);
        updateProgressFromLayer(wl);
      }
    });

    wl.on("animationTimeSet", () => {
      // called when we seek or programmatically change time
      refreshTime();
      if (!isScrubbingRef.current) updateProgressFromLayer(wl);
    });

    weatherLayersRef.current[type].layer = wl;
    return wl;
  }

  // change active weather layer
  function changeWeatherLayer(type) {
    const map = mapRef.current;
    if (!map || type === activeLayer) return;

    const prevType = activeLayer;
    const prevEntry = weatherLayersRef.current[prevType];
    const prevLayer = prevEntry?.layer;

    if (prevLayer && map.getLayer(prevType)) {
      currentTimeRef.current = prevLayer.getAnimationTime();
      map.setLayoutProperty(prevType, "visibility", "none");
    }

    const nextEntry = weatherLayersRef.current[type];
    const nextLayer = nextEntry.layer || createWeatherLayer(type);

    if (map.getLayer(type)) {
      map.setLayoutProperty(type, "visibility", "visible");
    } else {
      map.addLayer(nextLayer, "Water");
    }

    setActiveLayer(type);
    changeLayerAnimation(nextLayer);
  }

  // create map once
  useEffect(() => {
    if (mapRef.current) return;

    config.apiKey = import.meta.env.VITE_MAPTILER_KEY;

    const map = (mapRef.current = new Map({
      container: containerRef.current,
      style: STYLE_OPTIONS[styleLabel],
      center: [weather.longitude, weather.latitude],
      zoom: 5,
      hash: true,
      projectionControl: true,
      projection: "globe",
    }));

    map.on("load", () => {
      if (map.getLayer("Water")) {
        map.setPaintProperty("Water", "fill-color", "rgba(0, 0, 0, 0.4)");
      }
      changeWeatherLayer(activeLayer);
    });

    map.on("mousemove", (e) => updatePointerValue(e.lngLat));
    map.on("mouseout", (evt) => {
      if (!evt.originalEvent.relatedTarget && pointerDataRef.current) {
        pointerDataRef.current.innerText = "";
        pointerLngLatRef.current = null;
      }
    });

    return () => {
      Object.values(weatherLayersRef.current).forEach((v) => v.layer?.remove());
      mapRef.current?.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weather.latitude, weather.longitude]);

  // safe basemap style switching
  useEffect(() => {
    const map = mapRef.current;
    const nextStyle = STYLE_OPTIONS[styleLabel];
    if (!map || !nextStyle) return;

    if (styleLabel === currentStyleRef.current) return;

    const apply = () => {
      map.setStyle(nextStyle);
      map.once("load", () => {
        if (activeLayer) changeWeatherLayer(activeLayer);
        currentStyleRef.current = styleLabel;
      });
    };

    if (map.isStyleLoaded()) apply();
    else map.once("load", apply);
  }, [styleLabel, activeLayer]);

  // play/pause button only
  useEffect(() => {
    const btn = playPauseBtnRef.current;
    if (!btn) return;

    const onClick = () => {
      const wl = weatherLayersRef.current[activeLayer]?.layer;
      if (!wl) return;
      if (isPlayingRef.current) pauseAnimation(wl);
      else playAnimation(wl);
    };

    btn.addEventListener("click", onClick);
    return () => btn.removeEventListener("click", onClick);
  }, [activeLayer]);

  return (
    <div className="map_container">
      <div className="map_title">Weather Map</div>

      {/* style switcher */}
      <SegmentedControl.Root
        className="map_button_container"
        id="buttons"
        size="3"
        color="cyan"
        variant="classic"
        value={styleLabel}
        onValueChange={setStyleLabel}
      >
        {Object.keys(STYLE_OPTIONS).map((label) => (
          <SegmentedControl.Item key={label} value={label}>
            {label}
          </SegmentedControl.Item>
        ))}
      </SegmentedControl.Root>

      {/* map */}
      <div id="map" ref={containerRef} />

      {/* weather layer quick buttons (your classnames kept) */}
      <div className="radar_layer_container" style={{ marginTop: 12 }}>
        <div id="radar" onClick={() => changeWeatherLayer("radar")}>
          Radar
        </div>
        <div
          id="precipitation"
          onClick={() => changeWeatherLayer("precipitation")}
        >
          Rain
        </div>
        <div id="wind" onClick={() => changeWeatherLayer("wind")}>
          Wind
        </div>
        <div id="temperature" onClick={() => changeWeatherLayer("temperature")}>
          Temperature
        </div>
        <div id="pressure" onClick={() => changeWeatherLayer("pressure")}>
          Pressure
        </div>
      </div>

      {/* time HUD with scrubbable, hourly-snapping slider */}
      <div id="time-info" style={{ marginTop: 10 }}>
        {/* current timestamp */}
        <div id="time-text">{timeLabel || "\u00A0"}</div>

        {/* Slider snaps by hour: step computed from range; we also snap in handlers */}
        <Slider
          value={[progress]}
          max={100}
          step={sliderStep}
          onValueChange={([p]) => {
            if (!isScrubbingRef.current) {
              const wl = weatherLayersRef.current[activeLayer]?.layer;
              if (wl) {
                wasPlayingBeforeScrubRef.current = isPlayingRef.current;
                pauseAnimation(wl);
              }
              isScrubbingRef.current = true;
            }
            seekLayerToProgressSnapped(p);
          }}
          onValueCommit={([p]) => {
            seekLayerToProgressSnapped(p); // final snap
            isScrubbingRef.current = false;
            const wl = weatherLayersRef.current[activeLayer]?.layer;
            if (wl && wasPlayingBeforeScrubRef.current) {
              playAnimation(wl); // resume if it was playing
            }
          }}
          style={{ marginTop: 6 }}
        />

        {/* range labels */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 12,
            opacity: 0.8,
            marginTop: 6,
          }}
        >
          <span>{rangeLabels.start}</span>
          <span>{rangeLabels.end}</span>
        </div>

        <button
          id="play-pause-bt"
          ref={playPauseBtnRef}
          style={{ marginTop: 6 }}
        >
          Play 3600x
        </button>
      </div>

      <div id="pointer-data" ref={pointerDataRef} style={{ marginTop: 8 }} />
    </div>
  );
}
