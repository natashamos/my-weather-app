// date and time
function formatDate(timestamp) {
  let now = new Date(timestamp);
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
  return `${day} ${hours}:${minutes}`;
}

// weather details from API
function showWeather(response) {
  console.log(response.data.temperature);
  let temperature = Math.round(response.data.temperature.current);
  let temperatureMain = document.querySelector("#current-temperature");
  temperatureMain.innerHTML = `${temperature}`;
  document.querySelector("#current-city").innerHTML = response.data.city;
  // let lowTemperature = document.querySelector("#low-temperature");
  // lowTemperature.innerHTML = `${Math.round(
  //   response.data.daily.temperature.minimum
  // )}°C/ `;
  // let highTemperature = document.querySelector("#high-temperature");
  // highTemperature.innerHTML = `${Math.round(
  //   response.data.daily.temperature.maximum
  // )}°C`;
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = Math.round(response.data.temperature.feels_like);
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.temperature.humidity);
  let currentDayTime = document.querySelector("h2");
  currentDayTime.innerHTML = formatDate(response.data.time * 1000);
  document
    .querySelector("#icon")
    .setAttribute("src", response.data.condition.icon_url);
}

function searchCity(city) {
  let apiKey = "871226bt3b923e3o0bf9dcaf40d32e00";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
  console.log(apiUrl);
}

// search form
function handleSubmit(event) {
  event.preventDefault();
  let searchCityInput = document.querySelector("#search-city-input");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = searchCityInput.value;
  searchCity(searchCityInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

// default city
searchCity("Zagreb");

// current location
function getLatLon(response) {
  console.log(response);
  let lat = response.data.coords.latitude;
  let lon = response.data.coords.longitude;
  let apiKey = "871226bt3b923e3o0bf9dcaf40d32e00";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLatLon);
}

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", getCurrentLocation);

// conversion

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (14 * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = 19;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
