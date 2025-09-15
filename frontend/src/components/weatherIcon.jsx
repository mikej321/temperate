import { useState, useLayoutEffect, useRef } from "react";
import getWeatherSvg from "../utils/generateIcon";
import "../styles/weatherIcon.css";
import { motion } from "framer-motion";

export default function WeatherIcon({ weather }) {
  const [weatherIcon, setWeatherIcon] = useState(null);

  const sunRef = useRef(null);
  const lightCloudRef = useRef(null);
  const darkCloudRef = useRef(null);

  /* What I have currently is static code for visual purposes.
  Later, I'll have to dynamically bring in the content with 
  open-meteo and openweather and set up logic to bring in different
  svg combinations depending on the weather code I get for the current weather.
  
  I'll also have to set up proper widths and heights for each SVG in CSS.

  Remember to run each SVG through the useFitViewBox function for proper viewboxes. Without
  this, the SVG's will size weirdly and be tiny.

  Set up animations for each SVG upon entering the DOM.

  I'm going to have to also set up proper top and left parameters for the desktop versions
  too
  
  */

  function useFitViewBox(svgRef, selector = "g, path") {
    useLayoutEffect(() => {
      const svg = svgRef.current;
      if (!svg) return;

      // Pick the main shape/group to measure
      const node =
        svg.querySelector("#layer1") || svg.querySelector(selector) || svg;

      // getBBox = geometry bounds (ignores filters)
      const b = node.getBBox();
      // Optional padding so glows/shadows don't clip
      const pad = 0; // try 4–8 if you have drop shadows
      svg.setAttribute(
        "viewBox",
        `${b.x - pad} ${b.y - pad} ${b.width + pad * 2} ${b.height + pad * 2}`
      );
    }, [svgRef, selector]);
  }

  useFitViewBox(sunRef, "#layer1");
  useFitViewBox(lightCloudRef, "path");
  useFitViewBox(darkCloudRef, "#layer1");

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
     className="icon_container"
     variants={tempVariant}
     initial="exit"
     animate="intro"
     exit="exit"
     >
      {getWeatherSvg(weather.current.weather_code, 'main_icon', weather.current.is_day)}
    </motion.div>
  );
}
