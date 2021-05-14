import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Header from './components/Header'
import PersonForm from './components/PersonForm'
import Search from './components/Search'
import Person from './components/Person'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(0)

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
    const personCheck = persons.find(person => person.name === personObject.name)
    if(personCheck){
      window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)
      const changedPerson = {...personCheck, number: newNumber}
      updatePerson(changedPerson)
      setNewName('')
      setNewNumber('')
    } else {
      personService
        .create(personObject)
        .then(returnedPerson =>{
          setPersons(persons.concat(returnedPerson))
          const message = `${returnedPerson.name} created successfully!`
          createNotificationMessage(1,message)
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

  const updatePerson = (changedPerson) => {
    personService
      .update(changedPerson.id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
        const message = `${changedPerson.name} updated successfully!`
        createNotificationMessage(1,message)
      })
      .catch(error => {
        alert(`the person ${changedPerson.name} was already deleted from th server`)
        setPersons(persons.filter(p => p.id !== changedPerson.id))
      })
  }

  const createNotificationMessage = (type, message) => {
    setNotificationType(type)
    setNotificationMessage(message)
    debugger
    setTimeout(()=>{
      setNotificationType(0)
      setNotificationMessage(null)
    },5000)
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
      <Notification message={notificationMessage} type={notificationType}/>
      <Search handleFilterChange={handleFilterChange} value={filter}/>
      <Header text='Add New'/>
      <PersonForm addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} name={newName} number={newNumber}/>
      <Header text='Numbers'/>
      {personsToShow.map(person => <Person key={person.name} person={person} handleDelete={() => deletePerson(person)}/>)}   
    </div>
  )
}

export default App