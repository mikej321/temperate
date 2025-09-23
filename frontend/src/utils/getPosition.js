import { api } from "../utils/api.js";

export default function getPosition(opts = { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }) {
    return new Promise((resolve, reject) => {
        if (!("geolocation" in navigator)) return reject(new Error("Geolocation unavailable"));
        navigator.geolocation.getCurrentPosition(resolve, reject, opts);
    });
}