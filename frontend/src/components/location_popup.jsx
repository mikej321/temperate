import { motion } from "framer-motion";
import "../styles/location_popup.css";

export default function LocationPopup({
  locations,
  setLocations,
  setPickedLocation,
  setSearched,
}) {
  // Animate only the shell's height/opacity
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

  const handlePick = (loc) => {
    setSearched(false);
    setPickedLocation(loc);
  };

  return (
    <motion.div
      className="popup_shell"
      variants={shell}
      layout
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{ transformOrigin: "top center" }}
    >
      <motion.div
       className="popup_container" 
       role="listbox" 
       aria-label="Search results"
       variants={wrapperVar}
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
