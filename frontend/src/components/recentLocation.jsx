import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../utils/api';
import WeatherIcon from './weatherIcon';
import getPosition from '../utils/getPosition';
import getWeatherSvg from '../utils/generateIcon';
import '../styles/recentLocations.css';

export default function RecentLocations({
  stateAbbr,
  storageLocations,
  locationTemps,
  setLocationTemps,
  pickedLocation,
  setPickedLocation,
  setWeather, 
  setFirstSearch,
  userCoord,
  setUserCoord,
  weather
}) {    
  const [currentConds, setCurrentConds] = useState([]);

  /* 

    Steps for implementing nearby locations

    1. Add a container for the header which will also have a separator

    2. It will load recent locations by default. If the user clicks nearby locations,
    it will run the getPosition() function.

    3. Ensure that I have a state that tracks if I'm on recent searches or
    nearby locations.
  
  */
  
  const locationVariant = {
    hidden: {
      opacity: 0,
      x: -10
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
        easing: "easeInOut"
      }
    },
    exit: {
      opacity: 0,
      x: -10,
      transition: {
        duration: 0.2,
        easing: "easeInOut"
      }
    }
  }

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

  const grabUserLocation = async () => {
    
    try {
      const { coords } = await getPosition();
      const { latitude, longitude } = coords;

      setUserCoord({ latitude, longitude });
    } catch (err) {
      console.error(err.message);
    }
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
      <motion.div className="location_selection_container">
        <motion.p
          className="use_location_button"
          onClick={() => {
            setFirstSearch(true)
            grabUserLocation()
          }
        }
        >Use My Location</motion.p>
      </motion.div>

      <motion.div className="recent_locations">
        {Array.isArray(storageLocations) && storageLocations.length > 0 ? (
          storageLocations.map((loc, index) => {
            const current = currentConds[index];       
            const temp = current?.temperature_2m; 
            return (
              <motion.div
               className="recent_location"
               variants={locationVariant}
               hidden="hidden"
               animate="visible"
               exit="exit" 
               key={index}
               onClick={() => {
                   setFirstSearch(true)
                   setPickedLocation(loc)
               }
            }
               >
                <p className="recent_location_name">
                  {loc.name}{loc.admin1 ? `, ${stateAbbr?.[loc.admin1] ?? loc.admin1}` : ''}
                </p>
                <div className="recent_conditions">
                  {getWeatherSvg(current?.weather_code, 'recent_icon', current?.is_day)}
                  <p className="recent_temp">
                    {temp != null ? Math.round(temp) : '…'}&deg;
                  </p>
                </div>
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
