import React, { useState, useEffect } from 'react'
import personService from './services/persons'
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
    personService
      .getAll()
      .then(initalPersons =>{
        setPersons(initalPersons)
      })
  },[])

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {name: newName, number: newNumber}
    if(persons.some(person => person.name === personObject.name)){
      alert(`${newName} is already in the phonebook.`)
    } else {
      personService
        .create(personObject)
        .then(returnedPerson =>{
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  } 

  const deletePerson = (personObject) => {
    window.confirm(`Delete ${personObject.name} ?`)
    personService
      .deletePerson(personObject.id)
      .then(
        setPersons(persons.filter(p => p.id !== personObject.id))
      )
  }

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
    

  return (
    <div>
      <Header text='Phonebook' />
      <Search handleFilterChange={handleFilterChange} value={filter}/>
      <Header text='Add New'/>
      <PersonForm addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} name={newName} number={newNumber}/>
      <Header text='Numbers'/>
      {personsToShow.map(person => <Person key={person.name} person={person} handleDelete={() => deletePerson(person)}/>)}   
    </div>
  )
}

export default App