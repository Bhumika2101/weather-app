const apiKey = "1a915a8e2da8e445151bb6bc56e792a5";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const search = document.querySelector(".city-input");
const button = document.querySelector(".search-button");
const weatherIcon = document.querySelector(".weather-icon");
const card = document.querySelector(".card");
const textElements = document.querySelectorAll(".weather, .details, .city, .temp, .humidity, .wind, .humidity-details, .wind-details");


function updateBackground(weather) {
    let gradient,fontColor;
    switch (weather) {
        case "Clear":
            gradient = "linear-gradient(to right,rgb(250, 220, 128),rgb(255, 241, 164))";
            fontColor= "black"; // Sunny
            break;
        case "Clouds":
            gradient = "linear-gradient(to right, #d3d3d3, #a6a6a6)";
            fontColor= "black"
             // Cloudy
            break;
        case "Rain":
            gradient = "linear-gradient(to right, #005c97, #363795)";
            fontColor= "white" // Rainy
            break;
        case "Drizzle":
            gradient = "linear-gradient(to right, #b2fefa, #0ed2f7)";
            fontColor= "black" // Drizzle
            break;
        case "Mist":
            gradient = "linear-gradient(to right, #dfe9f3, #a1c4fd)"; 
            fontColor= "black"// Mist
            break;
        case "snow":
            gradient = "linear-gradient(to right, #ffffff, #b3cde0)"; // Snow (White & Light Blue)
            fontColor = "black";
            break;
                
        default:
            gradient = "linear-gradient(to right, #a1c4fd, #c2e9fb)";
            fontColor= "black" // Default
    }
    card.style.background = gradient;

    textElements.forEach((element) => {
        element.style.color = fontColor;
    });
}

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();
        console.log(data);
        
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        
        if (data.wind && data.wind.speed !== undefined) {
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        } else {
            console.warn("Wind data is missing!");
            document.querySelector(".wind").innerHTML = "N/A";
        }

        const weatherCondition = data.weather[0].main;
        updateBackground(weatherCondition); // Change gradient based on weather

        if (weatherCondition == "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (weatherCondition == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (weatherCondition == "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (weatherCondition == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (weatherCondition == "Mist") {
            weatherIcon.src = "images/mist.png";
        } else if (weatherCondition == "Snow") {
            weatherIcon.src = "images/snow.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

button.addEventListener("click", () => {
    checkWeather(search.value);
});

search.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(search.value);
    }
});
