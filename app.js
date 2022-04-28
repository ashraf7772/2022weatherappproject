// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");

const tempElement = document.querySelector(".temperature-value p");

const descElement = document.querySelector(".temperature-description p");

const locationElement = document.querySelector(".location p");

const notificationElement = document.querySelector(".notification");



// App data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

// APP Consts

const KELVIN = 273;


// New API KEY

const key = "f4fa449156fd44f2ba801aebe3385f27";

// CODE TO CHECK TO SEE IF BROWSER SUPPORTS GEOLOCATION

if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
    
}

// CODE TO SET THE USER'S POSITION

function setPosition(position){
    
    let latitude = position.coords.latitude;
    
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

//CODE TO SHOW THERE IS AN ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE

function showError(error){
    
    notificationElement.style.display = "block";
    
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// CODE TO GET THE WEATHER FROM API PROVIDER
function getWeather(latitude, longitude){
    
    let api = `http://api.openweathermap.org/data/2.5/weatherlat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
    
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        
            weather.description = data.weather[0].description;
        
            weather.iconId = data.weather[0].icon;
        
            weather.city = data.name;
        
            weather.country = data.sys.country;
        })
        .then(function(){
        
            displayWeather();
        });
}

// code to display the weather to the user

function displayWeather(){
    
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    
    descElement.innerHTML = weather.description;
    
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// Code for Celsius to be converted to Farenheight 

function celsiusToFahrenheit(temperature){
    
    return (temperature * 9/5) + 32;
}

// CODE FOR WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET

tempElement.addEventListener("click", function(){
    
    if(weather.temperature.value === undefined) return;
    
    
    
    
    if(weather.temperature.unit == "celsius"){
        
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        
        fahrenheit = Math.floor(fahrenheit);
        
        
        
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        
        weather.temperature.unit = "fahrenheit";
        
    }else{
        
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        
        weather.temperature.unit = "celsius"
    }
});