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

module.exports = router;