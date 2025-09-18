import { useState, CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SpinnerDotted } from 'spinners-react';
import "../styles/coldSpinner.css";

export default function ColdSpinner({ waking, message }) {

  const overlayVariant = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        when: "beforeChildren"
      }
    },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildren"
      }
    }
  }

  const cardVariant = {
    hidden: {
      scaleY: 0,
      opacity: 0
    },
    visible: {
      scaleY: 1,
      opacity: 1,
      transition: {
        duration: 0.2,
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: {
      scaleY: 0,
      opacity: 0
    }
  }

  return (
    <AnimatePresence>
      {waking && (
        <motion.div
          className="spinner_overlay"
          variants={overlayVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="spinner_card"
            variants={cardVariant}
          >
            
            <SpinnerDotted
             enabled={waking}
             size={60}
             thickness={80}
             color="#32739A"
             speed={50}
             />
            <div className="spinner_text">
              <p className="spinner_title">{message || "Loading Temperate"}</p>
              <p className="spinner_subtitle">
                  Because I am using Render's free tier, the first load takes around 15-20
                  seconds to load. This box will disappear after that. My apologies and thank
                  you so much for understanding!
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
