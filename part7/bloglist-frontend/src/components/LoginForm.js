import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { Button, Form } from 'react-bootstrap'
import { useField } from '../hooks'
import { useHistory } from 'react-router-dom'

const LoginForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const username = useField('text')
  const password = useField('password')


  const handleSubmit = (event) => {
    event.preventDefault()
    const credentials = {
      username: username.value,
      password: password.value
    }
    dispatch(login(credentials))
    username.reset()
    password.reset()
    history.push('/')
  }

  return (
    // <div>
    //   <h2>log in to application</h2>
    //   <form onSubmit={handleSubmit} id='login-form'>
    //     <div>
    //       username
    //       <input type={username.type} value={username.value} onChange={username.onChange}/>
    //     </div>
    //     <div>
    //       password
    //       <input type={password.type} value={password.value} onChange={password.onChange}/>
    //     </div>
    //     <button id='submitLogin' type='submit'>login</button>
    //   </form>
    // </div>
    <div>
      <h2 className='mt-3 offset-lg-4 col-lg-4'>login to application</h2>
      <Form onSubmit={handleSubmit} className='col-lg-4 offset-lg-4'>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control type={username.type}value={username.value} onChange={username.onChange}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>password</Form.Label>
          <Form.Control type={password.type}value={password.value} onChange={password.onChange}/>
        </Form.Group>
        <Button type='submit'>login</Button>
      </Form>
    </div>
  )
}



export default LoginForm