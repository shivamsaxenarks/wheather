const apiKey = "dd39634d83837c12e08c5ceb0c15e959";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";

const searchbox = document.getElementById("fname");
const searchbtn = document.querySelector(".card button");

async function checkWeather(city) {
    try {
        const url = apiUrl.replace("{city name}", city).replace("{API key}", apiKey);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        console.log(data);

        const cityElement = document.querySelector(".city");
        const tempElement = document.querySelector(".temp");
        const humidityElement = document.querySelector(".humidity");
        const windSpeedElement = document.querySelector(".wind-speed");

        cityElement.innerText = data.name || "N/A";
        tempElement.innerText = data.main.temp ? (data.main.temp - 273.15).toFixed(2) + "°C" : "N/A";
        humidityElement.innerText = data.main.humidity ? data.main.humidity + "%" : "N/A";
        windSpeedElement.innerText = data.wind ? data.wind.speed + ' km/h' : "N/A";
    } catch (error) {
        console.error("Error fetching weather data:", error);
        // Display error message to the user in the UI
        alert("Error fetching weather data. Please try again later.");
    }
}

searchbtn.addEventListener("click", () => {
    const city = searchbox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        console.error("Please enter a city name");
        // Display error message to the user in the UI
        alert("Please enter a city name.");
    }
});
