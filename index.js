// date and time
let now = new Date();

let h2 = document.querySelector("h2");

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

h2.innerHTML = `${day} ${hours}:${minutes}`;

// search form
function searchCity(event) {
  event.preventDefault();
  let searchCityInput = document.querySelector("#search-city-input");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = searchCityInput.value;
  findCity(searchCityInput.value);
}

function findCity(city) {
  let apiKey = "29be32213f7acee7090f774579eb6a64";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
  console.log(apiUrl);
}

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureMain = document.querySelector("#current-temperature");
  temperatureMain.innerHTML = `${temperature}`;
  document.querySelector("#current-city").innerHTML = response.data.name;
  let lowTemperature = document.querySelector("#low-temperature");
  lowTemperature.innerHTML = `${Math.round(response.data.main.temp_min)}°C/ `;
  let highTemperature = document.querySelector("#high-temperature");
  highTemperature.innerHTML = `${Math.round(response.data.main.temp_max)}°C`;
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

// current location
function getLatLon(response) {
  console.log(response);
  let apiKey = "29be32213f7acee7090f774579eb6a64";
  let lat = response.coords.latitude;
  let lon = response.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLatLon);
}

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", getCurrentLocation);

// conversion

// function convertToFahrenheit(event) {
//   event.preventDefault();
//   let temperatureElement = document.querySelector("#current-temperature");
//   temperatureElement.innerHTML = 66;
// }

// function convertToCelsius(event) {
//   event.preventDefault();
//   let temperatureElement = document.querySelector("#current-temperature");
//   temperatureElement.innerHTML = 19;
// }

// let fahrenheitLink = document.querySelector("#fahrenheit-link");
// fahrenheitLink.addEventListener("click", convertToFahrenheit);

// let celsiusLink = document.querySelector("#celsius-link");
// celsiusLink.addEventListener("click", convertToCelsius);
