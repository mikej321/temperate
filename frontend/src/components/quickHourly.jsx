import { useState, useRef, useLayoutEffect, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence, spring } from "framer-motion";
import { useMediaQuery } from "../utils/matchMedia";
import "../styles/quickHourly.css";
import {
  faTemperatureArrowDown,
  faTemperatureArrowUp,
  faTemperatureFull,
} from "@fortawesome/free-solid-svg-icons";

export default function QuickHourly({
  forecastData,
  time,
  extraIsOpen,
  setExtraIsOpen
}) {
  /* Create a section for hourly forecasts that will serve as the quick way
    to see hourly weather in your area. It will have cards that will contain
    hourly data. These cards will be able to be clicked and expand, showing
    more data.
    
    The actual hourly page will have far more in-depth hourly stats though (I may choose to change
    that page to something like weather news though)
    
    */

  const [hourlyForecast, setHourlyForecast] = useState(false);

  const containerRef = useRef(null);
  const clickedRef = useRef(null);

  function firstLetterCapitalize(str) {
    // This helper function is designed to capitalize the first letter of each word

    // Split the string
    const splitStr = str.split(" ");

    // Empty string to hold the end value that will be returned
    let newStr = "";

    // loop that creates the end value and adds it to newStr variable
    for (let word of splitStr) {
      newStr += `${word[0].toUpperCase()}${word.substring(1)} `;
    }

    // value that is returned. This visually looks better because AccuWeather's
    // weather description is all lowercase, which is inconsistent and ugly.
    return newStr;
  }

  useEffect(() => {
    // Guard Clause
    if (!forecastData) return;

    // Separating the data for easier mapping in the component
    const hourlyData = forecastData["hourly"].slice(1, 10);

    // Setting the data to a state (will be empty array if null)
    setHourlyForecast(hourlyData || []);
  }, [forecastData]);

  /* I already have regular css animations going for the cards. Now, I should
  convert those over to framer-motion animations. These are the animations I should
  aim for

    1. Style the extra parts that come in first
  
    2. I want to do the animations I already have now that expand the cards
    outward when clicked. I should animate to a max-height of 200px being that the content
    is controlled and will never be bigger than that.

    3. I want a stagger effect on each card, independent from the scrollTrigger animation
    that plays when it comes into view 
  
  */

  // Also, change the extra stats titles that they have to the new SVG's that I got

  const extraStatVar = {
    exit: {
      height: 0,
      overflow: 'hidden',
      transition: {
        ease: 'easeIn',
        duration: 0.1,
        when: 'afterChildren',
        staggerDirection: -1
      }
    },
    animate: {
      height: 70,
      overflow: 'visible',
      transition: {
        type: "spring",
        bounce: 0.5,
        duration: 0.2,
        ease: 'linear',
        staggerChildren: 0.1,
        delayChildren: 0.1,
        when: 'beforeChildren'
      }
    },
  }

  const parentVar = {
    exit: {
      transition: {
        staggerChildren: 0.1,
        when: 'afterChildren'
      }
    },
    animate: {
      transition: {
        staggerChildren: 0.1,
        when: 'beforeChildren'
      }
    }
  }

  const childVar = {
    exit: {
      y: -10,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1
    }
  }

  const isDesktop = useMediaQuery("(max-width: 1000px)");

  useLayoutEffect(() => {
    if (!isDesktop) return;

    console.log(isDesktop)
  }, [isDesktop])

  return (
    <div className="quick_hourly_container" ref={containerRef}>
      {hourlyForecast &&
        hourlyForecast.map((el, index) => {
          const clouds = el["clouds"];
          const temp = el["temp"].toFixed(1);
          const feels_like = el["feels_like"].toFixed(1);
          const humidity = el["humidity"];
          const wind_speed = el["wind_speed"];
          const wind_gust = el["wind_gust"];
          const weatherDescriptor = el["weather"][0]["main"];
          const weatherDescription = firstLetterCapitalize(
            el["weather"][0]["description"]
          );
          // Each card will have to be a grid

          /* Without user interaction, I want it to only display the
                
                1. Quick hourly temp

                2. Quick Description

                Clicking one of the cards will expand it to show the extra data also
                
                Find icons for the hourly temps 
                */

          return (
            <motion.div
              key={index}
              className="hourly_item"
              onClick={() => setExtraIsOpen((prev) => prev == index ? null : index)}
            >
              <div className="quick_description">
                <p>{weatherDescriptor}</p>
                <p>{weatherDescription}</p>
              </div>
              <div className="time_hours_container">
                <p className="timeHours">
                  {index === 0
                    ? `In ${index + 1} hour`
                    : `In ${index + 1} hours`}
                </p>
              </div>
              <div className="quick_hourly_temp">
                <p>
                  <FontAwesomeIcon
                    icon={
                      index === 0
                        ? faTemperatureFull
                        : index !== 0 &&
                          Math.round(temp) < hourlyForecast[index - 1]["temp"]
                        ? faTemperatureArrowDown
                        : faTemperatureArrowUp
                    }
                  />{" "}
                  <span className="hourly_value">{temp}&deg;</span>
                </p>
                <p>
                  <span className="quick_svg_container">
                    <svg
                      fill="#000000"
                      viewBox="0 0 32 32"
                      id="Layer_1"
                      data-name="Layer 1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <style>{`.cls-1 { fill: none; }`}</style>
                      </defs>
                      <path
                        d="M26,30H22a2.0059,2.0059,0,0,1-2-2V21a2.0059,2.0059,0,0,1-2-2V13a2.9465,2.9465,0,0,1,3-3h6a2.9465,2.9465,0,0,1,3,3v6a2.0059,2.0059,0,0,1-2,2v7A2.0059,2.0059,0,0,1,26,30ZM21,12a.9448.9448,0,0,0-1,1v6h2v9h4V19h2V13a.9448.9448,0,0,0-1-1Z"
                        transform="translate(0 0)"
                      />
                      <path
                        d="M24,9a4,4,0,1,1,4-4h0A4.0118,4.0118,0,0,1,24,9Zm0-6a2,2,0,1,0,2,2h0a2.0059,2.0059,0,0,0-2-2Z"
                        transform="translate(0 0)"
                      />
                      <path
                        d="M10,20.1839V12H8v8.1839a3,3,0,1,0,2,0Z"
                        transform="translate(0 0)"
                      />
                      <path
                        d="M9,30A6.9931,6.9931,0,0,1,4,18.1108V7A5,5,0,0,1,14,7V18.1108A6.9931,6.9931,0,0,1,9,30ZM9,4A3.0033,3.0033,0,0,0,6,7V18.9834l-.332.2983a5,5,0,1,0,6.664,0L12,18.9834V7A3.0033,3.0033,0,0,0,9,4Z"
                        transform="translate(0 0)"
                      />
                      <rect
                        id="_Transparent_Rectangle_"
                        data-name="&lt;Transparent Rectangle&gt;"
                        className="cls-1"
                        width="32"
                        height="32"
                      />
                    </svg>
                  </span>
                  <span className="hourly_value">{feels_like}&deg;</span>
                </p>
              </div>
              <AnimatePresence initial={false}>
                {extraIsOpen !== index ? null : (
                  <motion.div
                   className="quick_extra_stats"
                   variants={extraStatVar}
                   initial="exit"
                   animate="animate"
                   exit="exit"
                   >
                    <motion.div
                     className="quick_extra_container"
                     variants={parentVar}
                     >
                      <motion.p
                       className="quick_humidity_container"
                       variants={childVar}
                       >
                        <span>humidity</span> 
                        <span>{humidity}</span>
                      </motion.p>
                      <motion.p
                       className="quick_wind_speed_container"
                       variants={childVar}
                       >
                        <span>Wind Speed</span> 
                        <span>{wind_speed}</span>{" "}
                      </motion.p>
                      <motion.p
                       className="quick_wind_gust_container"
                       variants={childVar}
                       >
                        <span>Wind Gust</span> 
                        <span>{wind_gust}</span>
                      </motion.p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
    </div>
  );
}
