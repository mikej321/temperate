import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { displayTime } from "../utils/formatDate";
import { motion, AnimatePresence } from "framer-motion";
import generateWindDegree from "../utils/generateWindDegree";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import "../styles/weatherDetails.css";

gsap.registerPlugin(Draggable);

export default function WeatherDetails({ weather }) {

  const [sunriseTime, setSunriseTime] = useState(null);
  const [sundownTime, setSundownTime] = useState(null);
  const [windLabel, setWindLabel] = useState(null);

  // === Your horizontalLoop helper (unchanged in spirit; exposes a few internals) ===
  function horizontalLoop(items, config) {
    let timeline;
    items = gsap.utils.toArray(items);
    config = config || {};
    gsap.context(() => {
      let onChange = config.onChange,
        lastIndex = 0,
        tl = gsap.timeline({
          repeat: config.repeat,
          onUpdate:
            onChange &&
            function () {
              let i = tl.closestIndex();
              if (lastIndex !== i) {
                lastIndex = i;
                onChange(items[i], i);
              }
            },
          paused: config.paused,
          defaults: { ease: "none" },
          onReverseComplete: () =>
            tl.totalTime(tl.rawTime() + tl.duration() * 100),
        }),
        length = items.length,
        startX = items[0].offsetLeft,
        times = [],
        widths = [],
        spaceBefore = [],
        xPercents = [],
        curIndex = 0,
        indexIsDirty = false,
        center = config.center,
        pixelsPerSecond = (config.speed || 1) * 100,
        snap =
          config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1),
        timeOffset = 0,
        container =
          center === true
            ? items[0].parentNode
            : gsap.utils.toArray(center)[0] || items[0].parentNode,
        totalWidth,
        getTotalWidth = () =>
          items[length - 1].offsetLeft +
          (xPercents[length - 1] / 100) * widths[length - 1] -
          startX +
          spaceBefore[0] +
          items[length - 1].offsetWidth *
            gsap.getProperty(items[length - 1], "scaleX") +
          (parseFloat(config.paddingRight) || 0),
        populateWidths = () => {
          let b1 = container.getBoundingClientRect(),
            b2;
          items.forEach((el, i) => {
            widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
            xPercents[i] = snap(
              (parseFloat(gsap.getProperty(el, "x", "px")) / widths[i]) * 100 +
                gsap.getProperty(el, "xPercent")
            );
            b2 = el.getBoundingClientRect();
            spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
            b1 = b2;
          });
          gsap.set(items, { xPercent: (i) => xPercents[i] });
          totalWidth = getTotalWidth();
        },
        timeWrap,
        populateOffsets = () => {
          timeOffset = center
            ? (tl.duration() * (container.offsetWidth / 2)) / totalWidth
            : 0;
          center &&
            times.forEach((t, i) => {
              times[i] = timeWrap(
                tl.labels["label" + i] +
                  (tl.duration() * widths[i]) / 2 / totalWidth -
                  timeOffset
              );
            });
        },
        getClosest = (values, value, wrap) => {
          let i = values.length,
            closest = 1e10,
            index = 0,
            d;
          while (i--) {
            d = Math.abs(values[i] - value);
            if (d > wrap / 2) d = wrap - d;
            if (d < closest) {
              closest = d;
              index = i;
            }
          }
          return index;
        },
        populateTimeline = () => {
          let i, item, curX, distanceToStart, distanceToLoop;
          tl.clear();
          for (i = 0; i < length; i++) {
            item = items[i];
            curX = (xPercents[i] / 100) * widths[i];
            distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
            distanceToLoop =
              distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
            tl.to(
              item,
              {
                xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
                duration: distanceToLoop / pixelsPerSecond,
              },
              0
            )
              .fromTo(
                item,
                {
                  xPercent: snap(
                    ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
                  ),
                },
                {
                  xPercent: xPercents[i],
                  duration:
                    (curX - distanceToLoop + totalWidth - curX) /
                    pixelsPerSecond,
                  immediateRender: false,
                },
                distanceToLoop / pixelsPerSecond
              )
              .add("label" + i, distanceToStart / pixelsPerSecond);
            times[i] = distanceToStart / pixelsPerSecond;
          }
          timeWrap = gsap.utils.wrap(0, tl.duration());
        },
        refresh = (deep) => {
          let progress = tl.progress();
          tl.progress(0, true);
          populateWidths();
          deep && populateTimeline();
          populateOffsets();
          deep && tl.draggable
            ? tl.time(times[curIndex], true)
            : tl.progress(progress, true);
        },
        onResize = () => refresh(true);

      gsap.set(items, { x: 0 });
      populateWidths();
      populateTimeline();
      populateOffsets();
      window.addEventListener("resize", onResize);

      function toIndex(index, vars) {
        vars = vars || {};
        Math.abs(index - curIndex) > length / 2 &&
          (index += index > curIndex ? -length : length);
        let newIndex = gsap.utils.wrap(0, length, index),
          time = times[newIndex];
        if (time > tl.time() !== index > curIndex && index !== curIndex) {
          time += tl.duration() * (index > curIndex ? 1 : -1);
        }
        if (time < 0 || time > tl.duration()) {
          vars.modifiers = { time: timeWrap };
        }
        curIndex = newIndex;
        vars.overwrite = true;
        return vars.duration === 0
          ? tl.time(timeWrap(time))
          : tl.tweenTo(time, vars);
      }

      tl.toIndex = (index, vars) => toIndex(index, vars);
      tl.closestIndex = (setCurrent) => {
        let index = getClosest(times, tl.time(), tl.duration());
        if (setCurrent) {
          curIndex = index;
          indexIsDirty = false;
        }
        return index;
      };
      tl.current = () => (indexIsDirty ? tl.closestIndex(true) : curIndex);
      tl.next = (vars) => toIndex(tl.current() + 1, vars);
      tl.previous = (vars) => toIndex(tl.current() - 1, vars);
      tl.times = times;

      // expose loop metrics so we can scrub by pixels
      tl.totalWidth = () => totalWidth;
      tl.loopDuration = () => tl.duration();
      tl.timeWrap = (t) => timeWrap(t);

      tl.progress(1, true).progress(0, true);
      if (config.reversed) {
        tl.vars.onReverseComplete();
        tl.reverse();
      }

      timeline = tl;
      return () => window.removeEventListener("resize", onResize);
    });
    return timeline;
  }
  // === /helper ===

  const containerRef = useRef(null);
  const tlRef = useRef(null);
  const draggingRef = useRef(false);

  useLayoutEffect(() => {
    const container = containerRef.current;
    
    const mm = gsap.matchMedia();
    
    mm.add("(max-width: 999px)", () => {
      const items = container.querySelectorAll(".card");
      
      // Build the loop (NO arrows; spacing via paddingRight like your snippet)
      const tl = horizontalLoop(items, {
        repeat: -1,
        paddingRight: 30,
        speed: 0.2,
        paused: false,
        // draggable: false  // we'll implement our own cursor-drag scrub
      });
      tlRef.current = tl;
  
      // Hover pause on each card (matches your snippet’s behavior)
      const enter = () => !draggingRef.current && tl.pause();
      const leave = () => !draggingRef.current && tl.play();
      items.forEach((el) => {
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
  
      // Cursor drag (container-level) – scrubs by pixel delta; no arrows, no inertia
      const proxy = document.createElement("div");
      container.appendChild(proxy);
      gsap.set(proxy, { x: 0 });
  
      const wrapTime = gsap.utils.wrap(0, tl.loopDuration());
      const EPS = 1e-4;
      const SCRUB_SENSITIVITY = 0.35;
      const DAMPING = 0.85; // 0..1 (closer to 1 = less damping)
      let v = 0;
  
      const drag = Draggable.create(proxy, {
        type: "x",
        trigger: container,
        allowContextMenu: true,
        dragClickables: true,
        onPress() {
          draggingRef.current = true;
          gsap.set(proxy, { x: 0 });
          tl.pause();
        },
        onDrag() {
          const dx = this.deltaX ?? this.x - (this._lx || 0);
          this._lx = this.x;
  
          v = v * DAMPING + dx * (1 - DAMPING); // low-pass filter
          const pxToTime = tl.loopDuration() / tl.totalWidth();
          let next = tl.totalTime() + -v * SCRUB_SENSITIVITY * pxToTime;
  
          // seam nudge...
          const m = next % tl.loopDuration();
          if (Math.abs(m) < 1e-4 || Math.abs(m - tl.loopDuration()) < 1e-4) {
            next += dx <= 0 ? 1e-4 : -1e-4;
          }
          tl.totalTime(next);
  
          gsap.set(proxy, { x: 0 });
          this._lx = 0;
        },
        onRelease() {
          v = 0;
          draggingRef.current = false;
          tl.play();
          gsap.set(proxy, { x: 0 });
          this._lx = 0;
        },
      })[0];
  
      return () => {
        drag?.kill();
        items.forEach((el) => {
          el.removeEventListener("mouseenter", enter);
          el.removeEventListener("mouseleave", leave);
        });
        tl?.kill();
        proxy?.remove();
      };

    })

  }, []);

  useEffect(() => {
    if (!weather) return;

    setSunriseTime(displayTime(new Date(weather.daily.sunrise[0])));
    setSundownTime(displayTime(new Date(weather.daily.sunset[0])));
    setWindLabel(generateWindDegree(weather.current.wind_direction_10m));
  }, [weather])

  const tempVariant = {
        "intro": {
            opacity: 1,
            transition: {
                delay: 0.3,
                duration: 0.2,
            }
        },
        "exit": {
            opacity: 0,
            transition: {
                duration: 0.2,
            }
        }
    }

  return (
    <motion.div
     className="details_container"
     variants={tempVariant}
     initial="exit"
     animate="intro"
     exit="exit"
     >
      <p className="more_details_label">More Details</p>
      <div className="inner_container" ref={containerRef}>
        <div className="card feels_like_container">
          <p className="feels_like_label">Feels like</p>
          <p className="feels_like_temp">{Math.ceil(weather.current.apparent_temperature)}&deg;</p>
        </div>
        <div className="card low_temp_container">
          <p className="low_temp_label">Low Temp</p>
          <p className="low_temp">{Math.ceil(weather.daily.temperature_2m_min[0])}&deg;</p>
        </div>
        <div className="card high_temp_container">
          <p className="high_temp_label">High Temp</p>
          <p className="high_temp">{Math.ceil(weather.daily.temperature_2m_max[0])}&deg;</p>
        </div>
        <div className="card humidity_container">
          <p className="humidity_label">Humidity</p>
          <p className="humidity">{Math.ceil(weather.current.relative_humidity_2m)}%</p>
        </div>
        <div className="card sunrise_container">
          <p className="sunrise_label">Sunrise</p>
          <p className="sunrise">{sunriseTime}</p>
        </div>
        <div className="card sunset_container">
          <p className="sunset_label">Sunset</p>
          <p className="sunset">{sundownTime}</p>
        </div>
        <div className="card wind_direction_container">
          <p className="wind_direction_label">Wind Direction</p>
          <p className="wind_direction">{windLabel}</p>
        </div>
        <div className="card wind_speed_container">
          <p className="wind_speed_label">Wind Speed</p>
          <p className="wind_speed">{Math.ceil(weather.current.wind_speed_10m)} mp/h</p>
        </div>
      </div>
    </motion.div>
  );
}
