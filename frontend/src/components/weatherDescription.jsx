import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import '../styles/weatherDescription.css';

export default function WeatherDescription({ desc, wind }) {

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
         className="description_container"
         variants={tempVariant}
         initial="exit"
         animate="intro"
         exit="exit"
         >
            {/* Dynamically add the Description and sub_description
            through open_meteo and openweather api later, this is just for
            visual demo purposes */}
            <p className="description">{desc}</p>
            <p className="sub_description">{wind}</p>
        </motion.div>
    )
}