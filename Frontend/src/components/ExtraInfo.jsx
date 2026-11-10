import { formatTime, getAQILevel, getWindDirection } from '../utils/weatherApi';

export default function ExtraInfo({ current, airQuality }) {
  if (!current) return null;

  const aqiInfo = getAQILevel(airQuality?.aqi || 1);
  const windDir = getWindDirection(current.wind_deg);

  return (
    <div className="glass-card extra-info-card fade-in fade-in-delay-5">
      <div className="section-title">
        {/* <span className="section-title-icon">🌅</span> */}
        Sun & Air Quality
      </div>

      <div className="sun-times">
        <div className="sun-time-item">
          <div className="sun-time-icon">🌅</div>
          <div className="sun-time-label">Sunrise</div>
          <div className="sun-time-value">
            {formatTime(current.sunrise, current.timezone)}
          </div>
        </div>
        <div className="sun-time-item">
          <div className="sun-time-icon">🌇</div>
          <div className="sun-time-label">Sunset</div>
          <div className="sun-time-value">
            {formatTime(current.sunset, current.timezone)}
          </div>
        </div>
      </div>

      {airQuality && (
        <div className="air-quality">
          <div className="air-quality-header">
            <span className="air-quality-label">🌬️ Air Quality</span>
            <span className={`air-quality-badge ${aqiInfo.className}`}>
              {aqiInfo.label}
            </span>
          </div>
          <div className="air-quality-metrics">
            <div className="aq-metric">
              <div className="aq-metric-value">{airQuality.pm2_5}</div>
              <div className="aq-metric-label">PM2.5</div>
            </div>
            <div className="aq-metric">
              <div className="aq-metric-value">{airQuality.pm10}</div>
              <div className="aq-metric-label">PM10</div>
            </div>
            <div className="aq-metric">
              <div className="aq-metric-value">{airQuality.no2}</div>
              <div className="aq-metric-label">NO₂</div>
            </div>
            <div className="aq-metric">
              <div className="aq-metric-value">{airQuality.o3}</div>
              <div className="aq-metric-label">O₃</div>
            </div>
            <div className="aq-metric">
              <div className="aq-metric-value">{airQuality.so2}</div>
              <div className="aq-metric-label">SO₂</div>
            </div>
            <div className="aq-metric">
              <div className="aq-metric-value">{airQuality.co}</div>
              <div className="aq-metric-label">CO</div>
            </div>
          </div>
        </div>
      )}

      <div className="wind-compass">
        <div className="compass-circle">
          <span
            className="compass-arrow"
            style={{ transform: `rotate(${current.wind_deg}deg)` }}
          >
            ↑
          </span>
        </div>
        <div className="compass-labels">
          <div className="compass-label">Direction: <span>{windDir}</span></div>
          <div className="compass-label">Speed: <span>{current.wind_speed.toFixed(1)} m/s</span></div>
          <div className="compass-label">Degree: <span>{current.wind_deg}°</span></div>
        </div>
      </div>
    </div>
  );
}