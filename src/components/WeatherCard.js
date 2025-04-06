import React from 'react';

const WeatherCard = ({ weather }) => {
  return (
    <div className="weather-card">
      <h2>{weather.name}, {weather.sys.country}</h2>
      <h3>{weather.weather[0].main}</h3>
      <p>{weather.main.temp}°C</p>
      <p>Feels like: {weather.main.feels_like}°C</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind Speed: {weather.wind.speed} m/s</p>
    </div>
  );
};

export default WeatherCard;
