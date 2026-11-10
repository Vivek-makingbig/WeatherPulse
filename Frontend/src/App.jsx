import { useState, useCallback } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Highlights from './components/Highlights';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import ExtraInfo from './components/ExtraInfo';
import { fetchWeatherData } from './utils/weatherApi';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = useCallback(async (city) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(city);
      setWeatherData(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data. Please try again.');
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {/* Animated background orbs */}
      <div className="app-background">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <div className="app-container">
        <Header />
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {/* Loading State */}
        {isLoading && (
          <div className="loading-container">
            <div className="loading-spinner" />
            <div className="loading-text">Fetching weather data...</div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="error-container">
            <div className="error-icon">😕</div>
            <div className="error-title">Something went wrong</div>
            <div className="error-message">{error}</div>
          </div>
        )}

        {/* Weather Dashboard */}
        {weatherData && !isLoading && !error && (
          <div className="dashboard-grid">
            <CurrentWeather data={weatherData.current} />
            <Highlights data={weatherData.current} />
            <HourlyForecast
              data={weatherData.hourly}
              timezone={weatherData.current.timezone}
            />
            <DailyForecast data={weatherData.daily} />
            <ExtraInfo
              current={weatherData.current}
              airQuality={weatherData.air_quality}
            />
          </div>
        )}

        {/* Welcome State */}
        {!weatherData && !isLoading && !error && (
          <div className="dashboard-grid">
            <div className="welcome-container">
              <div className="welcome-icon">🌤️</div>
              <div className="welcome-title">
                Welcome to WeatherPulse
              </div>
              <div className="welcome-subtitle">
                Search for any city to get real-time weather data, hourly forecasts,
                5-day predictions, air quality index, and more — all beautifully visualized.
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;