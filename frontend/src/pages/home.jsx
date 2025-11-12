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
import MinuteCast from "../components/minuteCast";
import RecentLocations from "../components/recentLocation";
import QuickHourly from "../components/quickHourly";
import Alerts from "../components/alerts";
import HurricaneCenter from "../components/hurricaneCenter";
import News from "../components/newsCorner";
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

export default function Home({
  homeRef,
  weather,
  setWeather,
  settingsClicked,
  setSettingsClicked,
  dayNightClicked,
  setDayNightClicked,
}) {
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
  const [extraIsOpen, setExtraIsOpen] = useState(null);
  // Holds all of my relevant data for minute / hourly / daily forecasts. Highly Important!!!!
  const [forecastData, setForecastData] = useState(null);
  
  // The minute data from forecastData, sent to minuteCast
  const [minuteSeries, setMinuteSeries] = useState([]);
  const [oneCallCurrent, setOneCallCurrent] = useState(null);
  const [alertData, setAlertData] = useState([]);
  const [hurricaneData, setHurricaneData] = useState(null);
  const [newsData, setNewsData] = useState(null);

  const homeContainerRef = useRef(null);
  const sectionOneRef = useRef(null);
  const sectionTwoRef = useRef(null);
  const sectionThreeRef = useRef(null);
  const sectionFourRef = useRef(null);
  const sectionFiveRef = useRef(null);

  const [stateAbbr, setStateAbbr] = useState({
    'Alabama': "AL",
    'Alaska': "AK",
    'Arizona': "AZ",
    'Arkansas': "AR",
    'California': "CA",
    'Colorado': "CO",
    'Connecticut': "CT",
    'Delaware': "DE",
    'Florida': "FL",
    'Georgia': "GA",
    'Hawaii': "HI",
    'Idaho': "ID",
    'Illinois': "IL",
    'Indiana': "IN",
    'Iowa': "IA",
    'Kansas': "KS",
    'Kentucky': "KY",
    'Louisiana': "LA",
    'Maine': "ME",
    'Maryland': "MD",
    'Massachusetts': "MA",
    'Michigan': "MI",
    'Minnesota': "MN",
    'Mississippi': "MS",
    'Missouri': "MO",
    'Montana': "MT",
    'Nebraska': "NE",
    'Nevada': "NV",
    'New Hampshire': "NH",
    'New Jersey': "NJ",
    'New Mexico': "NM",
    'New York': "NY",
    'North Carolina': "NC",
    'North Dakota': "ND",
    'Ohio': "OH",
    'Oklahoma': "OK",
    'Oregon': "OR",
    'Pennsylvania': "PA",
    'Rhode Island': "RI",
    'South Carolina': "SC",
    'South Dakota': "SD",
    'Tennessee': "TN",
    'Texas': "TX",
    'Utah': "UT",
    'Vermont': "VT",
    'Virginia': "VA",
    'Washington': "WA",
    'West Virginia': "WV",
    'Wisconsin': "WI",
    'Wyoming': "WY",
  });

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
    hidden: {},
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.4,
      },
    },
    exit: {
      opacity: 0,
    },
  };

  const children = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.25,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.18,
        ease: "easeIn",
      },
    },
  };

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

    (async () => {
      const endpoint = buildEndpoint("/search/get-weather");
      try {
        const res = await postJsonWithRetry(
          endpoint,
          { pickedLocation },
          { retries: 3, baseDelayMs: 600 }
        );

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          console.warn("[weather] non-OK", res.status, text);
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
      let splitStr = str.split(" ");
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
      const endpoint = buildEndpoint("/search/by-coords");
      try {
        const res = await postJsonWithRetry(
          endpoint,
          { lat: userCoord.latitude, lon: userCoord.longitude },
          { retries: 3, baseDelayMs: 600 }
        );

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          console.warn("[weather] non-OK", res.status, text);
          throw new Error(`Weather request failed (${res.status})`);
        }

        const data = await res.json();
        if (cancelled) return;

        const place = shortenPlaceName(data.pickedLocation.name, 12);

        setPlace(place);
        setPickedLocation(data.pickedLocation);
        setWindLabel(generateWindLabel(data.current?.wind_speed_10m ?? 0));
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
  }, [userCoord, API, setWeather]);

  useLayoutEffect(() => {
    if (!weather?.current) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".section_content");

      sections.forEach((sec) => {
        const content = sec.querySelector(".section_content_container");

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
              },
            }
          );
        }
      });

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

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, homeContainerRef);

    return () => ctx.revert();
  }, [weather?.current]);

  function addToHistoryFromSearch(loc) {
    pushHistory({
      name: loc.name,
      lat: loc.latitude,
      lon: loc.longitude,
      admin1: loc.admin1,
      country: loc.country,
      temperature: null,
    });

    setStorageLocations(readHistory());
  }

  // Normalize One Call temps to °F if provider returned Kelvin (no units param)
  function normalizeOneCallUnits(oneCall) {
    const convertKtoF = (k) => (k - 273.15) * 9 / 5 + 32;

    // Heuristic: if temp looks like Kelvin (> 200), convert a few common fields.
    const looksKelvin =
      (oneCall?.current?.temp ?? 0) > 200 ||
      (oneCall?.hourly?.[0]?.temp ?? 0) > 200;

    if (!looksKelvin) return oneCall;

    const clone = JSON.parse(JSON.stringify(oneCall));

    if (clone.current?.temp > 200) {
      clone.current.temp = convertKtoF(clone.current.temp);
    }
    if (Array.isArray(clone.hourly)) {
      clone.hourly = clone.hourly.map((h) =>
        h && typeof h.temp === "number" ? { ...h, temp: convertKtoF(h.temp) } : h
      );
    }
    return clone;
  }

  // Build a function tempAt(ts) from One Call current/hourly
  function buildTempAt(oneCall) {
    const hourly = Array.isArray(oneCall?.hourly)
      ? oneCall.hourly.slice().sort((a, b) => a.dt - b.dt)
      : [];
    const current = oneCall?.current;

    if (!hourly.length) {
      return () => (current?.temp ?? null);
    }

    function findBracket(ts) {
      let lo = 0,
        hi = hourly.length - 1;
      if (ts <= hourly[0].dt) return { A: null, B: hourly[0] };
      if (ts >= hourly[hi].dt) return { A: hourly[hi], B: null };

      while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        const midDt = hourly[mid].dt;
        if (midDt === ts) return { A: hourly[mid], B: hourly[mid] };
        if (midDt < ts) lo = mid + 1;
        else hi = mid - 1;
      }
      return { A: hourly[hi], B: hourly[lo] };
    }

    return function tempAt(ts) {
      const { A, B } = findBracket(ts);

      if (!A && current?.dt != null && current?.temp != null) {
        const A2 = { dt: current.dt, temp: current.temp };
        const B2 = B;
        const span = (B2.dt - A2.dt) || 1;
        const w = Math.min(1, Math.max(0, (ts - A2.dt) / span));
        return A2.temp + w * (B2.temp - A2.temp);
      }

      if (!A) return B.temp;
      if (!B) return A.temp;
      if (A.dt === B.dt) return A.temp;

      const span = (B.dt - A.dt) || 1;
      const w = Math.min(1, Math.max(0, (ts - A.dt) / span));
      return A.temp + w * (B.temp - A.temp);
    };
  }

  // Merge provider minutely precip with interpolated minute temps
  function minuteSeriesWithTemp(oneCall) {
    const mins = Array.isArray(oneCall?.minutely) ? oneCall.minutely : [];
    const tempAt = buildTempAt(oneCall);

    const source =
      mins.length > 0
        ? mins
        : (() => {
            const start = oneCall?.current?.dt ?? Math.floor(Date.now() / 1000);
            return Array.from({ length: 60 }, (_, i) => ({
              dt: start + i * 60,
              precipitation: 0,
            }));
          })();

    return source.map((m) => ({
      dt: m.dt,
      precipitation: m.precipitation ?? 0,
      temp: tempAt(m.dt),
    }));
  }

  // ---------- Fetch minute-cast + build minute temps ----------
  useEffect(() => {
    // derive coords from pickedLocation (preferred) or userCoord
    const coords = pickedLocation
      ? {
          latitude:
            pickedLocation.latitude ??
            pickedLocation.lat ??
            null,
          longitude:
            pickedLocation.longitude ??
            pickedLocation.lon ??
            null,
        }
      : userCoord
      ? { latitude: userCoord.latitude, longitude: userCoord.longitude }
      : null;

    if (!coords || !Number.isFinite(coords.latitude) || !Number.isFinite(coords.longitude)) {
      return;
    }

    let cancelled = false;
    setError(null);

    (async () => {
      try {
        const endpoint = buildEndpoint("/search/get-minute-cast");
        const res = await postJsonWithRetry(
          endpoint,
          coords,
          { retries: 3, baseDelayMs: 600 }
        );

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          console.warn("[minute-cast] non-OK", res.status, text);
          throw new Error(`Minute-cast request failed (${res.status})`);
        }

        const raw = await res.json();
        if (cancelled) return;

        // Normalize then compute per-minute temps
        const normalized = normalizeOneCallUnits(raw);
        const series = minuteSeriesWithTemp(normalized);

        setForecastData(normalized);
        setMinuteSeries(series);
        setOneCallCurrent(raw);
      } catch (e) {
        if (!cancelled) {
          setError(e?.message || "Failed to fetch minute-cast");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [
    pickedLocation?.latitude,
    pickedLocation?.longitude,
    pickedLocation?.lat,
    pickedLocation?.lon,
    userCoord?.latitude,
    userCoord?.longitude,
  ]);

  useEffect(() => {
    if (!weather) return;

    let cancelled = false;

    (async () => {
      const endpoint = buildEndpoint("/search/get-alerts");
      try {
        
        const res = await postJsonWithRetry(
          endpoint,
          {latitude: pickedLocation.lat,
           longitude: pickedLocation.lon
          },
          { retries: 3, baseDelayMs: 600 }
        );

        if (!res.ok) {
          console.warn("[weather] non-OK", res.status);
          throw new Error(`Weather request failed (${res.status})`);
        }

        const result = await res.json();
        const features = result['features'];

        console.log(features)

        
        if (cancelled) return;

        setAlertData(features);
        
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
  }, [weather]);

  useEffect(() => {

    if (!weather) return;

    let cancelled = false;

    (async () => {
      const endpoint = buildEndpoint('/search/get-hurricane-data');
      try {
        const res = await postJsonWithRetry(endpoint,
          {},
          { retries: 3, baseDelayMs: 600 }
        );

        if (!res.ok) {
          console.warn("Failed to get hurricane data", res.status);
          throw new Error(`Failed to get hurricane data ${res.status}`);
        }

        const result = await res.json();
        const features = result['features'];
        setHurricaneData(features);
      } catch (e) {
          if (!cancelled) {
            setError(e?.message || "Failed to fetch hurricane data");
            setWeather(null);
          }
      } finally {
          if (!cancelled) setIsLoading(false);
      }
    })();

  }, [weather])

  useEffect(() => {

    if (!weather) return;

    let cancelled = false;

    (async () => {
      const endpoint = buildEndpoint('/search/get-news');
      try {
        const res = await postJsonWithRetry(endpoint,
          {}, // Params block
          { retries: 3, baseDelayMs: 600 }
        );

        if (!res.ok) {
          console.warn("Failed to get news data", res.status);
          throw new Error(`Failed to get news data ${res.status}`);
        }

        const result = await res.json();
        console.log(result);
      } catch (e) {
          if (!cancelled) {
            setError(e?.message || "Failed to fetch hurricane data");
            setWeather(null);
          }
      } finally {
          if (!cancelled) setIsLoading(false);
      }
    })();

  }, [weather])

  return (
    <WeatherContainer
      homeRef={homeRef}
      dayNightClicked={dayNightClicked}
      setDayNightClicked={setDayNightClicked}
      firstSearch={firstSearch}
    >
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
          oneCallCurrent={oneCallCurrent}
          setOneCallCurrent={setOneCallCurrent}
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
          oneCallCurrent={oneCallCurrent}
          setOneCallCurrent={setOneCallCurrent}
        />
      )}
      <motion.div
        className="home_container"
        ref={homeContainerRef}
        variants={homeVariant}
        initial="hidden"
        animate={!isLoading && weather ? "visible" : "hidden"}
        exit="exit"
      >
        <Settings
          locationTemps={locationTemps}
          setLocationTemps={setLocationTemps}
          pickedLocation={pickedLocation}
          setPickedLocation={setPickedLocation}
          stateAbbr={stateAbbr}
          storageLocations={storageLocations}
          setStorageLocations={setStorageLocations}
          pushHistory={pushHistory}
          setWeather={setWeather}
          setFirstSearch={setFirstSearch}
          userCoord={userCoord}
          setUserCoord={setUserCoord}
          settingsClicked={settingsClicked}
        />
        <RecentLocations
          weather={weather}
          locationTemps={locationTemps}
          setLocationTemps={setLocationTemps}
          pickedLocation={pickedLocation}
          setPickedLocation={setPickedLocation}
          stateAbbr={stateAbbr}
          storageLocations={storageLocations}
          setStorageLocations={setStorageLocations}
          pushHistory={pushHistory}
          setWeather={setWeather}
          setFirstSearch={setFirstSearch}
          userCoord={userCoord}
          setUserCoord={setUserCoord}
        />
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
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  opacity: {
                    duration: 0.2,
                    delay: 0.18,
                  },
                },
              }}
              exit={{
                opacity: 0,
                transition: {
                  opacity: {
                    duration: 0.2,
                  },
                },
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
          ) : error && !isLoading ? (
            <div className="section_error">{error}</div>
          ) : !isLoading && weather?.current ? (
            <>
              <div ref={sectionOneRef} className="section_content section_1">
                <div className="section_title">Current Weather</div>
                <div className="section_content_container">
                  <Location
                    name={place ? place : pickedLocation.name}
                    state={pickedLocation.admin1}
                  />
                  <motion.div className="home_temp_container" variants={children}>
                    <TempDisplay temp={weather.current.temperature_2m} />
                  </motion.div>
                  <motion.div
                    className="home_description_container"
                    variants={children}
                  >
                    <WeatherDescription
                      desc={
                        weatherDescriptionsObj[weather.current.weather_code]
                      }
                      wind={windLabel}
                    />
                  </motion.div>
                  <motion.div className="home_icon_container" variants={children}>
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

              <div ref={sectionFiveRef} className="section_content section_5">
                <div className="section_title">Minute To Minute Temperature</div>
                <div className="section_content_container">
                  <MinuteCast minuteSeries={minuteSeries} />
                </div>
              </div>

              <div className="section_content section_6">
                <div className="section_title">Hourly Weather</div>
                <div className="section_content_container">
                  <QuickHourly extraIsOpen={extraIsOpen} setExtraIsOpen={setExtraIsOpen} forecastData={forecastData} time={time} />
                </div>
              </div>

              <div className="section_content section_7">
                <div className="section_title">Alert Corner</div>
                <div className="section_content_container">
                  <Alerts alertData={alertData} />
                </div>
              </div>

              <div className="section_content section_8">
                <div className="section_title">Hurricane Center</div>
                <div className="section_content_container">
                  <HurricaneCenter hurricaneData={hurricaneData} setHurricaneData={setHurricaneData} />
                </div>
              </div>

              {/* Example: render minute-by-minute series with precipitation + interpolated temp */}
              {/*
              <div className="section_content">
                <div className="section_title">Next 60 Minutes</div>
                <div className="section_content_container">
                  <MinuteCast series={minuteSeries} />
                </div>
              </div>
              */}
            </>
          ) : null}
        </AnimatePresence>
      </motion.div>
      <Footer />
    </WeatherContainer>
  );
}
