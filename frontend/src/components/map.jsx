import { useState, useEffect, useRef } from "react";
import L from 'leaflet';
import '../styles/map.css';

export default function Map ({ weather }) {
    
    const containerRef = useRef(null);
    const mapRef = useRef(null);
    
    useEffect(() => {
        if (mapRef.current) return;

        const KEY = import.meta.env.VITE_MAPTILER_KEY;
        
        mapRef.current = L.map(containerRef.current).setView([weather.latitude, weather.longitude], 9);
        L.tileLayer(`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${KEY}`, {
            tileSize: 512,
            zoomOffset: -1,
            minZoom: 1,
            attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
            crossOrigin: true
        }).addTo(mapRef.current);

        L.marker([weather.latitude, weather.longitude]).addTo(mapRef.current);

        return () => {
            mapRef.current?.remove();
            mapRef.current = null;
        }
    }, [])
    
    return (
        <div className="map_container" ref={containerRef}>
            <div id="map"></div>
        </div>
    )
}