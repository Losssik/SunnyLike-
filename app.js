"use strict";

const tescik = document.querySelector(".main__header");
const cardContainer = document.querySelector(".weather");
const weatherCard = document.querySelector(".weather__card");
const maxTemperature = document.querySelector(".weather__maxtemp");
const minTemperature = document.querySelector(".weather__mintemp");
const wind = document.querySelector(".weather__wind");
const searchBar = document.querySelector("#search__bar");
const btnSearch = document.querySelector("#btn");

// render error
const renderError = function (msg) {
  cardContainer.insertAdjacentText("beforeend", msg);
};

// updating weather info on the site
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

// getting weather data according to given coords
const getWeatherInfo = function (lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=14b138fd386ea13bf4ae40177706e7a5`
  )
    .then((resposne) => resposne.json())
    .then(function (data) {
      console.log(data);
      updateWeather(data);
    })
    .catch((err) => alert(err));
};

//// converting city name into coord LAT and LON

const getCityName = function (city) {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=14b138fd386ea13bf4ae40177706e7a5`
  )
    .then((res) => res.json())
    .then(function (data) {
      console.log(data);
      //getting coords
      const lat = data[0].lat;
      const lon = data[0].lon;

      console.log(lat, lon);

      getWeatherInfo(lat, lon);
    })
    .catch((err) => {
      console.log(err);
      renderError(`couldnt find this city '${err.message}'`);
    });
};

// getting data from a search bar and passing its value to the function
btnSearch.addEventListener("click", function () {
  const city = searchBar.value;
  getCityName(city);
});

// execution "saerch bar" when user presses ENTER

searchBar.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getCityName(searchBar.value);
    searchBar.value = "";
  }
});
