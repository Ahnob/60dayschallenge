const apiKey = "34db34fa92b36d620b597e7764f4d098";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search-btn");
const loading = document.querySelector(".loading");
const errorMessage = document.querySelector(".error-message");
const timeDisplay = document.querySelector(".time");

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

// Function to get the current date and time
function getCurrentDayAndTime() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return now.toLocaleDateString(undefined, options);
}

// Function to display the weather and time
async function checkWeather(city) {
  try {
    loading.style.display = "block";
    errorMessage.style.display = "none";

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    console.log("Weather data:", data);

    loading.style.display = "none";

    document.querySelector(
      ".location"
    ).innerHTML = `${data.name}, ${data.sys.country}`;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".description").innerHTML =
      data.weather[0].description;
    document.querySelector(".windd").innerHTML = `${data.wind.speed} km/h`;
    document.querySelector(
      ".humidity-value"
    ).innerHTML = `${data.main.humidity}%`;

    updateWeatherIcon(data.weather[0].icon);
    timeDisplay.innerHTML = getCurrentDayAndTime();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    errorMessage.style.display = "block";
    errorMessage.innerHTML = error.message;
  } finally {
    loading.style.display = "none";
  }
}

// Update weather icon
function updateWeatherIcon(weatherIconCode) {
  const iconElement = document.querySelector(".weather-icon");

  const iconMapping = {
    "01d": "wi-day-sunny",
    "01n": "wi-night-clear",
    "02d": "wi-day-cloudy",
    "02n": "wi-night-alt-cloudy",
    "03d": "wi-cloud",
    "03n": "wi-cloud",
    "04d": "wi-cloudy",
    "04n": "wi-cloudy",
    "09d": "wi-showers",
    "09n": "wi-showers",
    "10d": "wi-day-rain",
    "10n": "wi-night-alt-rain",
    "11d": "wi-thunderstorm",
    "11n": "wi-thunderstorm",
    "13d": "wi-snow",
    "13n": "wi-snow",
    "50d": "wi-fog",
    "50n": "wi-fog",
  };

  const weatherClass = iconMapping[weatherIconCode] || "wi-na";
  iconElement.className = `weather-icon wi ${weatherClass}`;
}

// Get user's current location weather
function getUserLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        console.log("User Latitude:", lat);
        console.log("User Longitude:", lon);

        const apiGeoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

        try {
          loading.style.display = "block";
          errorMessage.style.display = "none";

          const response = await fetch(apiGeoUrl);
          if (!response.ok) {
            throw new Error("Could not fetch weather data for your location");
          }

          const data = await response.json();
          console.log("Location weather data:", data);

          loading.style.display = "none";

          // Check if location name is available
          const locationName = data.name
            ? `${data.name}, ${data.sys.country}`
            : "Location not available";

          // Display weather data
          document.querySelector(".location").innerHTML = locationName;
          document.querySelector(".temp").innerHTML =
            Math.round(data.main.temp) + "°C";
          document.querySelector(".description").innerHTML =
            data.weather[0].description;
          document.querySelector(
            ".windd"
          ).innerHTML = `${data.wind.speed} km/h`;
          document.querySelector(
            ".humidity-value"
          ).innerHTML = `${data.main.humidity}%`;

          updateWeatherIcon(data.weather[0].icon);

          // Update the current date and time
          timeDisplay.innerHTML = getCurrentDayAndTime();
        } catch (error) {
          console.error(
            "Error fetching weather data for your location:",
            error
          );
          errorMessage.style.display = "block";
          errorMessage.innerHTML = error.message;
        } finally {
          loading.style.display = "none";
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        errorMessage.innerHTML = "Unable to fetch your location.";
        errorMessage.style.display = "block";
      }
    );
  } else {
    errorMessage.innerHTML = "Geolocation is not supported by this browser.";
    errorMessage.style.display = "block";
  }
}

// Event listener for search button click
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

// Allow user to press Enter to search
searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkWeather(searchBox.value);
  }
});

// Load weather for user's location on page load
document.addEventListener("DOMContentLoaded", () => {
  getUserLocationWeather();
});
