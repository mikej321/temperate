import { useEffect, useRef, useState } from "react"

export default function WeatherContainer({ children, dayNightClicked, setDayNightClicked, homeRef }) {

    return (
        <div
         className="page_container"
         ref={homeRef}
         >
            { children }
        </div>
    )
}