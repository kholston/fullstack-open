import React from 'react'

const PersonForm = ({addPerson, handleNameChange, handleNumberChange,name, number}) =>{
  return(
    <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNameChange} value={name}/>
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={number} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

export default PersonForm