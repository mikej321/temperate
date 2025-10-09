import { motion, AnimatePresence } from "framer-motion";
import useHistory from "../utils/useHistory";
import { useState, useLayoutEffect, useRef, useEffect } from "react";
import "../styles/location_popup.css";
import { add } from "date-fns";

export default function LocationPopup({
  locations,
  setLocations,
  setPickedLocation,
  setSearched,
  setFirstSearch,
  addToHistoryFromSearch,
  autoSuggestionOpen,
  setAutoSuggestionOpen,
  open,
  setOpen
}) {
  // Animate only the shell's height/opacity

  const { history, pushHistory } = useHistory();
  const [target, setTarget] = useState(0);
  const [useAuto, setUseAuto] = useState(false);
  const [suggestionOpen, setSuggestionOpen] = useState(false);
  const abortRef = useRef(null);
  const locationsRef = useRef(null);

  async function handlePickLocation(picked) {
    pushHistory({
      name: picked.name,
      lat: picked.latitude,
      lon: picked.longitude,
      admin1: picked.admin1,
      country: picked.country,
      temperature: null,
    })
  }

  const shell = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        height: { delay: 0.3, duration: 0.2, ease: [0.22, 1, 0.36, 1] },
        opacity: { delay: 0.3, duration: 0.18 },
        when: "beforeChildren"
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.22, ease: "easeInOut" }
    }
  };

  const wrapperVar = {
    hidden: {

    },
    visible: {
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
        }
    }
  }

  // Rows fade/slide after the shell has grown (no stagger during height)
  const row = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  const handlePick = async (loc) => {
    setSearched(false);
    setPickedLocation(loc);
    addToHistoryFromSearch?.(loc);
    setOpen(false);
  };

  useLayoutEffect(() => {
    const locationsContainer = locationsRef.current;
    if (!locationsContainer) return;

    const prev = locationsContainer.style.height;
    locationsContainer.style.height = "auto";
    const natHeight = locationsContainer.scrollHeight;
    locationsContainer.style.height = prev;
    setTarget(natHeight);
  }, [locations])

  useEffect(() => {
    const locationsContainer = locationsRef.current;
    if (!locationsContainer) return;

    const observer = new ResizeObserver(() => {
      if (suggestionOpen) setTarget(locationsContainer.scrollHeight);
    })

    observer.observe(locationsContainer);
    return () => observer.disconnect();
  }, [locations])

  const locationVar = {
    initial: {
      height: 0,
      opacity: 0
    },
    animate: {
      height: useAuto ? "auto" : target,
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.07,
        delayChildren: 0.1,
        height: {
          type: "spring",
          stiffness: 500,
          damping: 40
        },
        opacity: {
          duration: 0.12
        }
      }
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.07,
        delayChildren: 0.1,
        height: {
          type: "spring",
          stiffness: 500,
          damping: 40
        },
      }
    }
  }

  const childVar = {
    initial: {
      x: -10,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1
    },
    exit: {
      x: -10,
      opacity: 0
    }
  }

  return (
    <motion.div
      className="popup_shell"
      variants={locationVar}
      ref={locationsRef}
      initial="initial"
      animate="animate"
      exit="exit"
      onUpdate={() => {
        if (locations) setUseAuto(false);
      }}
      onAnimationComplete={() => {
        if (locations) setUseAuto(true);
      }}
    >
      <motion.div
       className="popup_container" 
       role="listbox" 
       aria-label="Search results"
       variants={childVar}
       >
        {locations.length === 0 ? (
          <motion.p variants={row}>
            No results found, please try another search
          </motion.p>
        ) : (
          locations.map((location, i) => (
            <motion.p
              key={i}
              variants={row}              
              onClick={() => handlePick(location)}
            >
              {location.name}{location.admin1 ? `, ${location.admin1}` : ""}
            </motion.p>
          ))
        )}
      </motion.div>
    </motion.div>
  );
}
