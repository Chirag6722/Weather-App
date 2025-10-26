import { Box, Card, CardContent, Typography, Avatar } from '@mui/material';

function formatDay(dt_txt) {
  const d = new Date(dt_txt);
  return d.toLocaleDateString(undefined, { weekday: 'short' });
}

export default function Forecast({ forecastData, units = 'metric' }) {
  if (!forecastData || !forecastData.list) return null;

  // pick one forecast per day (prefer 12:00 entries)
  const byDay = {};
  forecastData.list.forEach((entry) => {
    const day = entry.dt_txt.split(' ')[0];
    const time = entry.dt_txt.split(' ')[1];
    if (!byDay[day]) byDay[day] = entry;
    // prefer 12:00
    if (time === '12:00:00') byDay[day] = entry;
  });

  const days = Object.values(byDay).slice(0, 5);
  const tempUnit = units === 'imperial' ? '°F' : '°C';

  return (
    <Box>
      <Typography 
        variant="h6" 
        sx={{ 
          fontWeight: 600,
          mb: 2,
          color: 'var(--text-primary)'
        }}
      >
        5-Day Forecast
      </Typography>
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: { 
          xs: 'repeat(2, 1fr)', 
          sm: 'repeat(3, 1fr)', 
          md: 'repeat(5, 1fr)' 
        },
        gap: 1.5
      }}>
        {days.map((d) => (
          <Card 
            key={d.dt} 
            sx={{ 
              textAlign: 'center',
              transition: 'transform 0.2s ease'
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  fontWeight: 600,
                  mb: 0.5,
                  color: 'var(--text-primary)',
                  fontSize: '0.875rem'
                }}
              >
                {formatDay(d.dt_txt)}
              </Typography>
              <Box sx={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                my: 0.5
              }}>
                <img
                  src={`https://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`}
                  alt={d.weather[0].description}
                  style={{ 
                    width: 64, 
                    height: 64
                  }}
                />
              </Box>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600,
                  mb: 0.25,
                  color: 'var(--text-primary)'
                }}
              >
                {Math.round(d.main.temp)}{tempUnit}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'var(--text-secondary)',
                  textTransform: 'capitalize',
                  display: 'block',
                  fontSize: '0.75rem'
                }}
              >
                {d.weather[0].main}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}


