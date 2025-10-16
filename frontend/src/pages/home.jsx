import { useState, useEffect, useRef, useLayoutEffect } from "react";
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
import Settings from "../components/settings";
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
import SdkMap from "../components/map";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


export default function Home({ homeRef, weather, setWeather, settingsClicked, setSettingsClicked, dayNightClicked, setDayNightClicked }) {
  const [searched, setSearched] = useState(false);
  const [place, setPlace] = useState(null);
  const [userCoord, setUserCoord] = useState(null);
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
  const [autoSuggestionOpen, setAutoSuggestionOpen] = useState(false);
  const [storageLocations, setStorageLocations] = useState(() => readHistory());
  const [chosenHistoryLocation, setChosenHistoryLocation] = useState(null);
  const [open, setOpen] = useState(false);

  const homeContainerRef = useRef(null);
  const sectionOneRef = useRef(null);
  const sectionTwoRef = useRef(null);
  const sectionThreeRef = useRef(null);
  const sectionFourRef = useRef(null);


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
  }, [pickedLocation, API, setWeather]);

  function shortenPlaceName(str, maxLength) {
    if (str.length > maxLength) {
      let splitStr = str.split(' ');
      let shortenedPlace = splitStr[0].slice(0, maxLength);
      return shortenedPlace;
    }
  }

  useEffect(() => {
    if (!userCoord) return;

    let cancelled = false;
    setIsLoading(true);
    setError(null);



    (async () => {
      const endpoint = buildEndpoint('/search/by-coords');
      try {
        const res = await postJsonWithRetry(
          endpoint,
          { lat: userCoord.latitude, lon: userCoord.longitude },
          { retries: 3, baseDelayMs: 600 }
        );
        
        if (!res.ok) {
            const text = await res.text().catch(() => '');
            console.warn('[weather] non-OK', res.status, text);
            throw new Error(`Weather request failed (${res.status})`);
        }
        
        
        const data = await res.json();
        if (cancelled) return;

        const place = shortenPlaceName(data.pickedLocation.name, 12);
        
        setPlace(place);
        setPickedLocation(data.pickedLocation);
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


  }, [userCoord, API, setWeather])

  useLayoutEffect(() => {
  // only run once real content exists
  if (!weather?.current) return;

  // scope all selectors to the home container (nice cleanup on unmount)
  const ctx = gsap.context(() => {
    const sections = gsap.utils.toArray(".section_content");

    sections.forEach((sec) => {
      const content = sec.querySelector(".section_content_container");
      const title   = sec.querySelector(".section_title");

      // reveal the section body when it enters
      if (content) {
        gsap.fromTo(
          sec,
          { x: -24, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            overwrite: "auto",
            scrollTrigger: {
              trigger: sec,
              start: "top 90%",
              end: "top 30%",
              toggleActions: "play none none reverse",
              // markers: true, // ← uncomment to debug
            },
          }
        );
      }
    });

    // batch reveal for any items you tag with .reveal-on-scroll
    ScrollTrigger.batch(".reveal-on-scroll", {
      start: "top 80%",
      onEnter: (els) =>
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.08,
        }),
      onLeaveBack: (els) =>
        gsap.to(els, { opacity: 0, y: 12, duration: 0.3 }),
    });

    // after layout settles (images/icons/map), recalc positions
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, homeContainerRef); // limits selectors to your home container

  return () => ctx.revert();
}, [weather?.current]); // rebuild when main content appears


  

  function addToHistoryFromSearch(loc) {
    pushHistory({
      name: loc.name,
      lat: loc.latitude,
      lon: loc.longitude,
      admin1: loc.admin1,
      country: loc.country,
      temperature: null,
    })

    setStorageLocations(readHistory());
  }

  // useEffect(() => {
  //   if (firstSearch) {
  //     homeContainerRef.current.style.gap = "4rem";
  //   } else {
  //     homeContainerRef.current.style.gap = "2rem";
  //   }
  // }, [firstSearch])

  return (
    <WeatherContainer homeRef={homeRef} dayNightClicked={dayNightClicked} setDayNightClicked={setDayNightClicked} firstSearch={firstSearch}>
      {pickedLocation ? (
        <Navbar
          date={date}
          time={time}
          setTime={setTime}
          pickedLocation={pickedLocation}
          name={pickedLocation.name}
          state={pickedLocation.admin1}
          stateAbbr={stateAbbr}
          setSettingsClicked={setSettingsClicked}
          locationTemps={locationTemps}
          setLocationTemps={setLocationTemps}
          storageLocations={storageLocations}
          setStorageLocations={setStorageLocations}
          pushHistory={pushHistory}
          setWeather={setWeather}
          setFirstSearch={setFirstSearch}
          setUserCoord={setUserCoord}
          dayNightClicked={dayNightClicked}
          setDayNightClicked={setDayNightClicked}
          homeRef={homeRef}
          weather={weather}
        />
      ) : (
        <Navbar
         date={date} 
         time={time} 
         setTime={setTime} 
         setSettingsClicked={setSettingsClicked}
         locationTemps={locationTemps}
         pickedLocation={pickedLocation}
         setLocationTemps={setLocationTemps}
         stateAbbr={stateAbbr}
         storageLocations={storageLocations}
         setStorageLocations={setStorageLocations}
         pushHistory={pushHistory}
         weather={weather}
         setWeather={setWeather}
         setFirstSearch={setFirstSearch}
         setUserCoord={setUserCoord}
         dayNightClicked={dayNightClicked}
         setDayNightClicked={setDayNightClicked}
         homeRef={homeRef}
         />
      )}
      <motion.div
       className="home_container"
       ref={homeContainerRef}
       variants={homeVariant}
       initial="hidden"
       animate={(!isLoading && weather) ? "visible" : "hidden"}
       exit="exit"
       >
        <Settings locationTemps={locationTemps} setLocationTemps={setLocationTemps} pickedLocation={pickedLocation} setPickedLocation={setPickedLocation} stateAbbr={stateAbbr} storageLocations={storageLocations} setStorageLocations={setStorageLocations} pushHistory={pushHistory} setWeather={setWeather} setFirstSearch={setFirstSearch} userCoord={userCoord} setUserCoord={setUserCoord} settingsClicked={settingsClicked} />
        <RecentLocations weather={weather} locationTemps={locationTemps} setLocationTemps={setLocationTemps} pickedLocation={pickedLocation} setPickedLocation={setPickedLocation} stateAbbr={stateAbbr} storageLocations={storageLocations} setStorageLocations={setStorageLocations} pushHistory={pushHistory} setWeather={setWeather} setFirstSearch={setFirstSearch} userCoord={userCoord} setUserCoord={setUserCoord} />
        <SearchBar
          firstSearch={firstSearch}
          setFirstSearch={setFirstSearch}
          searchVal={searchVal}
          searched={searched}
          setSearchVal={setSearchVal}
          setLocations={setLocations}
          setSearched={setSearched}
          setPickedLocation={setPickedLocation}
          setStorageLocations={setStorageLocations}
          autoSuggestionOpen={autoSuggestionOpen}
          setAutoSuggestionOpen={setAutoSuggestionOpen}
          open={open}
          setOpen={setOpen}
        />
        <AnimatePresence>
          {searched && (
            <LocationPopup
              setFirstSearch={setFirstSearch}
              setSearched={setSearched}
              locations={locations}
              setLocations={setLocations}
              setPickedLocation={setPickedLocation}
              addToHistoryFromSearch={addToHistoryFromSearch}
              autoSuggestionOpen={autoSuggestionOpen}
              setAutoSuggestionOpen={setAutoSuggestionOpen}
              open={open}
              setOpen={setOpen}
            />
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
          : !isLoading && weather?.current ? (
            <>
               <div ref={sectionOneRef} className="section_content section_1">
                 <div className="section_title">Current Weather</div>
                 <div className="section_content_container">
                   <Location
                     name={place ? place : pickedLocation.name}
                     state={pickedLocation.admin1}
                   />
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
                                  </div>
                 </div>
              <div ref={sectionTwoRef} className="section_content section_2">
                <div className="section_title">Weather Details</div>
                <div className="section_content_container">
                  <motion.div
                   className="home_details_container"
                   variants={children}
                   >
                      <WeatherDetails weather={weather} />
                  </motion.div>
                </div>
              </div>
              <div ref={sectionThreeRef} className="section_content section_3">
                <div className="section_title">Quick Forecast</div>
                <div className="section_content_container">
                  <motion.div
                   className="home_quickcast_container"
                   variants={children}
                   >
                      <DailyQuickcast weather={weather} />
                  </motion.div>
                </div>
              </div>
              <div ref={sectionFourRef} className="section_content section_4">
                <div className="section_title">Radar</div>
                <div className="section_content_container">
                  <SdkMap weather={weather} />
                </div>
              </div>
            </>
           ) : null}
        </AnimatePresence>
      </motion.div>
      <Footer />
    </WeatherContainer>
  );
}
