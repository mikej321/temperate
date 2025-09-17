import { motion, AnimatePresence } from "framer-motion";
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
            <svg
              className="spinner"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" className="spinner-ring" />
              <path d="M22 12a10 10 0 0 1-10 10" className="spinner-arc" />
            </svg>

            <div className="spinner-text">
              <p className="spinner-title">{message || "Waking the server…"}</p>
              <p className="spinner-subtitle">
                First load can take a few seconds on the free tier.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
