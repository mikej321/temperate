import { useState, useRef, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import "../styles/dailyQuickcast.css";
import getWeatherSvg from "../utils/generateIcon";
import { formatDay } from "../utils/formatDate";
import { motion, AnimatePresence } from "framer-motion";


export default function DailyQuickcast({ weather }) {

  const weatherDescriptionsQuickObj = {
        0: 'Clear',
        1: 'Clear',
        2: 'Cloudy',
        3: 'Overcast',
        45: 'Fog',
        48: 'Fog',
        51: 'Drizzle',
        53: 'Drizzle',
        55: 'Drizzle',
        56: 'Drizzle',
        57: 'Drizzle',
        61: 'Rain',
        63: 'Rain',
        65: 'Rain',
        66: 'Rain',
        67: 'Rain',
        71: 'Snow',
        73: 'Snow',
        75: 'Snow',
        80: 'Showers',
        81: 'Showers',
        82: 'Showers',
        85: 'Showers',
        86: 'Showers',
        95: 'Stormy',
        96: 'Stormy',
        99: 'Stormy'
    };

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
     className="quickcast_container"
     variants={tempVariant}
     initial="exit"
     animate="intro"
     exit="exit"
     >
      <p className="quickcast_label">Daily QuickCast</p>
      <div
       className="quickcast_inner_container"
       ref={containerRef}
       >
        {weather && weather.daily.weather_code.map((card, i) => (
          <div
           className="card"
           key={i}
           >
            {getWeatherSvg(weather.daily.weather_code[i], 'quick_icon', 1)}
            <p className="day_of_week">{formatDay(weather.daily.time[i])}</p>
            <p className="weather_description">{weatherDescriptionsQuickObj[weather.daily.weather_code[i]]}</p>
            <p className="quick_temp">{Math.ceil(weather.daily.apparent_temperature_max[i])}</p>
          </div>
        ))}       
      </div>
    </motion.div>
  );
}
