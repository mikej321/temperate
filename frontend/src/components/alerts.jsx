import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import '../styles/alerts.css';

export default function Alerts({ alertData }) {
    
    const [localAlerts, setLocalAlerts] = useState([]);

    useEffect(() => {
        if (!alertData) return;

        const paginatedAlerts = alertData.slice(0, 9);

        setLocalAlerts(paginatedAlerts);
    }, [alertData])
    
    return (
        <div className="home_alert_container">
            {localAlerts.length == 0 ? <div className="home_alerts">
                <p>No Active Alerts</p>
            </div> : localAlerts.map((el, index) => {
                const properties = el['properties'];

                const eventName = properties['event'];
                const area = properties['areaDesc'];
                const headline = properties['headline'];
                const description = properties['description'];
                const instruction = properties['instruction'];

                return (
                    
                        <div className="home_alerts">
                            <div className="alert_area_details">
                                <p className="alert_area">{area}</p>
                                <p className="alert_name">{eventName}</p>
                            </div>
                            <div className="alert_content">
                                <p className="alert_headline">{headline}</p>
                                <p className="alert_description">{description}</p>
                                <p className="alert_instruction">{instruction}</p>
                            </div>
                        </div>
                    
                )
            })}
        </div>
    )
}