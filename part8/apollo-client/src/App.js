import React, { useState } from 'react'
import {useApolloClient, useQuery } from '@apollo/client'
import { ALL_PERSONS } from './queries'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import PhoneForm from './components/PhoneForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const result = useQuery(ALL_PERSONS)
  const client = useApolloClient()

  if(result.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout( ()=> {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if(!token){
    return(
      <div>
        <Notify errorMessage={errorMessage}/>
        <h2>Login</h2>
        <LoginForm  
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }

  return (
    <div>
      <button onClick={logout}>logout</button>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify}/>
      <PhoneForm notify={notify}/>
    </div>
  )
}

const Notify = ({errorMessage}) => {
  if(!errorMessage) {
    return null
  }

  return (
    <div style={ { color:'red' } }>
      {errorMessage}
    </div>
  )
}

export default App;
