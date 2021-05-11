import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Search from './components/Search'
import Result from './components/Result'
import DetailView from './components/DetailView'



function App() {
  const [newSearch, setNewSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(()=>{
    axios
      .get(`https://restcountries.eu/rest/v2/all`)
      .then(response => {
        setCountries(response.data)
      })
  },[])

  const handleSearchChange = (event) =>{
    setNewSearch(event.target.value)
  }

  const handleShowClick = (country) => {
    setNewSearch(country.name)
  }


  const clearSearch = () => {
    setNewSearch('')
  }
  const countriesToShow = countries.filter(country =>( 
    country.name.toLowerCase().includes(newSearch.toLowerCase())
  ))

  return (
    <div>
      <Search clearSearch={clearSearch} handleChange={handleSearchChange} inputVal={newSearch}/>
      {newSearch === '' ? null :
        countriesToShow.length > 10 ? <p>Too many matches, specify another filter</p>:
        countriesToShow.length === 1 ? countriesToShow.map(country => <DetailView key={country.numericCode} country={country} />): 
        countriesToShow.map(country => <Result key={country.numericCode} country={country} handleShowClick={() => handleShowClick(country)}/>)
      }
    </div>
  );
}

export default App;
