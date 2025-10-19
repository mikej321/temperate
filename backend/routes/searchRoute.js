const router = require('express').Router();
const axios = require('axios');

router.post('/', async (req, res) => {

    // I am going to do the zip code portion first before I do the address portion.

    // I'll need two different routes, one for the address and one for the zip code

    const API_KEY = process.env.API_KEY;

    const { searchVal } = req.body;
    
    const geocodeApi = 'https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=10&language=en&format=json';

    const { data } = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
        params: {
            name: searchVal,
            count: 10,
            language: "en",
            format: "json"
        }
    }) 

    return res.json({
        data
    })
})

router.post("/by-coords", async (req, res) => {
  try {
    const API_KEY = process.env.OPENWEATHER_KEY;
    const lat = Number(req.body.lat ?? req.body.latitude);
    const lon = Number(req.body.lon ?? req.body.longitude);

    if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
      return res.status(400).json({ error: "latitude/longitude required" });
    }
    if (!API_KEY) {
      return res.status(500).json({ error: "OPENWEATHER_KEY not set" });
    }

    const reverseGeo = await axios.get(
      "https://api.openweathermap.org/geo/1.0/reverse",
      {
        params: { lat, lon, limit: 1, appid: API_KEY },      // note: appid
        timeout: 7000,
        validateStatus: (s) => s >= 200 && s < 500,           // let us inspect 4xx
      }
    );

    // Log for debugging
    console.log("OWM status:", reverseGeo.status);
    console.log("OWM data:", reverseGeo.data);

    if (reverseGeo.status !== 200 || !Array.isArray(reverseGeo.data) || !reverseGeo.data[0]) {
      return res.status(502).json({
        error: "reverse geocoding failed",
        providerStatus: reverseGeo.status,
        providerMessage: reverseGeo.data?.message ?? "no result",
      });
    }

    const g = reverseGeo.data[0]; // { name, lat, lon, country, state? }

    const pickedLocation = {
      name: g.name,
      admin1: g.state ?? null,
      country: g.country ?? null,
      latitude: g.lat,
      longitude: g.lon,
      zip: g.zip ?? null, // often not provided by OWM
    };

    return res.json({ pickedLocation });
  } catch (err) {
    console.error("by-coords error:", err?.message);
    return res.status(500).json({ error: "internal error resolving coordinates" });
  }
});


router.post('/get-weather', async (req, res) => {
  try {
    const { pickedLocation, lat, lon } = req.body;

    // Normalize inputs: support pickedLocation.{latitude,longitude} OR {lat,lon}
    const latitude = Number(
      pickedLocation?.latitude ?? pickedLocation?.lat ?? lat
    );
    const longitude = Number(
      pickedLocation?.longitude ?? pickedLocation?.lon ?? lon
    );

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return res.status(400).json({
        error:
          'Missing/invalid coordinates. Send pickedLocation.{latitude,longitude} or {lat,lon}.',
      });
    }

    const params = {
      latitude,
      longitude,
      daily:
        'apparent_temperature_min,apparent_temperature_max,sunrise,sunset,weather_code,temperature_2m_max,temperature_2m_min',
      hourly: 'temperature_2m',
      current:
        'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m',
      timezone: 'auto',
      wind_speed_unit: 'mph',
      temperature_unit: 'fahrenheit',
      precipitation_unit: 'inch',
    };

    const { data } = await axios.get(
      'https://api.open-meteo.com/v1/forecast',
      { params }
    );
    return res.json(data);
  } catch (err) {
    console.error('get-weather failed:', err?.response?.data || err.message);
    return res.status(500).json({ error: 'Failed to fetch weather' });
  }
});

router.post('/get-history-temp', async (req, res) => {
    const { lat, lon } = req.body;
    console.log(lat, lon);

    const meteoApi = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=apparent_temperature_min,apparent_temperature_max,sunrise,sunset,weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`;

    const { data } = await axios.get(meteoApi);

    return res.json(data);
})

router.post('/get-alerts', async (req, res) => {

  const { latitude, longitude } = req.body;

  const { data } = await axios.get('https://api.weather.gov/alerts/active', {
    params: {
      point: `${latitude},${longitude}`
    }
  })

  res.json(data);
})

router.post('/get-minute-cast', async (req, res) => {

  const { latitude, longitude } = req.body;
  const API_KEY = process.env.OPENWEATHER_KEY;

  const { data } = await axios.get('https://api.openweathermap.org/data/3.0/onecall', {
    params: {
      lat: latitude,
      lon: longitude,
      appid: API_KEY,
      units: "imperial"
    }
  })

  res.json(data);
})

module.exports = router;