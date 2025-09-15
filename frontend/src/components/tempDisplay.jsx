import { useState, useEffect, useRef } from "react";
import CountUp from 'react-countup';
import '../styles/tempDisplay.css';
import { motion, AnimatePresence } from "framer-motion";

export default function TempDisplay({ temp }) {

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
        <CountUp start={Math.round(temp / 2)} end={Math.round(temp)} delay={0} suffix="&deg;">
            {({ countUpRef }) => (
                <motion.p
                 className="tempDisplay" 
                 ref={countUpRef}
                 variants={tempVariant}
                 initial="exit"
                 animate="intro"
                 exit="exit"
                 />
            )}
        </CountUp>
    )
    // return <p className="tempDisplay">{Math.round(temp)}&deg;</p>
}

