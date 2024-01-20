let loc ={};
let cur = {};
let forecast = {};
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const cityname = document.getElementById('city-name');
const currentTemp =document.getElementById('cur-temp');
const wState = document.getElementById('weather-state');
const mainImg = document.getElementById('main-img');
const forecastDay = document.getElementById('forecast-day');
const windSt = document.getElementById('wind')
const rainSt = document.getElementById('ch-rain');
let uvidx = document.getElementById('uv-idx');
let searchInput = document.getElementById('searchInput');
let realTemp = document.getElementById('r-temp')
const d7Table = document.getElementById('d7-table');
async function getcon(region){
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=6be84555013d43e1a3e115628242001&q=${region}&days=7`);
    const finalres = await response.json();
    loc = finalres.location;
    cur = finalres.current;
    forecast = finalres.forecast;
    cityname.innerHTML = loc.name;
    currentTemp.innerHTML = cur.temp_c + "°";
    wState.innerHTML = cur.condition.text ;
    let con = "";
    for (let i = 0 ; i < 24; i++){
        if(i == 3 || i== 6 || i == 9 )
        {
            con+=`<div class="temp-day d-flex flex-column align-items-center">
        <span>${i}:00 AM</span>
        <img src="${forecast.forecastday[0].hour[i].condition.icon}" alt="" class="weather-ico">
        <p class="h-temp">${forecast.forecastday[0].hour[i].temp_c}°</p>
    </div>`;
        }
        if( i == 12 || i== 15 || i == 18)
        {
            con+=`<div class="temp-day d-flex flex-column align-items-center">
        <span>${i}:00 PM</span>
        <img src="${forecast.forecastday[0].hour[i].condition.icon}" alt="" class="weather-ico">
        <p class="h-temp">${forecast.forecastday[0].hour[i].temp_c}°</p>
    </div>`;
        }
    }
    forecastDay.innerHTML = con;
    windSt.innerHTML = cur.wind_kph + " km/h";
    rainSt.innerHTML = forecast.forecastday[0].day.daily_chance_of_rain;
    uvidx.innerHTML = cur.uv;
    realTemp.innerHTML =cur.temp_c + "°";
    let tableContent = "";
    for (let i = 0; i < forecast.forecastday.length; i++) {
    tableContent+=`<div class="d7-day text-center pe-3 d-flex align-items-center justify-content-between">
    <span>${weekday[new Date(forecast.forecastday[i].date).getDay()]}</span>
    <div>
        <img src="${forecast.forecastday[i].day.condition.icon}" alt="" class="weather-ico">
        <span> ${forecast.forecastday[i].day.condition.text} </span>
    </div>
    <span class="h-temp">${forecast.forecastday[i].day.avgtemp_c}°</span>
    </div>`;
    }
    d7Table.innerHTML = tableContent; 
    
}
getcon('cairo');
searchInput.addEventListener('input' , function(){
    getcon(searchInput.value);
})
