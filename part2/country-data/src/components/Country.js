import React from 'react'

const Country = ({country, detail})=>{
  if(detail){
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
      </div>
    )
  } else {
    return(<p>{country.name}</p>)
  }
}

export default Country