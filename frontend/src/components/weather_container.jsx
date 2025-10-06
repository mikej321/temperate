import { useEffect, useRef, useState } from "react"

export default function WeatherContainer({ children, dayNightClicked, setDayNightClicked }) {

    const pageContainerRef = useRef(null);

    useEffect(() => {
        const pageRef = pageContainerRef.current;
    
        if (!dayNightClicked && !pageRef.classList.contains("dark_mode")) {
            pageRef.classList.add('dark_mode');
        } else if (dayNightClicked && pageRef.classList.contains("dark_mode")) {
            pageRef.classList.remove('dark_mode');
        }
      }, [dayNightClicked])

    return (
        <div
         className="page_container"
         ref={pageContainerRef}
         >
            { children }
        </div>
    )
}