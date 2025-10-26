import { useState } from 'react';
import { TextField, Button, Box, Typography, CircularProgress, Alert, ToggleButtonGroup, ToggleButton, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RoomIcon from '@mui/icons-material/Room';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import axios from 'axios';

export default function SearchBox({ onWeatherData, units, setUnits }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (coords) => {
    // coords: { lat, lon } optional
    if (!coords && !searchQuery.trim()) return;

    setLoading(true);
    setError('');

    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

      if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
        throw new Error('Please add your OpenWeatherMap API key to the .env file');
      }

      const unitParam = units === 'imperial' ? 'imperial' : 'metric';
      let url = '';

      if (coords) {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=${unitParam}&appid=${apiKey}`;
      } else {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(searchQuery)}&units=${unitParam}&appid=${apiKey}`;
      }

      const response = await axios.get(url);

      onWeatherData(response.data);
      console.log('Weather data:', response.data);
    } catch (err) {
      console.error('Error fetching weather:', err);
      if (err.response?.status === 404) {
        setError('City not found. Please check the spelling and try again.');
      } else if (err.response?.status === 401) {
        setError('Invalid API key. Please check your OpenWeatherMap API key.');
      } else {
        setError('Failed to fetch weather data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      return;
    }

    setLoading(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        handleSearch({ lat: latitude, lon: longitude });
      },
      (geoErr) => {
        console.error('Geolocation error:', geoErr);
        setError('Unable to retrieve your location. Please allow location access or search manually.');
        setLoading(false);
      },
      { enableHighAccuracy: false, timeout: 10000 }
    );
  };

  const handleUnitChange = (_, value) => {
    if (!value) return;
    setUnits(value);
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: 1.5,
        width: '100%'
      }}
    >
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', width: '100%' }}>
        <TextField
          fullWidth
          label="City Name"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder=""
          disabled={loading}
          aria-label="City name"
          size="small"
          sx={{
            '& .MuiInputBase-root': {
              fontSize: '0.95rem'
            }
          }}
        />

        <Button
          variant="contained"
          onClick={() => handleSearch()}
          disabled={!searchQuery.trim() || loading}
          sx={{ 
            minWidth: 'auto', 
            px: 2.5,
            py: 1,
            fontSize: '0.875rem'
          }}
          aria-label="Search"
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : 'SEARCH'}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ width: '100%', fontSize: '0.875rem' }}>
          {error}
        </Alert>
      )}
    </Box>
  );
}