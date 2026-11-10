import { useState, useEffect } from 'react';

export default function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dateStr = time.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const timeStr = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  return (
    <header className="header">
      <div className="header-brand">
        <div className="header-logo">⛅</div>
        <div>
          <h1 className="header-title">WeatherPulse</h1>
          <p className="header-subtitle">Real-time Weather Intelligence</p>
        </div>
      </div>
      <div className="header-time">
        <div className="header-date">{dateStr}</div>
        <div className="header-clock">{timeStr}</div>
      </div>
    </header>
  );
}