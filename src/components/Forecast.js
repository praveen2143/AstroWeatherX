import React from 'react';

const Forecast = ({ forecast }) => {
  return (
    <div className="forecast-container">
      <h2>5-Day Forecast</h2>
      <div className="forecast">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-day">
            <p>{new Date(day.dt_txt).toLocaleDateString('en-US', {
              weekday: 'short', month: 'short', day: 'numeric'
            })}</p>
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt="icon"
            />
            <p>{day.main.temp}°C</p>
            <p>{day.weather[0].main}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
