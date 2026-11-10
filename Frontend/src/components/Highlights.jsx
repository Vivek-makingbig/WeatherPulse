import { getUVLevel, getWindDirection, roundTemp } from '../utils/weatherApi';

export default function Highlights({ data }) {
  if (!data) return null;

  const uvInfo = getUVLevel(data.uvi);
  const windDir = getWindDirection(data.wind_deg);

  return (
    <div className="glass-card highlights-card fade-in fade-in-delay-2">
      <div className="section-title">
        {/* <span className="section-title-icon">✨</span> */}
        Today's Highlights
      </div>

      <div className="highlights-grid">
        <div className="highlight-item">
          <div className="highlight-item-header">
            <span className="highlight-item-icon">☀️</span>
            <span className="highlight-item-title">UV Index</span>
          </div>
          <div className="highlight-item-value" style={{ color: uvInfo.color }}>
            {data.uvi.toFixed(1)}
          </div>
          <div className="highlight-item-extra">{uvInfo.label}</div>
          <div className="uv-bar">
            <div
              className="uv-bar-fill"
              style={{ width: `${Math.min(data.uvi / 11 * 100, 100)}%` }}
            />
          </div>
        </div>

        <div className="highlight-item">
          <div className="highlight-item-header">
            <span className="highlight-item-icon">💨</span>
            <span className="highlight-item-title">Wind Status</span>
          </div>
          <div className="highlight-item-value">
            {data.wind_speed.toFixed(1)} <span style={{ fontSize: '14px', fontWeight: 400 }}>m/s</span>
          </div>
          <div className="highlight-item-extra">Direction: {windDir} ({data.wind_deg}°)</div>
        </div>

        <div className="highlight-item">
          <div className="highlight-item-header">
            <span className="highlight-item-icon">💧</span>
            <span className="highlight-item-title">Humidity</span>
          </div>
          <div className="highlight-item-value">{data.humidity}%</div>
          <div className="highlight-item-extra">
            Dew point: {roundTemp(data.dew_point)}°C
          </div>
          <div className="uv-bar">
            <div
              className="uv-bar-fill"
              style={{ width: `${data.humidity}%`, background: 'linear-gradient(135deg, #4facfe, #00f2fe)' }}
            />
          </div>
        </div>

        <div className="highlight-item">
          <div className="highlight-item-header">
            <span className="highlight-item-icon">🌡️</span>
            <span className="highlight-item-title">Pressure</span>
          </div>
          <div className="highlight-item-value">
            {data.pressure} <span style={{ fontSize: '14px', fontWeight: 400 }}>hPa</span>
          </div>
          <div className="highlight-item-extra">
            Cloudiness: {data.clouds}%
          </div>
        </div>
      </div>
    </div>
  );
}