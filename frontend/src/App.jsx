// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/home';
import ColdSpinner from './components/coldSpinner';
import './App.css';

const API = import.meta.env.VITE_API_URL;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchWithRetry(input, init = {}, { retries = 3, baseDelayMs = 500 } = {}) {
  let attempt = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), attempt === 0 ? 12000 : 8000);
      const res = await fetch(input, { ...init, signal: controller.signal });
      clearTimeout(timeout);
      if (res.ok) return res;
      if (attempt >= retries) return res; // give up with the last response
    } catch (err) {
      if (attempt >= retries) throw err; // give up with the last error
    }
    await sleep(baseDelayMs * 2 ** attempt); // exponential backoff
    attempt++;
  }
}

function App() {
  const [weather, setWeather] = useState(null);
  const [waking, setWaking] = useState(true);
  const [settingsClicked, setSettingsClicked] = useState(false);
  const [dayNightClicked, setDayNightClicked] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              weather={weather}
              setWeather={setWeather}
              waking={waking}
              settingsClicked={settingsClicked}
              setSettingsClicked={setSettingsClicked}
              dayNightClicked={dayNightClicked}
              setDayNightClicked={setDayNightClicked}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
