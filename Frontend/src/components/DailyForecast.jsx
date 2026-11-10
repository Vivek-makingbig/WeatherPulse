import { getWeatherIcon, roundTemp, formatDay } from '../utils/weatherApi';

export default function DailyForecast({ data }) {
  if (!data || data.length === 0) return null;

  // Calculate temp range for bar visualization
  const allTemps = data.flatMap(d => [d.temp.min, d.temp.max]);
  const globalMin = Math.min(...allTemps);
  const globalMax = Math.max(...allTemps);
  const range = globalMax - globalMin || 1;

  return (
    <div className="glass-card forecast-card fade-in fade-in-delay-4">
      <div className="section-title">
       
        5-Day Forecast
      </div>

      <div className="forecast-list">
        {data.map((day) => {
          const barWidth = ((day.temp.max - day.temp.min) / range) * 100;

          return (
            <div key={day.dt} className="forecast-day">
              <div className="forecast-day-name">{formatDay(day.dt)}</div>
              <div className="forecast-day-icon">
                {getWeatherIcon(day.weather[0].icon)}
              </div>
              <div className="forecast-day-desc">
                {day.weather[0].description}
              </div>
              <div className="forecast-day-temps">
                <span className="forecast-day-high">{roundTemp(day.temp.max)}°</span>
                <span className="forecast-day-low">{roundTemp(day.temp.min)}°</span>
              </div>
              <div className="forecast-temp-bar">
                <div
                  className="forecast-temp-bar-fill"
                  style={{ width: `${Math.max(barWidth, 20)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}