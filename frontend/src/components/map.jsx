import { useEffect, useRef, useState, useMemo } from "react";
import { Map, MapStyle, Marker, config } from "@maptiler/sdk";
import { faCirclePlay, faCirclePause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "@maptiler/sdk/dist/maptiler-sdk.css";
import { RadarLayer, ColorRamp, PrecipitationLayer } from "@maptiler/weather";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { format } from "date-fns";
import "../styles/map.css";

export default function SdkMap({ weather }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const layerRef = useRef(null);
  const startRef = useRef(null);
  const endRef = useRef(null);

  const [currentTime, setCurrentTime] = useState(null);
  const [frameTimes, setFrameTimes] = useState([]);
  const [frameIndex, setFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const mapRamp = new ColorRamp({
    min: 0,
  max: 50, // extend if you want higher rates
  stops: [
    // keep drizzle subtle/see-through
    { value: 0.0,  color: [0,   0,   0,   0]   }, // transparent
    { value: 0.2,  color: [180, 220, 255, 140] }, // faint blue
    { value: 1.0,  color: [100, 180, 255, 220] }, // light rain
    { value: 3.0,  color: [  0, 140, 255, 255] }, // moderate
    { value: 6.0,  color: [  0, 210, 140, 255] }, // green-cyan
    { value: 10.0, color: [255, 230,   0, 255] }, // yellow (heavy)
    { value: 20.0, color: [255, 140,   0, 255] }, // orange (very heavy)
    { value: 35.0, color: [255,  60,  60, 255] }, // red
    { value: 50.0, color: [200,   0, 200, 255] }, // magenta extreme
  ],
  })

  useEffect(() => {
    config.apiKey = import.meta.env.VITE_MAPTILER_KEY;

    const map = new Map({
      container: containerRef.current,
      style: MapStyle.STREETS,
      zoom: 5,
      maxZoom: 5,
      minZoom: 2,
      center: [weather.longitude, weather.latitude],
      projectionControl: true,
    });
    mapRef.current = map;

    new Marker().setLngLat([weather.longitude, weather.latitude]).addTo(map);

    const weatherLayer = new PrecipitationLayer({ 
      opacity: 1,
      colorramp: mapRamp
     });
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

        const wEnd = endRef.current;
        if (typeof wEnd === "number") {
          const unix = Math.round(d.getTime() / 1000);
          if (unix >= wEnd) {
            try {
              weatherLayer.animateByFactor(0);
            } catch {}
            setIsPlaying(false);
            if (frameTimesRef.current.length > 0) {
              const last = frameTimesRef.current[frameTimesRef.current.length - 1];
              if (typeof weatherLayer.setAnimationTime === "function") {
                weatherLayer.setAnimationTime(last);
              }
              setFrameIndex(frameTimesRef.current.length - 1);
              setCurrentTime(new Date(last * 1000));
            }
          }
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
      const WINDOW_HOURS = 8;

      // Build all frames first
      const allFrames = [];
      for (let t = start; t <= end; t += STEP) allFrames.push(t);

      // Find the layer's current frame and slice to [current .. current+12h]
      const currentUnix = Math.round(weatherLayer.getAnimationTime());
      const windowStart = Math.max(start, currentUnix);
      const windowEnd = Math.min(end, currentUnix + WINDOW_HOURS * 3600);

      const frames = allFrames.filter(t => t >= windowStart && t <= windowEnd);

      setFrameTimes(frames);
      frameTimesRef.current = frames;
      startRef.current = windowStart;
      endRef.current = windowEnd;

      // Initialize current time & index
      const initialDate = weatherLayer.getAnimationTimeDate();
      if (initialDate instanceof Date && !Number.isNaN(initialDate.getTime())) {
        setCurrentTime(initialDate);
        const unix = Math.round(initialDate.getTime() / 1000);
        // snap to our 12h window indices
        let idx = Math.floor((unix - frames[0]) / STEP);
        if (idx < 0) idx = 0;
        if (idx > frames.length - 1) idx = frames.length - 1;
        setFrameIndex(idx);
      }

      if (frames.length > 0) {
        weatherLayer.setAnimationTime(frames[0]);
        setCurrentTime(new Date(frames[0] * 1000));
        setFrameIndex(0);
      }

      // Animate (1s = 1h)
      weatherLayer.animateByFactor(0);

    });
    
    return () => {
      try { weatherLayer.off("tick", onTick); } catch {}
      try { map.remove(); } catch {}
    };
  }, [weather.latitude, weather.longitude]);
  
  const togglePlay = () => {
    const layer = layerRef.current;
    if (!layer) return;

    if (typeof layer.isPlaying === "function" && layer.isPlaying()) {
      layer.animateByFactor(0);
      setIsPlaying(false);
    } else {
        if (frameTimes.length > 0 && Math.round(layer.getAnimationTime?.() ?? 0) >= (endRef.current ?? 0)) {
          layer.setAnimationTime(frameTimes[0]);
          setFrameIndex(0);
          setCurrentTime(new Date(frameTimes[0] * 1000));
        }
        const atEnd = frameTimes.length > 0 && frameIndex >= frameTimes.length - 1;
        if (atEnd) {
          const first = frameTimes[0];
          layer.setAnimationTime(first);
          setFrameIndex(0);
          setCurrentTime(new Date(first * 1000));
        }
      layer.animateByFactor(1800);
      setIsPlaying(true);
    }
  }

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
    const safeIdx = Math.max(0, Math.min(idx, frameTimes.length - 1));
    setFrameIndex(safeIdx);
    const t = frameTimes[safeIdx];
    if (typeof t === "number" && layerRef.current?.setAnimationTime) {
      layerRef.current.setAnimationTime(t);
    }
  };

  return (
    <div className="map_container" style={{ position: "relative" }}>
      <div className="map_title">Weather Map</div>

      <div id="map" ref={containerRef} />

      <div className="color_legend_container">
        <div className="color_legend_title">Storm Intensity Legend</div>
        <div className="color_legend">
          <div className="square square-1"></div>
          <div className="square square-2"></div>
          <div className="square square-3"></div>
          <div className="square square-4"></div>
          <div className="square square-5"></div>
          <div className="square square-6"></div>
          <div className="square square-7"></div>
          <div className="square square-8"></div>
        </div>
      </div>
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
        <FontAwesomeIcon className="play_button" icon={isPlaying ? faCirclePause : faCirclePlay} onClick={togglePlay} fade={isPlaying}  />
      </div>
    </div>
  );
}
