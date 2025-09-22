import { motion } from "framer-motion";
import useHistory from "../utils/useHistory";
import "../styles/location_popup.css";

export default function LocationPopup({
  locations,
  setLocations,
  setPickedLocation,
  setSearched,
  setFirstSearch
}) {
  // Animate only the shell's height/opacity

  const { history, pushHistory } = useHistory();

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
    pushHistory({
      name: loc.name,
      lat: loc.latitude,
      lon: loc.longitude,
      admin1: loc.admin1,
      country: loc.country,
      temperature: 'none'
    })
  };

  return (
    <motion.div
      className="popup_shell"
      variants={shell}
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
