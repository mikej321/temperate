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

  const containerRef = useRef(null);

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
