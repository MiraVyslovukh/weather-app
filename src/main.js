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

searchCity("Lviv");
