import { getWeatherIcon, roundTemp, getWindDirection } from '../utils/weatherApi';

export default function CurrentWeather({ data }) {
  if (!data) return null;

  return (
    <div className="glass-card current-weather fade-in fade-in-delay-1">
      <div className="current-weather-header">
        <span className="current-weather-location">{data.name}</span>
        <span className="current-weather-country">{data.country}</span>
      </div>

      <div className="current-weather-body">
        <div className="current-temp-section">
          <div className="current-temp">
            {roundTemp(data.temp)}<span className="unit">°C</span>
          </div>
          <div className="current-feels-like">
            Feels like {roundTemp(data.feels_like)}°C
          </div>
          <div className="current-description">{data.description}</div>
        </div>
        <div className="current-weather-icon">
          {getWeatherIcon(data.icon)}
        </div>
      </div>

      <div className="current-meta">
        <div className="meta-item">
          <div className="meta-item-icon">💧</div>
          <div className="meta-item-value">{data.humidity}%</div>
          <div className="meta-item-label">Humidity</div>
        </div>
        <div className="meta-item">
          <div className="meta-item-icon">💨</div>
          <div className="meta-item-value">{data.wind_speed.toFixed(1)}</div>
          <div className="meta-item-label">Wind m/s</div>
        </div>
        <div className="meta-item">
          <div className="meta-item-icon">👁️</div>
          <div className="meta-item-value">{(data.visibility / 1000).toFixed(1)}</div>
          <div className="meta-item-label">Visibility km</div>
        </div>
      </div>
    </div>
  );
}