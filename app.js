"use strict";

const tescik = document.querySelector(".main__header");
const cardContainer = document.querySelector(".weather");
const weatherCard = document.querySelector(".weather__card");
const maxTemperature = document.querySelector(".weather__maxtemp");
const minTemperature = document.querySelector(".weather__mintemp");
const wind = document.querySelector(".weather__wind");
const searchBar = document.querySelector("#search__bar");
const btnSearch = document.querySelector("#btn");
const errorContainer = document.querySelector(".error");
const errroMessage = document.querySelector(".error__message");
const currentDay = document.querySelector(".weather__day");

// render error
const renderError = function (msg) {
  errroMessage.textContent = msg;
  errorContainer.style.padding = "2rem";
  setTimeout(() => {
    errorContainer.classList.add("hide");
  }, 1500);

  errorContainer.classList.remove("hide");
};

// get current user position
const userCurrentLocation = navigator.geolocation.getCurrentPosition(function (
  position
) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  getWeatherInfo(lat, lon);
});

// updating weather info on the site
const updateWeather = function (data) {
  //getting ID weather for correct displaying icon (ID IS RELATED WITH AN ICON)
  const weatherIcon = data.list[0].weather[0].id;

  //if rain display rain icon

  if (
    (weatherIcon >= 300 && weatherIcon <= 321) ||
    (weatherIcon >= 500 && weatherIcon <= 531)
  ) {
    const htmlIcon = `
    <div class="weather__icon__container">
      <ion-icon
        name="rainy-outline"
        class="weather__icon"
      ></ion-icon>
    </div>
  
    `;

    weatherCard.insertAdjacentHTML("afterbegin", htmlIcon);
  }

  //if cloud display cloud icon
  if (weatherIcon >= 802 && weatherIcon <= 804) {
    const htmlIcon = `
    <div class="weather__icon__container">
      <ion-icon
        name="cloud-outline"
        class="weather__icon"
      ></ion-icon>
    </div>
  
    `;

    weatherCard.insertAdjacentHTML("afterbegin", htmlIcon);
  }

  //if sun display sun icon
  if (weatherIcon === 800) {
    const htmlIcon = `
    <div class="weather__icon__container">
      <ion-icon
        name="sunny-outline"
        class="weather__icon"
      ></ion-icon>
    </div>
  
    `;

    weatherCard.insertAdjacentHTML("afterbegin", htmlIcon);
  }
  //if sun with cloud  display sun with cloud icon
  if (weatherIcon === 801) {
    const htmlIcon = `
    <div class="weather__icon__container">
      <ion-icon
        name="partly-sunny-outline"
        class="weather__icon"
      ></ion-icon>
    </div>
  
    `;

    weatherCard.insertAdjacentHTML("afterbegin", htmlIcon);
  }

  //if thunderstorm display thunderstorm icon
  if (weatherIcon >= 200 && weatherIcon <= 232) {
    const htmlIcon = `
    <div class="weather__icon__container">
      <ion-icon
        name="thunderstorm-outline"
        class="weather__icon"
      ></ion-icon>
    </div>
  
    `;

    weatherCard.insertAdjacentHTML("afterbegin", htmlIcon);
  }

  //if snow display snow icon
  if (weatherIcon >= 600 && weatherIcon <= 622) {
    const htmlIcon = `
    <div class="weather__icon__container">
      <ion-icon
        name="snow-outline"
        class="weather__icon"
      ></ion-icon>
    </div>
  
    `;

    weatherCard.insertAdjacentHTML("afterbegin", htmlIcon);
  }

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

  // gettin current day
  currentDay.textContent = day;

  //showing card

  weatherCard.style.opacity = 1;
};

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
      console.log(err);
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

// getting current day
const date = new Date();
let day = date.getDay();
const options = { weekday: "long" };
day = new Intl.DateTimeFormat("en-US", options).format(date);
