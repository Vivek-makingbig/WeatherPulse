// OpenWeatherMap API integration
// Get a free API key at: https://openweathermap.org/api
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || '';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Weather condition to emoji mapping
export const weatherIcons = {
  '01d': '☀️', '01n': '🌙',
  '02d': '⛅', '02n': '☁️',
  '03d': '☁️', '03n': '☁️',
  '04d': '☁️', '04n': '☁️',
  '09d': '🌧️', '09n': '🌧️',
  '10d': '🌦️', '10n': '🌧️',
  '11d': '⛈️', '11n': '⛈️',
  '13d': '🌨️', '13n': '🌨️',
  '50d': '🌫️', '50n': '🌫️',
};

export function getWeatherIcon(iconCode) {
  return weatherIcons[iconCode] || '🌤️';
}

// Format unix timestamp to time string
export function formatTime(timestamp, timezone = 0) {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC',
  });
}

// Format unix timestamp to day name
export function formatDay(timestamp) {
  const date = new Date(timestamp * 1000);
  const today = new Date();
  if (date.toDateString() === today.toDateString()) return 'Today';
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
  return date.toLocaleDateString('en-US', { weekday: 'short' });
}

// Format hour
export function formatHour(timestamp, timezone = 0) {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    hour12: true,
    timeZone: 'UTC',
  });
}

// Round temperature
export function roundTemp(temp) {
  return Math.round(temp);
}

// Wind direction from degrees
export function getWindDirection(deg) {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return directions[Math.round(deg / 22.5) % 16];
}

// UV Index level
export function getUVLevel(uvi) {
  if (uvi <= 2) return { label: 'Low', color: '#34d399' };
  if (uvi <= 5) return { label: 'Moderate', color: '#fbbf24' };
  if (uvi <= 7) return { label: 'High', color: '#fb923c' };
  if (uvi <= 10) return { label: 'Very High', color: '#f87171' };
  return { label: 'Extreme', color: '#a855f7' };
}

