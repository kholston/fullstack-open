import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/loginReducer'

const Navigation = () => {
  const dispatch = useDispatch()
  const login = useSelector(state => state.login)

  const handleLogout = () => {
    dispatch(logout())
  }

  const navStyle = {
    paddingRight: 5
  }

  return(
    <div>
      <Link to='/' style={navStyle}>blogs</Link>
      <Link to='/users' style={navStyle}>users</Link>
      { login && login.name}
      { login
        ? <button onClick={handleLogout}>logout</button>
        : <Link to='/login' style={navStyle}>login</Link>
      }
    </div>
  )
}

export default Navigation