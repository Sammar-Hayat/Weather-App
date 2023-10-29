const apikey = "8246328328cd4dd51322791d82ac7106";

const weatherDataEl = document.getElementById("weather-data");

const cityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form")

formEl.addEventListener("submit",(event) => {
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
        );

        if(!response.ok) {
            throw new Error("network response was not ok")
        }

        const data = await response.json();
        
        const temperature = Math.round(data.main.temp);

        const description = data.weather[0].description;

        const icon = data.weather[0].icon;

        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed} m/s`,
            `Min temprature: ${data.main.temp_min}°C`,
            `Max temprature: ${data.main.temp_max}°C`,
        ]

        weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;

        weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`;

        weatherDataEl.querySelector(".description").textContent = `${description}`;
        
        weatherDataEl.querySelector(".details").innerHTML = details.map((detail) => `<div>${detail}</div>`
        ).join("");

        
    } catch (error) {
        weatherDataEl.querySelector(".icon").innerHTML = ``;

        weatherDataEl.querySelector(".temperature").textContent = ``;

        weatherDataEl.querySelector(".description").textContent = "An error happened, please try again later (or) check your spelling";
        
        weatherDataEl.querySelector(".details").innerHTML = "";
    }
}

