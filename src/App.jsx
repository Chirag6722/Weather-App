import { useState, useEffect } from 'react';
import "./App.css";
import axios from 'axios';
import SearchBox from "./SearchBox";
import WeatherDisplay from "./WeatherDisplay";
import Forecast from './Forecast';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  // units: 'metric' (C) or 'imperial' (F)
  const [units, setUnits] = useState(() => {
    try {
      return localStorage.getItem('units') || 'metric';
    } catch {
      return 'metric';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('units', units);
    } catch {
      // ignore
    }
  }, [units]);

  const handleWeatherData = (data) => {
    setWeatherData(data);
  };

  const [forecastData, setForecastData] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favorites') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  useEffect(() => {
    if (!weatherData?.coord) return;
    const { lat, lon } = weatherData.coord;
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    if (!apiKey) return;

    const unitParam = units === 'imperial' ? 'imperial' : 'metric';
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unitParam}&appid=${apiKey}`)
      .then(res => setForecastData(res.data))
      .catch(err => console.error('Forecast fetch error', err));
  }, [weatherData, units]);

  const toggleFavorite = (cityName) => {
    setFavorites((prev) => {
      const exists = prev.includes(cityName);
      const next = exists ? prev.filter((c) => c !== cityName) : [cityName, ...prev].slice(0, 10);
      return next;
    });
  };

  const handleFavoriteClick = (cityName) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    if (!apiKey) return;

    const unitParam = units === 'imperial' ? 'imperial' : 'metric';
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&units=${unitParam}&appid=${apiKey}`)
      .then(res => setWeatherData(res.data))
      .catch(err => console.error('Error fetching favorite city weather', err));
  };

  return (
    <div className="app-root">
      <h1 className="app-title">Weather App</h1>

      <SearchBox onWeatherData={handleWeatherData} units={units} setUnits={setUnits} />

      <WeatherDisplay weatherData={weatherData} units={units} favorites={favorites} toggleFavorite={toggleFavorite} />
    </div>
  );
}

export default App;
