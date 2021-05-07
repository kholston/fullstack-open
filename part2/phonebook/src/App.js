import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  
  const addName = (event) => {
    event.preventDefault();
    const personObject = {name: newName}
    if(persons.some(person => person.name === personObject.name)){
      alert(`${newName} is already in the phonebook.`)
    } else {
      setPersons(persons.concat(personObject))
    }
    setNewName('')
  } 

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input onChange={handleNameChange} value={newName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <li key={person.name}>{person.name}</li>)}
      </ul>      
    </div>
  )
}

export default App