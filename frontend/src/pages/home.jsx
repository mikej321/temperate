import { useState, useEffect, useRef } from "react";
import { readHistory, pushHistory } from "../utils/historyStorage";
import { api } from "../utils/api";
import axios from "axios";
import WeatherContainer from "../components/weather_container";
import LocationPopup from "../components/location_popup";
import Navbar from "../components/nav";
import SearchBar from "../components/searchBar";
import TempDisplay from "../components/tempDisplay";
import WeatherDescription from "../components/weatherDescription";
import WeatherIcon from "../components/weatherIcon";
import WeatherDetails from "../components/weatherDetails";
import DailyQuickcast from "../components/dailyQuickcast";
import Location from "../components/location";
import RecentLocations from "../components/recentLocation";
import Footer from "../components/footer";
import { SpinnerDotted } from "spinners-react";
import "../App.css";
import "../styles/nav.css";
import "../styles/home.css";
import "../styles/weather_container.css";
import generateWindLabel from "../utils/generateWindLabel";
import { AnimatePresence, motion } from "framer-motion";
import { displayTime } from "../utils/formatDate";
import ColdSpinner from "../components/coldSpinner";

export default function Home({ weather, setWeather }) {
  const [searched, setSearched] = useState(false);
  const [firstSearch, setFirstSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchVal, setSearchVal] = useState("");
  const [pickedLocation, setPickedLocation] = useState(null);
  const [windLabel, setWindLabel] = useState("");
  const [waking, setWaking] = useState(true);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(() => displayTime(new Date()));
  const [locations, setLocations] = useState([]);
  const [locationTemps, setLocationTemps] = useState([]);
  const [storageLocations, setStorageLocations] = useState(() => readHistory());
  const [chosenHistoryLocation, setChosenHistoryLocation] = useState(null);
  const [stateAbbr, setStateAbbr] = useState({
    'Alabama': 'AL',
      'Alaska': 'AK',
      'Arizona': 'AZ',
      'Arkansas': 'AR',
      'California': 'CA',
      'Colorado': 'CO',
      'Connecticut': 'CT',
      'Delaware': 'DE',
      'Florida': 'FL',
      'Georgia': 'GA',
      'Hawaii': 'HI',
      'Idaho': 'ID',
      'Illinois': 'IL',
      'Indiana': 'IN',
      'Iowa': 'IA',
      'Kansas': 'KS',
      'Kentucky': 'KY',
      'Louisiana': 'LA',
      'Maine': 'ME',
      'Maryland': 'MD',
      'Massachusetts': 'MA',
      'Michigan': 'MI',
      'Minnesota': 'MN',
      'Mississippi': 'MS',
      'Missouri': 'MO',
      'Montana': 'MT',
      'Nebraska': 'NE',
      'Nevada': 'NV',
      'New Hampshire': 'NH',
      'New Jersey': 'NJ',
      'New Mexico': 'NM',
      'New York': 'NY',
      'North Carolina': 'NC',
      'North Dakota': 'ND',
      'Ohio': 'OH',
      'Oklahoma': 'OK',
      'Oregon': 'OR',
      'Pennsylvania': 'PA',
      'Rhode Island': 'RI',
      'South Carolina': 'SC',
      'South Dakota': 'SD',
      'Tennessee': 'TN',
      'Texas': 'TX',
      'Utah': 'UT',
      'Vermont': 'VT',
      'Virginia': 'VA',
      'Washington': 'WA',
      'West Virginia': 'WV',
      'Wisconsin': 'WI',
      'Wyoming': 'WY'
  })

  const weatherDescriptionsObj = {
    0: "Clear Skies",
    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Rime Fog",
    51: "Light Drizzle",
    53: "Moderate Drizzle",
    55: "Dense Drizzle",
    56: "Light Freezing Drizzle",
    57: "Dense Freezing Drizzle",
    61: "Slight Rain",
    63: "Moderate Rain",
    65: "Heavy Rain",
    66: "Light Freezing Rain",
    67: "Heavy Freezing Rain",
    71: "Light Snow",
    73: "Moderate Snow",
    75: "Heavy Snow",
    80: "Light Showers",
    81: "Moderate Showers",
    82: "Heavy Showers",
    85: "Light Snow Showers",
    86: "Heavy Snow Showers",
    95: "Thunderstorms",
    96: "Thunderstorms with Slight Hail",
    99: "Thunderstorms with Heavy Hail",
  };

  const homeVariant = {
    hidden: {
      
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.4,
            delayChildren: 0.4
        }
    },
    exit: {
      opacity: 0
    }
  }

  const children = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.25, 
            ease: "easeOut"
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.18,
            ease: "easeIn"
        }
    }
  }

  const API = import.meta.env.VITE_API_URL;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  async function fetchWithRetry(
    input,
    init = {},
    { retries = 3, baseDelayMs = 500 } = {}
  ) {
    let attempt = 0;

    while (true) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(
          () => controller.abort(),
          attempt === 0 ? 12000 : 8000
        );
        const res = await fetch(input, { ...init, signal: controller.signal });
        clearTimeout(timeout);
        if (res.ok) return res;
        if (attempt >= retries) return res;
      } catch (err) {
        if (attempt >= retries) throw err;
      }
      await sleep(baseDelayMs * 2 ** attempt);
      attempt++;
    }
}

