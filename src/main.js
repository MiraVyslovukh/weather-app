// current day function
function getDay(day) {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayIndex = day.getDay();
  return weekDays[dayIndex];
}

// current time function
function showTime(time) {
  let currentHour = time.getHours();
  // supporting hours
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = time.getMinutes();
  // supporting minutes
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  // background adaptation function
  let myContainer = document.querySelector(".my-container");
  if (currentHour >= 18 || currentHour < 6) {
    myContainer.style.background =
      "linear-gradient(112.1deg, rgb(32, 38, 57) 11.4%, rgb(63, 76, 119) 70.2%)";
    document.querySelector(".image").src = "images/logo-inverted.png";
  } else {
    myContainer.style.background =
      "linear-gradient(112.4deg, rgb(176, 174, 225) 44.9%, rgb(135, 197, 235) 94.5%)";
  }
  return currentHour + ":" + currentMinutes;
}

function getForecast(coordinates) {
  let apiKey = "4c9b53e4f8f5eb00df5915bdca340605";
  let units = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(displayForecast);
}

function showWeather(response) {
  document.querySelector(".city-name").innerHTML = response.data.name;
  document.querySelector("#search-engine").value = "";
  tempInC = Math.round(response.data.main.temp);
  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".description").innerHTML =
    response.data.weather[0].main;
  document.querySelector(
    ".wind"
  ).innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  document.querySelector(
    ".humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

// search engine function & api call
function searchCity(city) {
  let apiKey = "a4888af71c12fab15abb2092a9d7ef0e";
  let units = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-engine").value;
  searchCity(city);
}

function searchCurrentLocation(position) {
  let apiKey = "a4888af71c12fab15abb2092a9d7ef0e";
  let units = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(showWeather);
}

function retrievePosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

// current day function call
let day = document.querySelector(".day");
let currentDay = new Date();
day.innerHTML = `${getDay(currentDay)}, `;

// curent time function call
let time = document.querySelector(".current-time");
let currentTime = new Date();
time.innerHTML = showTime(currentTime);

// searchengine call
let search = document.getElementById("search-field");
search.addEventListener("submit", handleSubmit);

let btn = document.querySelector("#btn");
btn.addEventListener("click", retrievePosition);

// cercius vs. fahrenheit function call
let tempInC = null;

function changeToFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector(".temperature");
  let tempInF = Math.round((tempInC * 9) / 5 + 32);
  temp.innerHTML = tempInF;
}

function changetoCelcius(event) {
  event.preventDefault();
  let temp = document.querySelector(".temperature");
  temp.innerHTML = tempInC;
}

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", changetoCelcius);
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeToFahrenheit);

// display forecast
// convert given timestamp value into an index
function formatDate(timestamp) {
  let day = new Date(timestamp * 1000);
  let date = day.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row justify-content-evenly">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      // every forecast equals itself + one more self and a div element
      // to be triggered 5 times
      forecastHTML += `<div class="col-2 my-col"> 
           <div class="forecast-day">${formatDate(forecastDay.dt)}</div>
           <img
            src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            id="forecast-weather-icon" width="40"
          />
          <div class="weather-forecast-temperature">
        <span class="forecast-temp-max">${Math.round(
          forecastDay.temp.max
        )}°</span>
        <span class="forecast-temp-min">${Math.round(
          forecastDay.temp.min
        )}°</span>
        </div>
        </div>
        `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

searchCity("Lviv"); // default city that is searched on load
