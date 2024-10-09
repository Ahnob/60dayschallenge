const apiKey = "34db34fa92b36d620b597e7764f4d098";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=london`;

async function checkWeather() {
  try {
    const response = await fetch(apiUrl + `&appid=${apiKey}`);

    if (!response.ok) {
      console.error("HTTP error", response.status);
      return; // Stop if there's an error
    }

    const data = await response.json();
    console.log(data); // Log the data for debugging

    // Update HTML elements with weather data
    document.querySelector(".location").innerHTML = data.name; // Set location
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C"; // Set temperature
    document.querySelector(
      ".wind-speed.windd"
    ).innerHTML = `${data.wind.speed} km/h`; // Set wind speed
    document.querySelector(
      ".humidity-value"
    ).innerHTML = `${data.main.humidity}%`; // Set humidity
  } catch (error) {
    console.error("Error fetching weather data:", error); // Catch any other errors
  }
}

// Ensure the DOM is fully loaded before running the function
document.addEventListener("DOMContentLoaded", () => {
  checkWeather();
});
