import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { checkHistory, readHistory, pushHistory } from '../utils/historyStorage';
import '../styles/recentLocations.css';


export default function RecentLocations({ pickedLocation, stateAbbr, storageLocations, setStorageLocations }) {

    /* 
    
    1. perform axios calls for the weather in each object in the storageLocations
    based on their lat and lon

    2. place those results into the storageLocation state under storageLocations.temp under a map (this is because storageLocations is an array of objects)
    
    */

    return (
        <motion.div className="recent_locations_container">
            {storageLocations && storageLocations.map((loc, index) => (
                <motion.div
                 className='recent_locations'
                 key={index}
                 >
                    <motion.p className="recent_location_name">{loc.name}, {stateAbbr[loc.admin1]}</motion.p>
                </motion.div>
            ))
            }
        </motion.div>
    )
}