import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './components/Header'
import PersonForm from './components/PersonForm'
import Search from './components/Search'
import Person from './components/Person'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(()=>{
    axios
      .get('http://localhost:3001/persons')
      .then(response =>{
        setPersons(response.data)
      })
  },[])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) =>{
    setFilter(event.target.value)
  }

  const personsToShow =  filter === '' ? persons : 
    persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()) )
    
  
  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {name: newName, number: newNumber}
    if(persons.some(person => person.name === personObject.name)){
      alert(`${newName} is already in the phonebook.`)
    } else {
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
  } 

  return (
    <div>
      <Header text='Phonebook' />
      <Search handleFilterChange={handleFilterChange} value={filter}/>
      <Header text='Add New'/>
      <PersonForm addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} name={newName} number={newNumber}/>
      <Header text='Numbers'/>
      {personsToShow.map(person => <Person key={person.name} person={person}/>)}   
    </div>
  )
}

export default App