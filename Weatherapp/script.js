const apiKey = "34db34fa92b36d620b597e7764f4d098";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search-btn");

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (!response.ok) {
      console.error("HTTP error", response.status);
      return;
    }

    const data = await response.json();
    console.log(data);

    document.querySelector(".location").innerHTML = data.name; // Set location
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(
      ".wind-speed.windd"
    ).innerHTML = `${data.wind.speed} km/h`;
    document.querySelector(
      ".humidity-value"
    ).innerHTML = `${data.main.humidity}%`;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
// Ensure the DOM is fully loaded before running the function
document.addEventListener("DOMContentLoaded", () => {
  checkWeather();
});
