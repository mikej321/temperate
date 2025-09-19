import { useState, useEffect, useRef } from 'react';

import { api } from '../utils/api';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';
import WeatherContainer from '../components/weather_container';
import LocationPopup from '../components/location_popup';
import Navbar from '../components/nav';
import SearchBar from '../components/searchBar';
import TempDisplay from '../components/tempDisplay';
import WeatherDescription from '../components/weatherDescription';
import WeatherIcon from '../components/weatherIcon';
import WeatherDetails from '../components/weatherDetails';
import DailyQuickcast from '../components/dailyQuickcast';
import Location from '../components/location';
import Footer from '../components/footer';
import '../App.css';
import '../styles/nav.css';
import '../styles/home.css';
import '../styles/weather_container.css';
import generateWindLabel from '../utils/generateWindLabel';
import { displayTime } from '../utils/formatDate';


export default function Home({ weather, setWeather }) {
    /* SearchBar will send search results here to the parent */

    /* Use openweather for current forecasting and open-meteo for hourly/daily/minuteCast */

    const [firstSearch, setFirstSearch] = useState(false);
    const [searched, setSearched] = useState(false);
    const [searchVal, setSearchVal] = useState('');
    const [pickedLocation, setPickedLocation] = useState(null);
    const [windLabel, setWindLabel] = useState('');

    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(() => displayTime(new Date()));
    const [locations, setLocations] = useState([]);

    const weatherDescriptionsObj = {
        0: 'Clear Skies',
        1: 'Mainly Clear',
        2: 'Partly Cloudy',
        3: 'Overcast',
        45: 'Fog',
        48: 'Rime Fog',
        51: 'Light Drizzle',
        53: 'Moderate Drizzle',
        55: 'Dense Drizzle',
        56: 'Light Freezing Drizzle',
        57: 'Dense Freezing Drizzle',
        61: 'Slight Rain',
        63: 'Moderate Rain',
        65: 'Heavy Rain',
        66: 'Light Freezing Rain',
        67: 'Heavy Freezing Rain',
        71: 'Light Snow',
        73: 'Moderate Snow',
        75: 'Heavy Snow',
        80: 'Light Showers',
        81: 'Moderate Showers',
        82: 'Heavy Showers',
        85: 'Light Snow Showers',
        86: 'Heavy Snow Showers',
        95: 'Thunderstorms',
        96: 'Thunderstorms with Slight Hail',
        99: 'Thunderstorms with Heavy Hail'
    };
    

    const getWeather = async () => {
        const { data } = await api.post('/search/get-weather', {
            pickedLocation
        });

        return data;
    }

    useEffect(() => {
        if (!pickedLocation) return;

        getWeather()
        .then((res) => {
            setWindLabel(generateWindLabel(res.current.wind_speed_10m));
            setWeather(res);
        }
    )
    }, [pickedLocation])

    /* Set up Location in the navbar to account for there not being a location yet in Desktop. This shouldn't be an issue in mobile
    
    Make it to where everything weather related is hidden until a search is performed. Once a search is performed, it will expand outwards
    into the actual UI. 
    */

    return (
        <WeatherContainer>
            {pickedLocation ? <Navbar date={date} time={time} setTime={setTime} pickedLocation={pickedLocation} name={pickedLocation.name} state={pickedLocation.admin1} /> : <Navbar date={date} time={time} setTime={setTime} />}
            <motion.div
             className="home_container"
             initial={{ ['--search_row']: '100%' }}
             animate={{ ['--search_row']: firstSearch ? '40px' : '100%' }}
             type={{
                type: 'spring',
                duration: 0.2,
                stiffness: 200,
                damping: 25
             }}
             >
                <SearchBar firstSearch={firstSearch} setFirstSearch={setFirstSearch} searchVal={searchVal} searched={searched} setSearchVal={setSearchVal} setLocations={setLocations} setSearched={setSearched} />
                <AnimatePresence>
                    {searched && <LocationPopup setSearched={setSearched} locations={locations} setLocations={setLocations} setPickedLocation={setPickedLocation} />}
                </AnimatePresence>
                {pickedLocation && (
                    <>
                        <Location name={pickedLocation.name} state={pickedLocation.admin1} />
                    </>
                )}
                <AnimatePresence>
                    {weather && (
                    <>
                        <TempDisplay temp={weather.current.temperature_2m} />
                        <WeatherDescription desc={weatherDescriptionsObj[weather.current.weather_code]} wind={windLabel} />
                        <WeatherIcon weather={weather} />
                        <WeatherDetails weather={weather} />
                        <DailyQuickcast weather={weather} />
                    </>
                    )}
                </AnimatePresence>
            </motion.div>
            <Footer />
        </WeatherContainer>
    )
}