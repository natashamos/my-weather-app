// day and time
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

// forecast
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row text-center week forecast" id="forecast">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col">
      <div class="day-forecast">Fri</div>
      <div>
        <img
          src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/few-clouds-day.png"
          alt=""
          width="40"
        />
      </div>
      <span class="max-temp-forecast">9°C</span>
      <span class="min-temp-forecast">4°C</span>
    </div>`;
  });
  forecastHTMl = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// weather details from API
function showWeather(response) {
  console.log(response.data.temperature);

  document.querySelector("#current-city").innerHTML = response.data.city;

  let temperatureMain = document.querySelector("#current-temperature");
  celsiusTemperature = Math.round(response.data.temperature.current);
  temperatureMain.innerHTML = `${celsiusTemperature}`;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;

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

// current location
function getLatLon(response) {
  console.log(response);
  let lat = response.coords.latitude;
  let lon = response.coords.longitude;
  let apiKey = "871226bt3b923e3o0bf9dcaf40d32e00";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLatLon);
}

// conversion
function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", getCurrentLocation);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

// default city
searchCity("Zagreb");
displayForecast();
