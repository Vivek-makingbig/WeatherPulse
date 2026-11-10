import { useState } from 'react';

const QUICK_CITIES = ['New Delhi', 'Mumbai', 'London', 'New York', 'Tokyo', 'Dubai'];

export default function SearchBar({ onSearch, isLoading }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleQuickCity = (city) => {
    setQuery(city);
    onSearch(city);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-wrapper">
        <span className="search-icon">🔍</span>
        <input
          id="city-search-input"
          type="text"
          className="search-input"
          placeholder="Search any city or location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isLoading}
          autoComplete="off"
        />
        <button
          id="search-submit-btn"
          type="submit"
          className="search-btn"
          disabled={isLoading || !query.trim()}
        >
          {isLoading ? 'Loading...' : 'Search'}
        </button>
      </form>
      {/* <div className="quick-cities">
        {QUICK_CITIES.map((city) => (
          <button
            key={city}
            className="quick-city-btn"
            onClick={() => handleQuickCity(city)}
            disabled={isLoading}
          >
            {city}
          </button>
        ))}
      </div> */}
    </div>
  );
}