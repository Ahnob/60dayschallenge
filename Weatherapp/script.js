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
    console.log(data); // Log the full response to verify

    // Update the city and country
    document.querySelector(
      ".location"
    ).innerHTML = `${data.name}, ${data.sys.country}`;

    // Update the temperature
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";

    // Update the wind speed
    document.querySelector(".windd").innerHTML = `${data.wind.speed} km/h`;

    // Update the humidity
    document.querySelector(
      ".humidity-value"
    ).innerHTML = `${data.main.humidity}%`;

    // Update the weather icon dynamically
    updateWeatherIcon(data.weather[0].icon);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Function to update the weather icon dynamically
function updateWeatherIcon(weatherIconCode) {
  const iconElement = document.querySelector(".weather-icon");

  // Mapping OpenWeather icon codes to Weather Icons classes
  const iconMapping = {
    "01d": "wi-day-sunny", // Clear sky (day)
    "01n": "wi-night-clear", // Clear sky (night)
    "02d": "wi-day-cloudy", // Few clouds (day)
    "02n": "wi-night-alt-cloudy", // Few clouds (night)
    "03d": "wi-cloud", // Scattered clouds
    "03n": "wi-cloud",
    "04d": "wi-cloudy", // Broken clouds
    "04n": "wi-cloudy",
    "09d": "wi-showers", // Shower rain (day)
    "09n": "wi-showers",
    "10d": "wi-day-rain", // Rain (day)
    "10n": "wi-night-alt-rain", // Rain (night)
    "11d": "wi-thunderstorm", // Thunderstorm (day)
    "11n": "wi-thunderstorm", // Thunderstorm (night)
    "13d": "wi-snow",
    "13n": "wi-snow",
    "50d": "wi-fog",
    "50n": "wi-fog",
  };

  const weatherClass = iconMapping[weatherIconCode] || "wi-na";
  iconElement.className = `weather-icon wi ${weatherClass}`;
}

// Event listener for search button click
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

// Load default weather for 'London' on page load
document.addEventListener("DOMContentLoaded", () => {
  checkWeather("London");
});
