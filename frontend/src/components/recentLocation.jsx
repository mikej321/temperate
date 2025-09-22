import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../utils/api';
import '../styles/recentLocations.css';

export default function RecentLocations({
  stateAbbr,
  storageLocations,
  locationTemps,
  setLocationTemps,
  pickedLocation,
  setPickedLocation,
  setWeather, 
  setFirstSearch
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
          api.post('/search/get-weather', { lat: loc.lat, lon: loc.lon })
        );
        const res = await Promise.all(promises);
        const temps = res.map(r => r.data);
        console.log(temps)
        if (!cancelled) setLocationTemps(temps);
      } catch (e) {
        console.error('history fetch failed', e);
        if (!cancelled) {
          setLocationTemps([]);
          setCurrentConds([]);
        }
      }
    })();

    return () => { cancelled = true; };
  }, [storageLocations]);

  async function getTempWeather() {
    const { data } = await api.post('/search/get-weather', {

    })
  }

  useEffect(() => {
    if (!Array.isArray(locationTemps) || locationTemps.length === 0) {
      setCurrentConds([]);
      return;
    }
    const currents = locationTemps.map(t => t?.current ?? null);
    setCurrentConds(currents);
  }, [locationTemps]);

  /* Try running setWeather on the clicked location */

  return (
    <motion.div className="recent_locations_container">
      <motion.p>Recently Searched</motion.p>

      <motion.div className="recent_locations">
        {Array.isArray(storageLocations) && storageLocations.length > 0 ? (
          storageLocations.map((loc, index) => {
            const current = currentConds[index];       
            const temp = current?.temperature_2m; 
            return (
              <motion.div
               className="recent_location" 
               key={index}
               onClick={() => {
                   setFirstSearch(true)
                   setWeather(pickedLocation)
                   setPickedLocation(loc)
               }
            }
               >
                <p className="recent_location_name">
                  {loc.name}{loc.admin1 ? `, ${stateAbbr?.[loc.admin1] ?? loc.admin1}` : ''}
                </p>
                <p className="recent_temp">
                  {temp != null ? Math.round(temp) : '…'}&deg;
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
