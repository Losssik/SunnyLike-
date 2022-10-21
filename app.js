"use strict";

const tescik = document.querySelector(".main__header");
const weatherCard = document.querySelector(".weather__card");
const maxTemperature = document.querySelector(".weather__maxtemp");
const minTemperature = document.querySelector(".weather__mintemp");
const wind = document.querySelector(".weather__wind");

const updateWeather = function (data) {
  tescik.textContent = data.city.name;
  //converting from kelvin to celsius
  maxTemperature.textContent = `${(data.list[0].main.temp_max - 273.15).toFixed(
    1
  )} 'C`;
  minTemperature.textContent = `${(data.list[0].main.temp_min - 273.15).toFixed(
    1
  )} 'C  `;
  //converting from km/h to m/s
  wind.textContent = `${((data.list[0].wind.speed / 1000) * 3600).toFixed(
    1
  )} km/h`;

  //showing card
  weatherCard.style.opacity = 1;
};

const request = fetch(
  "https://api.openweathermap.org/data/2.5/forecast?lat=54.51&lon=18.53&appid=14b138fd386ea13bf4ae40177706e7a5"
);

const getWeatherInfo = function () {
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=14b138fd386ea13bf4ae40177706e7a5"
  )
    .then((resposne) => resposne.json())
    .then(function (data) {
      console.log(data);
      updateWeather(data);
    });
};

getWeatherInfo();
