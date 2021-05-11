import React from 'react'

const Weather = ({country,weatherData}) => {
  return(
    <div>
        <h2>Weather in {country.capital}</h2>
        <h4>temperature: {weatherData.current.temperature} celcius</h4>
        <img src={weatherData.current.weather_icons[0]} alt="weather icon"/>
        <h4>wind: {weatherData.current.wind_speed} mph direction {weatherData.current.wind_dir}</h4>  
      </div> 
  )
}

export default Weather