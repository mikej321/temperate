import { useEffect, useRef, useState, useMemo } from "react";
import { Map, MapStyle, Marker, config } from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { RadarLayer } from "@maptiler/weather";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { format } from "date-fns";
import "../styles/map.css";

export default function SdkMap({ weather }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const layerRef = useRef(null);

  const [currentTime, setCurrentTime] = useState(null);
  const [frameTimes, setFrameTimes] = useState([]);
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    config.apiKey = import.meta.env.VITE_MAPTILER_KEY;

    const map = new Map({
      container: containerRef.current,
      style: MapStyle.STREETS,
      zoom: 5,
      maxZoom: 5,
      minZoom: 4,
      center: [weather.longitude, weather.latitude],
      projectionControl: true,
      projection: "globe",
    });
    mapRef.current = map;

    new Marker().setLngLat([weather.longitude, weather.latitude]).addTo(map);

    const weatherLayer = new RadarLayer({ opacity: 0.8 });
    layerRef.current = weatherLayer;

    const onTick = () => {
      const d = weatherLayer.getAnimationTimeDate();
      if (d instanceof Date && !Number.isNaN(d.getTime())) {
        setCurrentTime(d);

        if (frameTimesRef.current.length > 0) {
          const unix = Math.round(d.getTime() / 1000);
          const start = frameTimesRef.current[0];
          const step = 3600;
          let idx = Math.round((unix - start) / step);
          if (idx < 0) idx = 0;
          if (idx > frameTimesRef.current.length - 1) {
            idx = frameTimesRef.current.length - 1;
          }
          setFrameIndex((prev) => (prev !== idx ? idx : prev));
        }
      }
    };
    weatherLayer.on("tick", onTick);

    // local ref mirroring frameTimes
    const frameTimesRef = { current: [] };

    map.on("load", async () => {
      map.setPaintProperty("Water", "fill-color", "rgba(0, 0, 0, 0.4)");
      map.addLayer(weatherLayer, "Water");

      if (weatherLayer.onSourceReadyAsync) {
        await weatherLayer.onSourceReadyAsync();
      }

      const start = weatherLayer.getAnimationStart(); // unix seconds
      const end = weatherLayer.getAnimationEnd();     // unix seconds
      const STEP = 3600; // hourly frames

      // Build all frames first
      const allFrames = [];
      for (let t = start; t <= end; t += STEP) allFrames.push(t);

      // Find the layer's current frame and slice to [current .. current+12h]
      const currentUnix = Math.round(weatherLayer.getAnimationTime()); // unix seconds
      const windowStart = Math.max(currentUnix, start);
      const windowEnd = Math.min(end, windowStart + 12 * 3600);

      const frames = allFrames.filter(t => t >= windowStart && t <= windowEnd);

      setFrameTimes(frames);
      frameTimesRef.current = frames;

      // Initialize current time & index
      const initialDate = weatherLayer.getAnimationTimeDate();
      if (initialDate instanceof Date && !Number.isNaN(initialDate.getTime())) {
        setCurrentTime(initialDate);
        const unix = Math.round(initialDate.getTime() / 1000);
        // snap to our 12h window indices
        let idx = Math.round((unix - frames[0]) / STEP);
        if (idx < 0) idx = 0;
        if (idx > frames.length - 1) idx = frames.length - 1;
        setFrameIndex(idx);
      }

      // Animate (1s = 1h)
      weatherLayer.animateByFactor(600);
    });

    return () => {
      try { weatherLayer.off("tick", onTick); } catch {}
      try { map.remove(); } catch {}
    };
  }, [weather.latitude, weather.longitude]);

  const unixToDate = (unix) => new Date(unix * 1000);

  const timeLabel =
    currentTime != null ? format(currentTime, "hh:mm aaa") : "Loading…";

  const sliderMarks = useMemo(() => {
    if (frameTimes.length === 0) return {};
    const first = 0;
    const last = frameTimes.length - 1;
    const mid = Math.round((first + last) / 2);

    const fmt = (unix) => format(unixToDate(unix), "hh:mm aaa");

    return {
      [first]: fmt(frameTimes[first]),
      [mid]: fmt(frameTimes[mid]),
      [last]: fmt(frameTimes[last]),
    };
  }, [frameTimes]);

  const handleSliderChange = (idx) => {
    setFrameIndex(idx);
    const t = frameTimes[idx];
    if (typeof t === "number" && layerRef.current?.setAnimationTime) {
      layerRef.current.setAnimationTime(t);
    }
  };

  return (
    <div className="map_container" style={{ position: "relative" }}>
      <div className="map_title">Weather Map</div>

      <div id="map" ref={containerRef} />

      <div className="time_slider_container">
        <p className="time_label">{timeLabel}</p>
        <Slider
          className="time_slider"
          min={0}
          max={Math.max(0, frameTimes.length - 1)}
          step={1}
          value={frameIndex}
          onChange={handleSliderChange}
          marks={sliderMarks}
          included={false}
        />
      </div>
    </div>
  );
}
