function formatDate(timestamp) {
let now = new Date(timestamp);

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


return `${currentWeekDay}, ${currentMonth} ${currentDate}, ${currentHour}:${currentMinutes}`;
}


function getForecast(coordinates) {
  let apiKey ="acd3ca1419714529dc453d27a3161478";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}


function showTemperature(response) {
  
  document.querySelector("#chosenCity").innerHTML = response.data.name;
  
  let currentFullDate = document.querySelector("#currentDate");
  currentFullDate.innerHTML = formatDate(response.data.dt*1000);

  celsiusTemperature = response.data.main.temp;

  document.querySelector("#currentTemp").innerHTML = Math.round(
     celsiusTemperature
  );
  let weatherIcon = document.querySelector("#weatherIcon");
  weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
  
  //стикер справа
  feelsLikeCelsiusTemperature = response.data.main.feels_like;
  document.querySelector("#feelsLike").innerHTML = `${Math.round(
    feelsLikeCelsiusTemperature)}°`;
    document.querySelector("#windSpeed").innerHTML = Math.round(response.data.wind.speed);
   document.querySelector("#description").innerHTML = response.data.weather[0].description;
  
   getForecast(response.data.coord);
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



function showPosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "acd3ca1419714529dc453d27a3161478";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function currentLocation(event) {
  
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#currentLocationButton");
currentLocationButton.addEventListener("click", currentLocation);





function convertToF(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9)/5+32;
  document.querySelector("#currentTemp").innerHTML = Math.round(
     fahrenheitTemperature
  );
  let feelsLikefahrenheitTemperature = (feelsLikeCelsiusTemperature * 9)/5+32;
  document.querySelector("#feelsLike").innerHTML = `${Math.round(feelsLikefahrenheitTemperature
  )}°F`;
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let forecastTempMinElement = document.querySelectorAll("#forecastTempMin");
    forecastTempMinElement[0].innerHTML = Math.round((forecastTempMinElement[0].innerHTML* 9)/5+32);
    forecastTempMinElement[1].innerHTML = Math.round((forecastTempMinElement[1].innerHTML* 9)/5+32);
    forecastTempMinElement[2].innerHTML = Math.round((forecastTempMinElement[2].innerHTML* 9)/5+32);
    forecastTempMinElement[3].innerHTML = Math.round((forecastTempMinElement[3].innerHTML* 9)/5+32);
    forecastTempMinElement[4].innerHTML = Math.round((forecastTempMinElement[4].innerHTML* 9)/5+32);

let forecastTempMaxElement = document.querySelectorAll("#forecastTempMax");
    forecastTempMaxElement[0].innerHTML = Math.round((forecastTempMaxElement[0].innerHTML* 9)/5+32);
    forecastTempMaxElement[1].innerHTML = Math.round((forecastTempMaxElement[1].innerHTML* 9)/5+32);
    forecastTempMaxElement[2].innerHTML = Math.round((forecastTempMaxElement[2].innerHTML* 9)/5+32);
    forecastTempMaxElement[3].innerHTML = Math.round((forecastTempMaxElement[3].innerHTML* 9)/5+32);
    forecastTempMaxElement[4].innerHTML = Math.round((forecastTempMaxElement[4].innerHTML* 9)/5+32);

  
  }

  


function convertToC(event) {
  event.preventDefault();
  document.querySelector("#currentTemp").innerHTML = Math.round(
     celsiusTemperature
  );
  document.querySelector("#feelsLike").innerHTML = `${Math.round(
     feelsLikeCelsiusTemperature
  )}°C`;
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let forecastTempMinElement = document.querySelectorAll("#forecastTempMin");
    forecastTempMinElement[0].innerHTML = Math.round((forecastTempMinElement[0].innerHTML-32)*5/9);
    forecastTempMinElement[1].innerHTML = Math.round((forecastTempMinElement[1].innerHTML-32)*5/9);
    forecastTempMinElement[2].innerHTML = Math.round((forecastTempMinElement[2].innerHTML-32)*5/9);
    forecastTempMinElement[3].innerHTML = Math.round((forecastTempMinElement[3].innerHTML-32)*5/9);
    forecastTempMinElement[4].innerHTML = Math.round((forecastTempMinElement[4].innerHTML-32)*5/9);

  let forecastTempMaxElement = document.querySelectorAll("#forecastTempMax");
    forecastTempMaxElement[0].innerHTML = Math.round((forecastTempMaxElement[0].innerHTML-32)*5/9);
    forecastTempMaxElement[1].innerHTML = Math.round((forecastTempMaxElement[1].innerHTML-32)*5/9);
    forecastTempMaxElement[2].innerHTML = Math.round((forecastTempMaxElement[2].innerHTML-32)*5/9);
    forecastTempMaxElement[3].innerHTML = Math.round((forecastTempMaxElement[3].innerHTML-32)*5/9);
    forecastTempMaxElement[4].innerHTML = Math.round((forecastTempMaxElement[4].innerHTML-32)*5/9);

    

}

let celsiusTemperature = null;
let feelsLikeCelsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToF);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToC);

function formatDay (timestamp) {
  let now = new Date(timestamp*1000);
  let day = now.getDay();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  return days[day];
}


function displayForecast(response) {
console.log(response.data.daily);
let forecast = response.data.daily;
let forecastElement = document.querySelector("#days");
let forecastHTML = `<div class="row">`;

forecast.forEach(function (forecastDay, index) {
  if (index<5) {
  forecastHTML = forecastHTML + `<div class="col-2">
        <div class ="fiveDays"> 
            <strong><em>${formatDay(forecastDay.dt)}</em></strong>
            <br/><img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" width="50"/>
            <br/><span id = "forecastTempMin">${Math.round(forecastDay.temp.min)}</span>°
            
            /<strong><span id="forecastTempMax">${Math.round(forecastDay.temp.max)}</span></strong>°
            </div>
        </div>`
} 
});

forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}


searchCity("Saint Petersburg");