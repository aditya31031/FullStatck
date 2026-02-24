import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import "./WeatherApp.css";

import sunny from "../../assets/lottie/sunny.json";
import cloudy from "../../assets/lottie/cloudy.json";
import rainy from "../../assets/lottie/rainy.json";
import snowy from "../../assets/lottie/snowy.json";
import storm from "../../assets/lottie/storm.json";
import BackButton from "../BackButton";

const API_KEY = "9d81b01f5cf402f40b5e8ffd43a48762";

const animations = { sunny, cloudy, rainy, snowy, storm };

export default function WeatherApp() {
  const [city, setCity] = useState("Bengaluru");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState("sunny");

  // Function to fetch weather based on any city (used on search)
  const fetchWeather = async (cityParam) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityParam}&units=metric&appid=${API_KEY}`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data);
      setError("");

      const main = data.weather[0].main.toLowerCase();
      if (main.includes("rain")) setTheme("rainy");
      else if (main.includes("cloud")) setTheme("cloudy");
      else if (main.includes("snow")) setTheme("snowy");
      else if (main.includes("thunder")) setTheme("storm");
      else setTheme("sunny");
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    const fetchInitialWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Bengaluru&units=metric&appid=${API_KEY}`
        );
        if (!res.ok) throw new Error("City not found");
        const data = await res.json();
        setWeather(data);
        setError("");

        const main = data.weather[0].main.toLowerCase();
        if (main.includes("rain")) setTheme("rainy");
        else if (main.includes("cloud")) setTheme("cloudy");
        else if (main.includes("snow")) setTheme("snowy");
        else if (main.includes("thunder")) setTheme("storm");
        else setTheme("sunny");
      } catch (err) {
        setError(err.message);
        setWeather(null);
      }
    };

    fetchInitialWeather();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) fetchWeather(city);
  };

  return (
    <>
      <BackButton />
      <div
        className={`weather-container ${theme}`}
        style={{
          color: theme === "snowy" || theme === "sunny" ? "#333" : "#fff",
        }}>
        <div className="weather-card">
          <h1 className="weather-title">WeatherSphere</h1>

          <form onSubmit={handleSubmit} className="weather-search">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Search city..."
              className="weather-input"
            />
            <button className="weather-btn">Search</button>
          </form>

          {error && <p className="weather-error">{error}</p>}

          {weather && (
            <div className="weather-info">
              <Lottie
                animationData={animations[theme] || animations["sunny"]}
                className="weather-lottie"
                loop
              />
              <h2 className="weather-location">
                {weather.name}, {weather.sys.country}
              </h2>
              <h1 className="weather-temp">
                {Math.round(weather.main.temp)}°C
              </h1>
              <p className="weather-desc">{weather.weather[0].description}</p>

              <div className="weather-stats">
                <div>
                  <i className="bx bx-wind"></i>
                  <span>{weather.wind.speed} m/s</span>
                </div>
                <div>
                  <i className="bx bx-droplet"></i>
                  <span>{weather.main.humidity}%</span>
                </div>
                <div>
                  <i className="bx bx-thermometer"></i>
                  <span>Feels {Math.round(weather.main.feels_like)}°C</span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="weather-glow"></div>
      </div>
    </>
  );
}
