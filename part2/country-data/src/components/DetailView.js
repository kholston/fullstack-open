import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Weather from './Weather'

const DetailView = ({country}) => {
  const [weatherData, setWeatherData] = useState(null)

  useEffect(()=>{
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`)
      .then(response => {
        setWeatherData(response.data)
      })
  },[])

  return(
    <div>
    <h2>{country.name}</h2>
    <p>capital: {country.capital}</p>
    <p>population: {country.population}</p>

    <h3>Languages</h3>
    <ul>
      {country.languages.map(language => 
        <li key={language.iso639_1}>{language.name}</li>
      )}
    </ul>
    <img src={country.flag} alt={`${country.name}'s flag`} width='100' />
    {weatherData ?
      <Weather country={country} weatherData={weatherData}/>: null}
  </div>
  )
}

export default DetailView