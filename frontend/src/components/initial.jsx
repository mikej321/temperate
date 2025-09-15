import { useState, useRef, useEffect } from "react"

import WeatherContainer from "./weather_container"
import Navbar from "./nav"
import SearchBar from "./searchBar"
import LocationPopup from "./location_popup"
import { displayTime } from "../utils/formatDate"


export default function InitialPage({ setChosenLocation }) {
    const [searchVal, setSearchVal] = useState('');
    const [searched, setSearched] = useState(false);

    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(() => displayTime(new Date()));
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        if (locations.length == 0) return;

        setSearched(true);
    }, [locations])

    return (
        <WeatherContainer>
            <div className="home_container searched">
                <Navbar date={date} time={time} setTime={setTime} />
                <SearchBar searchVal={searchVal} setSearchVal={setSearchVal} setLocations={setLocations} setSearched={setSearched} />
                {searched && <LocationPopup locations={locations} setLocations={setLocations} setChosenLocation={setChosenLocation} searchVal={searchVal} />}
            </div>
        </WeatherContainer>
    )
}