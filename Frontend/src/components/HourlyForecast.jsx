import { getWeatherIcon, roundTemp, formatHour } from '../utils/weatherApi';

export default function HourlyForecast({ data, timezone }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="glass-card hourly-forecast fade-in fade-in-delay-3">
      <div className="section-title">
        {/* <span className="section-title-icon">🕐</span> */}
        Hourly Forecast
      </div>

      <div className="hourly-scroll">
        {data.slice(0, 12).map((hour, index) => (
          <div
            key={hour.dt}
            className={`hourly-item ${index === 0 ? 'now' : ''}`}
          >
            <div className="hourly-time">
              {index === 0 ? 'Now' : formatHour(hour.dt, timezone)}
            </div>
            <div className="hourly-icon">
              {getWeatherIcon(hour.weather[0].icon)}
            </div>
            <div className="hourly-temp">{roundTemp(hour.temp)}°</div>
            {hour.pop > 0 && (
              <div className="hourly-rain">
                💧 {Math.round(hour.pop * 100)}%
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}