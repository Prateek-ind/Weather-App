const input = document.querySelector("input");
const searchBtn = document.querySelector("button");
const fetchedData = document.querySelector('.weather-data-fetched')
const card = document.querySelector('.card')
const weatherIcons = {
  0: "clear.png",           // Clear sky
  1: "clear.png",           // Mainly clear
  2: "clouds.png",          // Partly cloudy
  3: "clouds.png",          // Overcast
  45: "mist.png",           // Fog
  48: "haze.png",           // Depositing rime fog
  51: "drizzle.png",        // Light drizzle
  53: "drizzle.png",        // Moderate drizzle
  55: "drizzle.png",        // Dense drizzle
  61: "rain.png",           // Slight rain
  63: "rain.png",           // Moderate rain
  65: "rain.png",           // Heavy rain
  66: "rain.png",           // Freezing rain, light
  67: "rain.png",           // Freezing rain, heavy
  71: "snow.png",           // Slight snow fall
  73: "snow.png",           // Moderate snow fall
  75: "snow.png",           // Heavy snow fall
  77: "snow.png",           // Snow grains
  80: "rain.png",           // Rain showers: slight
  81: "rain.png",           // Rain showers: moderate
  82: "rain.png",           // Rain showers: violent
  85: "snow.png",           // Snow showers: slight
  86: "snow.png",           // Snow showers: heavy
  95: "rain.png",           // Thunderstorm: slight or moderate
  96: "rain.png",           // Thunderstorm with slight hail
  99: "rain.png",           // Thunderstorm with heavy hail
};


searchBtn.addEventListener("click", () => {
  const cityName = input.value;
  coordinates(cityName);
});

function coordinates(cityName) {
  fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`)
    .then((res) => res.json())
    .then((data) => {
      const cityObj = data.results[0];
      const cityName = cityObj.admin1
      const latitude = cityObj.latitude.toFixed(2);
      const longitude = cityObj.longitude.toFixed(2);
      console.log(data);
      weatherData(latitude, longitude, cityName)
    });
}

function weatherData(latitude, longitude, cityName) {
  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation,wind_speed_10m,weathercode`
  ).then((res)=>res.json())
  .then((data)=>{
    console.log(data);
    const iconFile = weatherIcons[data.current.weathercode] || "clear.png";
    //  currentTemp.innerHtml = data.current.temperature_2m
    //  windSpeed.innerHTML = data.current.wind_speed_10m
    // humidity.innerHTML = data.current.precipitation
    fetchedData.innerHTML =`
     <img class="weather-icon" src="./images/${iconFile}" alt="weather-icon">
          <p class="temperature">${data.current.temperature_2m}${data.current_units.temperature_2m}</p>
          <p class="city">${cityName}</p>
          <div class="humidity-wind">
            <div class="col"><img  src="./images/humidity.png" alt="humidity"><div><p class="humidity-value">${data.current.precipitation}mm </p><p>Humidity<p></div></div>
            <div class="col"><img class="wind-speed" src="./images/wind.png" alt="wind-speed"><div><p class="wind-speed">${data.current.wind_speed_10m} Km/hr</p> <p>Wind speed</p></div></div>
          </div>
    `
    card.append(fetchedData)
  })

}
