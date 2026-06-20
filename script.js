const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

const loading = document.getElementById("loading");
const error = document.getElementById("error");
const weatherIcon = document.getElementById("weatherIcon");

async function getWeather(city){

loading.textContent="Loading...";
error.textContent="";

try{

const geoURL=
`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;

const geoResponse=await fetch(geoURL);

const geoData=await geoResponse.json();

if(!geoData.results){
throw new Error("City not found");
}

const latitude=geoData.results[0].latitude;
const longitude=geoData.results[0].longitude;

const weatherURL=
`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;

const weatherResponse=await fetch(weatherURL);

const weatherData=await weatherResponse.json();

cityName.textContent=geoData.results[0].name;

temperature.textContent=
Math.round(weatherData.current.temperature_2m);

humidity.textContent=
weatherData.current.relative_humidity_2m;

wind.textContent=
Math.round(weatherData.current.wind_speed_10m);

const code=
weatherData.current.weather_code;

condition.textContent=
getCondition(code);

weatherIcon.textContent=
getIcon(code);

loading.textContent="";

}

catch(err){

loading.textContent="";
error.textContent=err.message;

}

}

function getCondition(code){

if(code===0)return"Clear";

if(code<=3)return"Cloudy";

if(code<=48)return"Fog";

if(code<=67)return"Rain";

if(code<=77)return"Snow";

if(code<=99)return"Thunderstorm";

return"Unknown";

}

function getIcon(code){

if(code===0)return"☀️";

if(code<=3)return"☁️";

if(code<=48)return"🌫️";

if(code<=67)return"🌧️";

if(code<=77)return"❄️";

if(code<=99)return"⛈️";

return"🌤️";

}

searchBtn.addEventListener("click",()=>{

const city=cityInput.value.trim();

if(city===""){

error.textContent="Please enter a city.";
return;

}

getWeather(city);

});

cityInput.addEventListener("keypress",(event)=>{

if(event.key==="Enter"){

searchBtn.click();

}

});