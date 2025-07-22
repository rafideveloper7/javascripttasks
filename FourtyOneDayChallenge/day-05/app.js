const apiKey = '0c6a07cd24b359f895b4019f1cb5114a'; // Replace with your OpenWeatherMap API Key

// Get the search button
const searchButton = document.getElementById("searchBtn");

// Function to fetch weather data
async function getWeather() {
  const cityInput = document.getElementById("cityInput");
  if (!cityInput) {
    alert("Input element with id 'cityInput' not found in the HTML.");
    return;
  }
  const city = cityInput.value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    const weatherInfo = document.getElementById("weatherInfo");
    const cityName = document.getElementById("cityName");
    const temp = document.getElementById("temp");
    const description = document.getElementById("description");
    const humidity = document.getElementById("humidity");
    const wind = document.getElementById("wind");

    if (!weatherInfo || !cityName || !temp || !description || !humidity || !wind) {
      alert("One or more required HTML elements are missing.");
      return;
    }

    weatherInfo.classList.remove("hidden");
    cityName.innerText = `${data.name}, ${data.sys.country}`;
    temp.innerText = `🌡 Temperature: ${data.main.temp}°C`;
    description.innerText = `📝 Condition: ${data.weather[0].description}`;
    humidity.innerText = `💧 Humidity: ${data.main.humidity}%`;
    wind.innerText = `🌬 Wind Speed: ${data.wind.speed} m/s`;

  } catch (error) {
    alert(error.message);
  }
}

// Add event listener to the search button
if (searchButton) {
  searchButton.addEventListener("click", getWeather);
} else {
  alert("Button element with id 'searchBtn' not found in the HTML.");
}
