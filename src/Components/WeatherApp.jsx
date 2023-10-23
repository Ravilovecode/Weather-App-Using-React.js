import React, { useState } from 'react';
import './Weather.css';

import search_icon from '../Assets/search.png';
import cloud_icon from '../Assets/cloud.png';
import humidity_icon from '../Assets/humidity.png';
import wind_icon from '../Assets/wind.png';







const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const apiKey = "be877785f90b483c17291e7268a1802e";
  
    const search = async () => {
      if (city.trim() === "") {
        return;
      }
  
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${apiKey}`;
  
      try {
        let response = await fetch(url);
        let data = await response.json();
  
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
  
    return (
      <div className='container'>
        <div className='top-bar'>
          <input
            type='text'
            className='cityInput'
            placeholder='Search'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <div className="search-icon" onClick={search}>
            <img src={search_icon} alt="Search" />
          </div>
        </div>
  
        <div className='weather-image'>
          <img src={cloud_icon} alt="Weather Icon" />
        </div>
  
        {weatherData ? (
          <div>
            <div className="weather-temp">{weatherData.main.temp}°C</div>
            <div className="weather-location">{weatherData.name}</div>
            <div className="data-container">
              <div className="element">
                <img src={humidity_icon} alt="Humidity Icon" className='icon' />
                <div className="data">
                  <div className="humidity-percent">
                    {weatherData.main.humidity}%
                  </div>
                  <div className="text">Humidity</div>
                </div>
              </div>
              <div className="element">
                <img src={wind_icon} alt="Wind Icon" className='icon' />
                <div className="data">
                  <div className="wind-rate">
                    {weatherData.wind.speed} km/h
                  </div>
                  <div className="text">Wind Speed</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="loading">Enter a city and click 'Search' to get weather data.</div>
        )}
      </div>
    );
  };

  export default WeatherApp;
  