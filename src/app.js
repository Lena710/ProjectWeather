//chellenge 1(week4)
let now = new Date();

let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
let currentWeekDay = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let currentMonth = months[now.getMonth()];

let currentDate = now.getDate();

let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}

let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

let currentTime = document.querySelector("#currentDate");
currentTime.innerHTML = `${currentWeekDay}, ${currentMonth} ${currentDate}, ${currentHour}:${currentMinutes}`;

//challenge (week5)
function showTemperature(response) {
  document.querySelector("#chosenCity").innerHTML = response.data.name;
  document.querySelector("#currentTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#feelsLike").innerHTML = `Feels like: ${Math.round(
    response.data.main.feels_like
  )}`;
}

function searchCity(city) {
  let apiKey = "acd3ca1419714529dc453d27a3161478";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  searchCity(city);
}

let form = document.querySelector("form");
form.addEventListener("submit", submit);

//bonus Week5

function changeCurrentCity(response) {
  console.log(response);
  let currentCity = document.querySelector("#chosenCity");
  currentCity.innerHTML = response.data[0].name;

  let apiKey = "acd3ca1419714529dc453d27a3161478";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${response.data[0].name}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "acd3ca1419714529dc453d27a3161478";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/geo/1.0/reverse";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&limit=5&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(changeCurrentCity);
}

function currentLocation(event) {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#currentLocationButton");
currentLocationButton.addEventListener("click", currentLocation);

currentLocation();
