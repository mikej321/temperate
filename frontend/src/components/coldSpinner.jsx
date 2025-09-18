import { useState, CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SpinnerDotted } from 'spinners-react';
import "../styles/coldSpinner.css";

export default function ColdSpinner({ waking, message }) {
  return (
    <AnimatePresence>
      {waking && (
        <motion.div
          className="spinner_overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.25,
            },
          }}
        >
          <motion.div
            className="spinner_card"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 24,
              },
            }}
            exit={{ scale: 0.98, opacity: 0 }}
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
