const apiKey = "34db34fa92b36d620b597e7764f4d098";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=berlin`;

async function checkWeather() {
  const response = await fetch(apiUrl + `&appid=${apiKey}`);

  if (!response.ok) {
    console.error("HTTP error", response.status);
    return;
  }

  const data = await response.json();
  console.log(data);

  // Use the correct class selectors
  document.querySelector(".location").innerHTML = data.name; // This is correct
  document.querySelector(".temp").innerHTML = data.main.temp + " °C"; // Change here
  document.querySelector("windd").innerHTML = data.windd.speed;
  +" km/h"; // Change here
}

checkWeather();
