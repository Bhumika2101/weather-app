// const button=document.getElementById("search-button");
// const inp=document.getElementById("city-input");
// const cityName=document.getElementById("city-name");
// const cityTemp=document.getElementById("temperature");
// const cityTime=document.getElementById("city-time");
// async function getData(cityName){
//     const promise= await fetch(
//         `http://api.weatherapi.com/v1/current.json?key=4bcd279abcd241b2945190105252202&q=${cityName}&aqi=yes`
//    );
//    return await promise.json();
// }
// button.addEventListener("click",async ()=>{
//     const value=inp.value;
//     const result =await getData(value);
//     console.log(result);
//     cityName.innerText= `${result.location.name}, ${result.location.region}- ${result.location.country}`
//     cityTime.innerText= result.location.localtime;
//     cityTemp.innerText=result.current.temp_c;

// });

const apiKey="1a915a8e2da8e445151bb6bc56e792a5";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const search=document.querySelector(".city-input");
const button=document.querySelector(".search-button");
const weatherIcon=document.querySelector(".weather-icon");

async function checkWeather(city){
    const response=await fetch(apiUrl+city+`&appid=${apiKey}`);
    if(response.status==404){
        document.querySelector(".error").style.display="block";
        document.querySelector(".weather").style.display="none";
    }
    else{
        var data=await response.json();
    console.log(data);
    
    document.querySelector(".city").innerHTML=data.name;
    document.querySelector(".temp").innerHTML=Math.round(data.main.temp)+"°C";
    document.querySelector(".humidity").innerHTML=data.main.humidity+"%";
    if (data.wind && data.wind.speed !== undefined) {
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    } else {
        console.warn("Wind data is missing!");
        document.querySelector(".wind").innerHTML = "N/A";
    }

    if(data.weather[0].main=="Clear"){
        weatherIcon.src="images/clear.png";

    }
    else if(data.weather[0].main=="Clouds"){
        weatherIcon.src="images/clouds.png";
    }
    else if(data.weather[0].main=="Rain"){
        weatherIcon.src="images/rain.png";
    }
    else if(data.weather[0].main=="Drizzle"){
        weatherIcon.src="images/drizzle.png";
    }
    else if(data.weather[0].main=="Mist"){
        weatherIcon.src="images/mist.png";
    }

    document.querySelector(".weather").style.display="block";
    document.querySelector(".error").style.display="none";

    }   
}


button.addEventListener("click",()=>{
    checkWeather(search.value);

});

