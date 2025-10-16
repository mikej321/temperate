import { useState, useRef, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import InertiaPlugin from "gsap/InertiaPlugin";
import "../styles/dailyQuickcast.css";
import getWeatherSvg from "../utils/generateIcon";
import { formatDay } from "../utils/formatDate";
import { motion, AnimatePresence, press } from "framer-motion";

gsap.registerPlugin(Draggable, InertiaPlugin);

export default function DailyQuickcast({ weather }) {
  const outerContainerRef = useRef(null);
  const innerContainerRef = useRef(null);

  const pressedRef = useRef(false);
  const startXRef = useRef(0);
  const startTxRef = useRef(0);
  const txRef = useRef(0);
  const loopWRef = useRef(0);
  const wrapRef = useRef((n) => n);

  const weatherDescriptionsQuickObj = {
    0: "Clear",
    1: "Clear",
    2: "Cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Fog",
    51: "Drizzle",
    53: "Drizzle",
    55: "Drizzle",
    56: "Drizzle",
    57: "Drizzle",
    61: "Rain",
    63: "Rain",
    65: "Rain",
    66: "Rain",
    67: "Rain",
    71: "Snow",
    73: "Snow",
    75: "Snow",
    80: "Showers",
    81: "Showers",
    82: "Showers",
    85: "Showers",
    86: "Showers",
    95: "Stormy",
    96: "Stormy",
    99: "Stormy",
  };

  const tempVariant = {
    intro: {
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  const duplicateRow = (weather?.daily?.weather_code ?? []).map((card, i) => (
    <div className="card" key={`qc-${i}`}>
      {getWeatherSvg(weather.daily.weather_code[i], "quick_icon", 1)}
      <div className="day_of_week">{formatDay(weather.daily.time[i])}</div>
      <div className="weather_description">
        {weatherDescriptionsQuickObj[weather.daily.weather_code[i]]}
      </div>
      <div className="quick_temp">
        {Math.ceil(weather.daily.apparent_temperature_max[i])}
      </div>
    </div>
  ));

  useLayoutEffect(() => {
  const outer = outerContainerRef.current;
  const inner = innerContainerRef.current;
  if (!outer || !inner) return;

  const measure = () => {
    const loopW = inner.scrollWidth / 2;
    loopWRef.current = loopW;
    wrapRef.current = gsap.utils.wrap(-loopW, 0);
    txRef.current = wrapRef.current(txRef.current || 0);
    inner.style.transform = `translate3d(${txRef.current}px,0,0)`;
  };
  measure();

  const onResize = () => requestAnimationFrame(measure);
  window.addEventListener("resize", onResize);

  const proxy = document.createElement("div");
  gsap.set(proxy, { x: 0 });

  let startTx = 0; 
  const update = (rawX) => {
    const next = startTx + rawX;
    const wrapped = wrapRef.current(next);
    txRef.current = wrapped;
    inner.style.transform = `translate3d(${wrapped}px,0,0)`;
  };

  const drag = Draggable.create(proxy, {
    type: "x",
    throwResistance: 1200, // Controls the drag
    trigger: outer,                   // What triggers the drag
    inertia: true,                    // Adds Inertia
    lockAxis: true,                   // Vertical swipes won't mess up drag as much
    minimumMovement: 6,               // ignore micro-moves before locking
    allowNativeTouchScrolling: true,  // keep vertical page scroll
    dragClickables: true,
    activeCursor: "grabbing",

    onPress() {
      gsap.set(proxy, { x: 0 });
      startTx = txRef.current || 0;
      outer.style.cursor = "grabbing";
    },
    onDrag() {
      update(this.x);
    },
    onThrowUpdate() {
      update(this.x);
    },
    onRelease() {
      outer.style.cursor = "grab";
    }
  })[0];

  // 3) tidy up
  return () => {
    window.removeEventListener("resize", onResize);
    drag.kill();
  };
}, [duplicateRow.length]);


  return (
    <motion.div
      className="quickcast_container"
      initial="exit"
      animate="intro"
      exit="exit"
      ref={outerContainerRef}
    >
      <div className="quickcast_inner_container" ref={innerContainerRef}>
        {duplicateRow}
        {duplicateRow}
      </div>
    </motion.div>
  );
}
