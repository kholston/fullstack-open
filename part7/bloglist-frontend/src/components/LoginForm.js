import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { useField } from '../hooks'

const LoginForm = ({ toggleForm  }) => {
  const dispatch = useDispatch()
  const username = useField('text')
  const password = useField('password')


  const handleSubmit = (event) => {
    event.preventDefault()
    toggleForm()
    const credentials = {
      username: username.value,
      password: password.value
    }
    dispatch(login(credentials))
    username.reset()
    password.reset()
  }

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleSubmit} id='login-form'>
        <div>
          username
          <input type={username.type} value={username.value} onChange={username.onChange}/>
        </div>
        <div>
          password
          <input type={password.type} value={password.value} onChange={password.onChange}/>
        </div>
        <button id='submitLogin' type='submit'>login</button>
      </form>
    </div>
  )
}



export default LoginForm