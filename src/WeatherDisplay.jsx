import { Box, Typography, Card, CardContent } from '@mui/material';

// Weather condition to image mapping with day/night variations and multiple options
const getWeatherImage = (weatherMain, icon, temp) => {
  const isNight = icon?.includes('n');
  const isCold = temp < 10; // Below 10°C is considered cold/winter
  const isHot = temp > 25; // Above 25°C is considered hot/summer
  
  // Using Unsplash for atmospheric weather images with variety
  const weatherImages = {
    'Clear': {
      day: [
        'https://images.unsplash.com/photo-1601297183305-6df142704ea2?w=800&h=400&fit=crop&q=80', // Sunny sky
        'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop&q=80', // Clear blue sky
        'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=400&fit=crop&q=80', // Bright sunny day
        'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&h=400&fit=crop&q=80'  // Golden hour clear
      ],
      night: [
        'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=800&h=400&fit=crop&q=80', // Starry night
        'https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?w=800&h=400&fit=crop&q=80', // Night sky with moon
        'https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?w=800&h=400&fit=crop&q=80'  // Clear night sky
      ]
    },
    'Clouds': {
      day: [
        'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&h=400&fit=crop&q=80', // Cloudy sky
        'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?w=800&h=400&fit=crop&q=80', // Overcast clouds
        'https://images.unsplash.com/photo-1500740516770-92bd004b996e?w=800&h=400&fit=crop&q=80', // Dramatic clouds
        'https://images.unsplash.com/photo-1536514498073-50e69d39c6cf?w=800&h=400&fit=crop&q=80'  // Cloudy afternoon
      ],
      night: [
        'https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?w=800&h=400&fit=crop&q=80', // Cloudy night
        'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&h=400&fit=crop&q=80'  // Dark clouds night
      ]
    },
    'Rain': {
      day: [
        'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&h=400&fit=crop&q=80', // Rainy day
        'https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=800&h=400&fit=crop&q=80', // Rain on window
        'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=800&h=400&fit=crop&q=80', // Heavy rain
        'https://images.unsplash.com/photo-1433863448220-78aaa064ff47?w=800&h=400&fit=crop&q=80', // Rain storm
        'https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?w=800&h=400&fit=crop&q=80'  // Rainy weather
      ],
      night: [
        'https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?w=800&h=400&fit=crop&q=80', // Night rain
        'https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=800&h=400&fit=crop&q=80'  // Rain at night
      ]
    },
    'Drizzle': {
      day: [
        'https://images.unsplash.com/photo-1556485689-33e55ab56127?w=800&h=400&fit=crop&q=80', // Light drizzle
        'https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=800&h=400&fit=crop&q=80'  // Drizzle on glass
      ],
      night: [
        'https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=800&h=400&fit=crop&q=80'
      ]
    },
    'Thunderstorm': {
      day: [
        'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=800&h=400&fit=crop&q=80', // Lightning storm
        'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=800&h=400&fit=crop&q=80', // Thunder clouds
        'https://images.unsplash.com/photo-1594760947098-3b6e1a1f2f7a?w=800&h=400&fit=crop&q=80', // Storm approaching
        'https://images.unsplash.com/photo-1561553543-1d5c9b4e2f5e?w=800&h=400&fit=crop&q=80'  // Dramatic storm
      ],
      night: [
        'https://images.unsplash.com/photo-1594760947098-3b6e1a1f2f7a?w=800&h=400&fit=crop&q=80', // Night lightning
        'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=800&h=400&fit=crop&q=80'  // Thunder at night
      ]
    },
    'Snow': {
      day: [
        'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=800&h=400&fit=crop&q=80', // Snowy landscape
        'https://images.unsplash.com/photo-1457269449834-928af64c684d?w=800&h=400&fit=crop&q=80', // Winter snow
        'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?w=800&h=400&fit=crop&q=80', // Snowing
        'https://images.unsplash.com/photo-1478265409131-1f65c88f965c?w=800&h=400&fit=crop&q=80', // Heavy snow
        'https://images.unsplash.com/photo-1517299321609-52687d1bc55a?w=800&h=400&fit=crop&q=80', // Snowy trees
        'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=400&fit=crop&q=80'  // Winter wonderland
      ],
      night: [
        'https://images.unsplash.com/photo-1478265409131-1f65c88f965c?w=800&h=400&fit=crop&q=80', // Snow at night
        'https://images.unsplash.com/photo-1517299321609-52687d1bc55a?w=800&h=400&fit=crop&q=80'  // Snowy night
      ]
    },
    'Mist': {
      day: [
        'https://images.unsplash.com/photo-1487621167305-5d248087c724?w=800&h=400&fit=crop&q=80', // Misty morning
        'https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?w=800&h=400&fit=crop&q=80', // Foggy landscape
        'https://images.unsplash.com/photo-1446329813274-7c9036bd9a1f?w=800&h=400&fit=crop&q=80'  // Mist over water
      ],
      night: [
        'https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?w=800&h=400&fit=crop&q=80'
      ]
    },
    'Fog': {
      day: [
        'https://images.unsplash.com/photo-1487621167305-5d248087c724?w=800&h=400&fit=crop&q=80', // Foggy day
        'https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?w=800&h=400&fit=crop&q=80', // Dense fog
        'https://images.unsplash.com/photo-1446329813274-7c9036bd9a1f?w=800&h=400&fit=crop&q=80'  // Fog
      ],
      night: [
        'https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?w=800&h=400&fit=crop&q=80'
      ]
    },
    'Haze': {
      day: [
        'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&h=400&fit=crop&q=80', // Hazy sky
        'https://images.unsplash.com/photo-1446329813274-7c9036bd9a1f?w=800&h=400&fit=crop&q=80'  // Haze
      ],
      night: [
        'https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?w=800&h=400&fit=crop&q=80'
      ]
    }
  };

  const timeOfDay = isNight ? 'night' : 'day';
  const images = weatherImages[weatherMain]?.[timeOfDay] || weatherImages['Clear'][timeOfDay];
  
  // Randomly select an image from the array for variety
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

// Helper function to format time from Unix timestamp
const formatTime = (timestamp, timezone) => {
  const date = new Date((timestamp + timezone) * 1000);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes} ${ampm}`;
};

// Helper function to get humidity comfort level
const getHumidityComfort = (humidity) => {
  if (humidity < 30) return { level: 'Dry', color: '#e67e22' };
  if (humidity < 50) return { level: 'Comfortable', color: '#27ae60' };
  if (humidity < 70) return { level: 'Moderate', color: '#f39c12' };
  return { level: 'Humid', color: '#e74c3c' };
};

export default function WeatherDisplay({ weatherData, units = 'metric' }) {
  if (!weatherData) {
    return (
      <Box 
        sx={{ 
          textAlign: 'center', 
          padding: 4,
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          width: '100%'
        }}
      >
        <Typography 
          variant="body1" 
          sx={{ 
            color: 'var(--text-secondary)',
            fontWeight: 400
          }}
        >
          Enter a city name to see weather information
        </Typography>
      </Box>
    );
  }

  const { main, weather, name, sys, timezone } = weatherData;
  const weatherInfo = weather[0];
  const tempUnit = units === 'imperial' ? '°F' : '°C';
  const weatherImage = getWeatherImage(weatherInfo.main, weatherInfo.icon, main.temp);
  
  // Get sunrise and sunset times
  const sunriseTime = sys?.sunrise ? formatTime(sys.sunrise, timezone) : 'N/A';
  const sunsetTime = sys?.sunset ? formatTime(sys.sunset, timezone) : 'N/A';
  
  // Get humidity comfort level
  const humidityComfort = getHumidityComfort(main.humidity);

  return (
    <Box sx={{ width: '100%' }}>
      <Card sx={{ width: '100%' }}>
        <CardContent>
          {/* Weather Image */}
          <Box
            sx={{
              width: '100%',
              height: '250px',
              backgroundImage: `url(${weatherImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '4px',
              mb: 3
            }}
          />

          {/* City Name */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              textAlign: 'center',
              color: 'var(--text-primary)',
              mb: 3,
              fontSize: '1.75rem'
            }}
          >
            {name}
          </Typography>

          {/* Weather Details */}
          <Box sx={{ px: 2, pb: 2 }}>
            <Typography
              variant="body1"
              sx={{
                color: 'var(--text-secondary)',
                mb: 1,
                fontSize: '0.95rem'
              }}
            >
              Temperature = {Math.round(main.temp)}{tempUnit}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'var(--text-secondary)',
                mb: 1,
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              Humidity = {main.humidity}%
              <Box
                component="span"
                sx={{
                  fontSize: '0.75rem',
                  color: humidityComfort.color,
                  fontWeight: 600,
                  background: `${humidityComfort.color}15`,
                  padding: '2px 8px',
                  borderRadius: '4px'
                }}
              >
                {humidityComfort.level}
              </Box>
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'var(--text-secondary)',
                mb: 1,
                fontSize: '0.95rem'
              }}
            >
              Min Temp = {Math.round(main.temp_min)}{tempUnit}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'var(--text-secondary)',
                mb: 1,
                fontSize: '0.95rem'
              }}
            >
              Max Temp = {Math.round(main.temp_max)}{tempUnit}
            </Typography>

            {/* Sunrise and Sunset */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-around',
              mt: 2,
              mb: 2,
              py: 2,
              borderTop: '1px solid var(--border-color)',
              borderBottom: '1px solid var(--border-color)'
            }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'var(--text-muted)',
                    fontSize: '0.75rem',
                    display: 'block',
                    mb: 0.5
                  }}
                >
                  🌅 Sunrise
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'var(--text-secondary)',
                    fontWeight: 600,
                    fontSize: '0.9rem'
                  }}
                >
                  {sunriseTime}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'var(--text-muted)',
                    fontSize: '0.75rem',
                    display: 'block',
                    mb: 0.5
                  }}
                >
                  🌇 Sunset
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'var(--text-secondary)',
                    fontWeight: 600,
                    fontSize: '0.9rem'
                  }}
                >
                  {sunsetTime}
                </Typography>
              </Box>
            </Box>

            <Typography
              variant="body2"
              sx={{
                color: 'var(--text-muted)',
                textAlign: 'center',
                fontStyle: 'italic',
                fontSize: '0.875rem',
                textTransform: 'capitalize'
              }}
            >
              The weather can be described as {weatherInfo.description} and feels like {Math.round(main.feels_like)}{tempUnit}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}