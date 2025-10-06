import DesktopLocations from "./desktopLocations";
import { motion, AnimatePresence } from "framer-motion";
import '../styles/settings.css';

export default function Settings({ 
    settingsClicked,
    locationTemps,
    setLocationTemps,
    pickedLocation,
    setPickedLocation,
    stateAbbr,
    storageLocations,
    setStorageLocations,
    pushHistory,
    setWeather,
    setFirstSearch,
    userCoord,
    setUserCoord,     
}) {

    // Animate the recentLocations upon entry and exit

    const settingsVar = {
        entry: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.2,
                easing: "easeInOut"
            }
        },
        exit: {
            opacity: 0,
            y: -10,
            transition: {
                duration: 0.2,
                easing: "easeInOut"
            }
        }
    }

    return (
        
            <AnimatePresence>
                {settingsClicked && (
                        <motion.div
                         className="settings_menu_container"
                         variants={settingsVar}
                         initial="exit"
                         animate="entry"
                         exit="exit"
                         >
                            <DesktopLocations stateAbbr={stateAbbr} storageLocations={storageLocations} locationTemps={locationTemps} setLocationTemps={setLocationTemps} setPickedLocation={setPickedLocation} setFirstSearch={setFirstSearch} setUserCoord={setUserCoord} />
                        </motion.div>
                )}
            </AnimatePresence>
        
    )
}