function buildEndpoint(path) {
  const base = import.meta.env.VITE_API_URL?.trim();
  if (!base) return path.startsWith("/") ? path : `/${path}`;
  return `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

  async function postJsonWithRetry(url, body, opts) {
    return fetchWithRetry(
      url,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
      opts
    );
  }


  const getWeather = async () => {
    const { data } = await api.post("/search/get-weather", {
      pickedLocation,
    });

    return data;
  };

  useEffect(() => {
    if (!pickedLocation) return;

    let cancelled = false;
    setIsLoading(true);
    setError(null);

    (async () => {
      const endpoint = buildEndpoint('/search/get-weather');
      try {
        console.debug('[weather] POST', endpoint, { pickedLocation });
        const res = await postJsonWithRetry(
          endpoint,
          { pickedLocation },
          { retries: 3, baseDelayMs: 600 }
        );
        
        if (!res.ok) {
            const text = await res.text().catch(() => '');
            console.warn('[weather] non-OK', res.status, text);
            throw new Error(`Weather request failed (${res.status})`);
        }
        
        
        const data = await res.json();
        if (cancelled) return;

        setWindLabel(generateWindLabel(data.current.wind_speed_10m));
        setWeather(data);
      } catch (e) {
        if (!cancelled) {
          setError(e?.message || "Failed to fetch weather");
          setWeather(null);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };

    //     getWeather()
    //     .then((res) => {
    //         setWindLabel(generateWindLabel(res.current.wind_speed_10m));
    //         setWeather(res);
    //     }
    // )
  }, [pickedLocation, API, setWeather]);

  // useEffect(() => {
  //   if (!locationTemps) return;

  //   let cancelled = false;
  //   setIsLoading(true);
  //   setError(null);

  //   (async () => {
  //     const endpoint = buildEndpoint('/search/get-weather');
  //     try {
  //       console.debug('[weather] POST', endpoint, { pickedLocation });
  //       const res = await postJsonWithRetry(
  //         endpoint,
  //         { pickedLocation },
  //         { retries: 3, baseDelayMs: 600 }
  //       );
        
  //       if (!res.ok) {
  //           const text = await res.text().catch(() => '');
  //           console.warn('[weather] non-OK', res.status, text);
  //           throw new Error(`Weather request failed (${res.status})`);
  //       }
        
        
  //       const data = await res.json();
  //       if (cancelled) return;

  //       setWindLabel(generateWindLabel(data.current.wind_speed_10m));
  //       setWeather(data);
  //     } catch (e) {
  //       if (!cancelled) {
  //         setError(e?.message || "Failed to fetch weather");
  //         setWeather(null);
  //       }
  //     } finally {
  //       if (!cancelled) setIsLoading(false);
  //     }
  //   })();

  //   return () => {
  //     cancelled = true;
  //   };
  // }, [locationTemps])

  return (
    <WeatherContainer>
      {pickedLocation ? (
        <Navbar
          date={date}
          time={time}
          setTime={setTime}
          pickedLocation={pickedLocation}
          name={pickedLocation.name}
          state={pickedLocation.admin1}
          stateAbbr={stateAbbr}
        />
      ) : (
        <Navbar date={date} time={time} setTime={setTime} />
      )}
      <motion.div
       className="home_container"
       variants={homeVariant}
       initial="hidden"
       animate={(!isLoading && weather) ? "visible" : "hidden"}
       exit="exit"
       >
        <RecentLocations locationTemps={locationTemps} setLocationTemps={setLocationTemps} pickedLocation={pickedLocation} setPickedLocation={setPickedLocation} stateAbbr={stateAbbr} storageLocations={storageLocations} setStorageLocations={setStorageLocations} pushHistory={pushHistory} setWeather={setWeather} setFirstSearch={setFirstSearch} />
        <SearchBar
          firstSearch={firstSearch}
          setFirstSearch={setFirstSearch}
          searchVal={searchVal}
          searched={searched}
          setSearchVal={setSearchVal}
          setLocations={setLocations}
          setSearched={setSearched}
        />
        <AnimatePresence>
          {searched && (
            <LocationPopup
              setFirstSearch={setFirstSearch}
              setSearched={setSearched}
              locations={locations}
              setLocations={setLocations}
              setPickedLocation={setPickedLocation}
            />
          )}
          {pickedLocation && (
            <>
              <Location
                name={pickedLocation.name}
                state={pickedLocation.admin1}
              />
            </>
          )}
          {isLoading ? (
            <motion.div
             className="loader_overlay"
             layout
             initial={{ 
              opacity: 0
             }}
             animate={{ 
              opacity: 1,
              transition: {
                opacity: {
                  duration: 0.2,
                  delay: 0.18
                }
              }
             }}
             exit={{ 
              opacity: 0,
              transition: {
                opacity: {
                  duration: 0.2,
                }
              }
            }}
             >
              <SpinnerDotted
                enabled={isLoading}
                size={60}
                thickness={80}
                color="#32739A"
                speed={50}
              />
            </motion.div>
          ): error && !isLoading ? <div className="section_error">{error}</div>
           : !isLoading && weather ? (
             <>
              <motion.div
               className="home_temp_container"
               variants={children}
               >
                  <TempDisplay temp={weather.current.temperature_2m} />
              </motion.div>
              <motion.div
               className="home_description_container"
               variants={children}
               >
                  <WeatherDescription
                    desc={weatherDescriptionsObj[weather.current.weather_code]}
                    wind={windLabel}
                  />
              </motion.div>
              <motion.div
               className="home_icon_container"
               variants={children}
               >
                  <WeatherIcon weather={weather} />
              </motion.div>
              <motion.div
               className="home_details_container"
               variants={children}
               >
                  <WeatherDetails weather={weather} />
              </motion.div>
              <motion.div
               className="home_quickcast_container"
               variants={children}
               >
                  <DailyQuickcast weather={weather} />
              </motion.div>
            </>
           ) : null}
        </AnimatePresence>
      </motion.div>
      <Footer />
    </WeatherContainer>
  );
}
