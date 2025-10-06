import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import getPosition from "../utils/getPosition";
import "../styles/settings.css";

export default function DesktopLocations({
  stateAbbr,
  storageLocations,
  locationTemps,
  setLocationTemps,
  setPickedLocation,
  setFirstSearch,
  setUserCoord,
}) {
  const [currentConds, setCurrentConds] = useState([]);

  useEffect(() => {
    if (!Array.isArray(storageLocations) || storageLocations.length === 0) {
      setLocationTemps([]);
      setCurrentConds([]);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const promises = storageLocations.map((loc) =>
          api.post("/search/get-weather", { lat: loc.lat, lon: loc.lon })
        );
        const res = await Promise.all(promises);
        const temps = res.map((r) => r.data);
        if (!cancelled) setLocationTemps(temps);
      } catch (e) {
        console.error("history fetch failed", e);
        if (!cancelled) {
          setLocationTemps([]);
          setCurrentConds([]);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [storageLocations]);

  const grabUserLocation = async () => {
    try {
      const { coords } = await getPosition();
      const { latitude, longitude } = coords;

      setUserCoord({ latitude, longitude });
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (!Array.isArray(locationTemps) || locationTemps.length === 0) {
      setCurrentConds([]);
      return;
    }
    const currents = locationTemps.map((t) => t?.current ?? null);
    setCurrentConds(currents);
  }, [locationTemps]);

  return (
    <motion.div className="desktop_recent_locations_container">
      <motion.div className="desktop_location_selection_container">
        <motion.p>Recently Searched</motion.p>
        <motion.div className="divider"></motion.div>
        <motion.p
          onClick={() => {
            setFirstSearch(true);
            grabUserLocation();
          }}
        >
          Use My Location
        </motion.p>
      </motion.div>

      <motion.div className="desktop_recent_locations">
        {Array.isArray(storageLocations) && storageLocations.length > 0 ? (
          storageLocations.map((loc, index) => {
            const current = currentConds[index];
            const temp = current?.temperature_2m;
            return (
              <motion.div
                className="desktop_recent_location"
                hidden="hidden"
                animate="visible"
                exit="exit"
                key={index}
                onClick={() => {
                  setFirstSearch(true);
                  setPickedLocation(loc);
                }}
              >
                <p className="desktop_recent_location_name">
                  {loc.name}
                  {loc.admin1
                    ? `, ${stateAbbr?.[loc.admin1] ?? loc.admin1}`
                    : ""}
                </p>
                <p className="desktop_recent_temp">
                  {temp != null ? Math.round(temp) : "…"}&deg;
                </p>
              </motion.div>
            );
          })
        ) : (
          <p className="empty">No recent locations yet.</p>
        )}
      </motion.div>
    </motion.div>
  );
}