// AQI level
export function getAQILevel(aqi) {
  const levels = ['', 'Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
  const classes = ['', 'good', 'good', 'moderate', 'poor', 'poor'];
  return { label: levels[aqi] || 'Unknown', className: classes[aqi] || 'moderate' };
}

// ===== DEMO DATA =====
// This provides realistic demo data so the app works immediately without an API key
function generateDemoData(city) {
  const now = Math.floor(Date.now() / 1000);
  const timezone = 19800; // IST

  const cityData = {
    'New Delhi': { lat: 28.61, lon: 77.23, temp: 38, humidity: 45, country: 'IN', desc: 'haze', icon: '50d' },
    'Mumbai': { lat: 19.08, lon: 72.88, temp: 32, humidity: 78, country: 'IN', desc: 'scattered clouds', icon: '03d' },
    'London': { lat: 51.51, lon: -0.13, temp: 18, humidity: 65, country: 'GB', desc: 'overcast clouds', icon: '04d' },
    'New York': { lat: 40.71, lon: -74.01, temp: 28, humidity: 55, country: 'US', desc: 'clear sky', icon: '01d' },
    'Tokyo': { lat: 35.69, lon: 139.69, temp: 26, humidity: 70, country: 'JP', desc: 'light rain', icon: '10d' },
    'Paris': { lat: 48.86, lon: 2.35, temp: 22, humidity: 60, country: 'FR', desc: 'few clouds', icon: '02d' },
    'Sydney': { lat: -33.87, lon: 151.21, temp: 16, humidity: 72, country: 'AU', desc: 'broken clouds', icon: '04d' },
    'Dubai': { lat: 25.28, lon: 55.3, temp: 42, humidity: 30, country: 'AE', desc: 'clear sky', icon: '01d' },
    'Singapore': { lat: 1.35, lon: 103.82, temp: 30, humidity: 82, country: 'SG', desc: 'thunderstorm', icon: '11d' },
    'Berlin': { lat: 52.52, lon: 13.41, temp: 20, humidity: 58, country: 'DE', desc: 'partly cloudy', icon: '02d' },
    'Bangalore': { lat: 12.97, lon: 77.59, temp: 27, humidity: 68, country: 'IN', desc: 'light rain', icon: '10d' },
  };

  // Normalize city name for case-insensitive matching
  const normalizedInput = city.trim().toLowerCase();
  const matchedKey = Object.keys(cityData).find(
    (key) => key.toLowerCase() === normalizedInput
  );

  if (!matchedKey) {
    throw new Error(
      `City "${city}" not found. In demo mode, try: ${Object.keys(cityData).join(', ')}.`
    );
  }

  const cd = cityData[matchedKey];

  // Generate hourly forecast
  const hourly = Array.from({ length: 24 }, (_, i) => {
    const tempVariation = Math.sin((i / 24) * Math.PI * 2) * 5;
    const icons = ['01d', '02d', '03d', '10d', '01d', '02d'];
    return {
      dt: now + i * 3600,
      temp: cd.temp + tempVariation + (Math.random() * 3 - 1.5),
      feels_like: cd.temp + tempVariation + 2,
      humidity: cd.humidity + Math.floor(Math.random() * 20 - 10),
      weather: [{ description: cd.desc, icon: icons[i % icons.length] }],
      pop: Math.random() * 0.4,
      wind_speed: 3 + Math.random() * 8,
    };
  });

  // Generate 5-day forecast
  const daily = Array.from({ length: 5 }, (_, i) => {
    const dayTemp = cd.temp + (Math.random() * 6 - 3);
    const icons = ['01d', '02d', '03d', '10d', '04d'];
    const descs = ['clear sky', 'few clouds', 'scattered clouds', 'light rain', 'overcast clouds'];
    return {
      dt: now + i * 86400,
      temp: { day: dayTemp, min: dayTemp - 5 - Math.random() * 3, max: dayTemp + 3 + Math.random() * 2 },
      humidity: cd.humidity + Math.floor(Math.random() * 15 - 7),
      weather: [{ description: descs[i % descs.length], icon: icons[i % icons.length] }],
      wind_speed: 3 + Math.random() * 10,
      pop: Math.random() * 0.5,
      uvi: 2 + Math.random() * 8,
      sunrise: now + i * 86400 + 21600,
      sunset: now + i * 86400 + 64800,
    };
  });

  return {
    current: {
      name: matchedKey,
      country: cd.country,
      lat: cd.lat,
      lon: cd.lon,
      temp: cd.temp,
      feels_like: cd.temp + 3,
      humidity: cd.humidity,
      pressure: 1008 + Math.floor(Math.random() * 20),
      wind_speed: 4 + Math.random() * 8,
      wind_deg: Math.floor(Math.random() * 360),
      visibility: 6000 + Math.floor(Math.random() * 4000),
      uvi: 3 + Math.random() * 7,
      clouds: Math.floor(Math.random() * 100),
      dew_point: cd.temp - 10 + Math.random() * 5,
      description: cd.desc,
      icon: cd.icon,
      sunrise: now - (now % 86400) + 21600,
      sunset: now - (now % 86400) + 64800,
      timezone,
    },
    hourly,
    daily,
    air_quality: {
      aqi: Math.ceil(Math.random() * 3),
      pm2_5: (10 + Math.random() * 40).toFixed(1),
      pm10: (20 + Math.random() * 60).toFixed(1),
      no2: (5 + Math.random() * 30).toFixed(1),
      o3: (30 + Math.random() * 50).toFixed(1),
      so2: (2 + Math.random() * 10).toFixed(1),
      co: (200 + Math.random() * 500).toFixed(0),
    },
  };
}

// ===== API FUNCTIONS =====

export async function fetchWeatherData(city) {
  // If no API key, use demo data
  if (!API_KEY) {
    // Simulate network delay for realistic feel
    await new Promise(resolve => setTimeout(resolve, 800));
    const data = generateDemoData(city);
    return data;
  }

  try {
    // Step 1: Get coordinates from city name
    const geoRes = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`
    );
    const geoData = await geoRes.json();

    if (!geoData.length) {
      throw new Error(`City "${city}" not found`);
    }

    const { lat, lon, name, country } = geoData[0];

    // Step 2: Get current weather
    const currentRes = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    const currentData = await currentRes.json();

    // Step 3: Get forecast data
    const forecastRes = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    const forecastData = await forecastRes.json();

    // Step 4: Get air quality
    const aqRes = await fetch(
      `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    const aqData = await aqRes.json();

    // Process hourly forecast (next 24 hours)
    const hourly = forecastData.list.slice(0, 8).map(item => ({
      dt: item.dt,
      temp: item.main.temp,
      feels_like: item.main.feels_like,
      humidity: item.main.humidity,
      weather: item.weather,
      pop: item.pop || 0,
      wind_speed: item.wind.speed,
    }));

    // Process daily forecast (aggregate by day)
    const dailyMap = {};
    forecastData.list.forEach(item => {
      const day = new Date(item.dt * 1000).toDateString();
      if (!dailyMap[day]) {
        dailyMap[day] = { temps: [], item: item };
      }
      dailyMap[day].temps.push(item.main.temp);
    });

    const daily = Object.values(dailyMap).slice(0, 5).map(({ temps, item }) => ({
      dt: item.dt,
      temp: {
        day: temps.reduce((a, b) => a + b) / temps.length,
        min: Math.min(...temps),
        max: Math.max(...temps),
      },
      humidity: item.main.humidity,
      weather: item.weather,
      wind_speed: item.wind.speed,
      pop: item.pop || 0,
      uvi: 5,
      sunrise: currentData.sys.sunrise,
      sunset: currentData.sys.sunset,
    }));

    // Process air quality
    const aqComponents = aqData.list[0]?.components || {};

    return {
      current: {
        name: name,
        country: country,
        lat, lon,
        temp: currentData.main.temp,
        feels_like: currentData.main.feels_like,
        humidity: currentData.main.humidity,
        pressure: currentData.main.pressure,
        wind_speed: currentData.wind.speed,
        wind_deg: currentData.wind.deg || 0,
        visibility: currentData.visibility,
        uvi: 5,
        clouds: currentData.clouds?.all || 0,
        dew_point: currentData.main.temp - 10,
        description: currentData.weather[0].description,
        icon: currentData.weather[0].icon,
        sunrise: currentData.sys.sunrise,
        sunset: currentData.sys.sunset,
        timezone: currentData.timezone,
      },
      hourly,
      daily,
      air_quality: {
        aqi: aqData.list[0]?.main?.aqi || 1,
        pm2_5: (aqComponents.pm2_5 || 0).toFixed(1),
        pm10: (aqComponents.pm10 || 0).toFixed(1),
        no2: (aqComponents.no2 || 0).toFixed(1),
        o3: (aqComponents.o3 || 0).toFixed(1),
        so2: (aqComponents.so2 || 0).toFixed(1),
        co: (aqComponents.co || 0).toFixed(0),
      },
    };
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}