import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import { useEffect } from 'react';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    const favs = JSON.parse(localStorage.getItem('favorites')) || [];
    setSearchHistory(history);
    setFavorites(favs);
  }, []);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    const apiKey = "1f1e86844aa55e03b8af5cbbfafdd755";

    try {
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

      const [weatherRes, forecastRes] = await Promise.all([
        fetch(currentWeatherUrl),
        fetch(forecastUrl),
      ]);

      const weatherData = await weatherRes.json();
      const forecastData = await forecastRes.json();

      if (weatherData.cod === 200) {
        setWeather(weatherData);

        // Pick 1 forecast per day at 12:00 PM
        const filteredForecast = forecastData.list.filter(item =>
          item.dt_txt.includes("12:00:00")
        );
        setForecast(filteredForecast);
        if (!searchHistory.includes(city)) {
          const updatedHistory = [city, ...searchHistory].slice(0, 5); // Keep last 5
          setSearchHistory(updatedHistory);
          localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
        }
      } else {
        setWeather(null);
        setForecast([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setLoading(false);
  };

  return (
    <div className="star-background">
      <div className="shooting-stars"></div> {/* 👈 Add this */}
      <div className="app">
        <Header />
        <div className="search">
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchWeather}>Get Weather</button>
        </div>
  
        {loading && <p className="loading">Loading...</p>}
        <div className="history-section">
  <h3>Search History</h3>
  {searchHistory.map((item, idx) => (
    <button key={idx} onClick={() => setCity(item)}>{item}</button>
  ))}

  <h3>Favorites</h3>
  {favorites.map((item, idx) => (
    <button key={idx} onClick={() => setCity(item)}>{item} ⭐</button>
  ))}
</div>

        {weather && <WeatherCard weather={weather} />}
        {weather && (
  <button
    className="fav-btn"
    onClick={() => {
      if (!favorites.includes(city)) {
        const updatedFavs = [...favorites, city];
        setFavorites(updatedFavs);
        localStorage.setItem('favorites', JSON.stringify(updatedFavs));
      }
    }}
  >
    ⭐ Add to Favorites
  </button>
)}

        {forecast.length > 0 && <Forecast forecast={forecast} />}
      </div>
    </div>
  );
  
};

export default App;
