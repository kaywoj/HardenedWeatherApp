const API_KEY = `78ac636b235bc08f5f9445682cdcc53e`
const form = document.querySelector("form")
const search = document.querySelector("#search")
const weather = document.querySelector("#weather")
import logger from './logger.js';
import { encrypt, decrypt, hash } from './crypto.js';
  
const isValidCity = (city) => {
    // Check if the city name only contains letters and spaces
    return /^[a-zA-Z\s]+$/.test(city);
  };

const getWeather = async (city) => {
    weather.innerHTML = `<h2>Loading...</h2>`;
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return showWeather(data);
    } catch (error) {
      console.error('Error:', error);
      weather.innerHTML = `<h2>Failed to fetch weather data. Please try again later.</h2>`;
    }
  };

const showWeather = (data) => {
  if (data.cod =="404"){
      weather.innerHTML = `<h2> City not Found<h2>`
  }
  const tempCelsius = data.main.temp;
  const tempFahrenheit = (tempCelsius * 9/5) + 32;
  weather.innerHTML = `
      <div>
          <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
      </div>
      <div>
          <h2>${tempCelsius.toFixed(2)} ℃ / ${tempFahrenheit.toFixed(2)} ℉</h2>
          <h4>${data.weather[0].main}</h4>
      </div>
  `
}

form.addEventListener(
    "submit",
    function(event){
      event.preventDefault();
      const city = search.value;
      if (isValidCity(city)) {
        getWeather(city);
      } else {
        weather.innerHTML = '<h2>Please enter a valid city name</h2>';
      }
    }
  );




