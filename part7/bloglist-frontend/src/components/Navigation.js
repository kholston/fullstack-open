import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Nav,
  Navbar
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../reducers/loginReducer'
import { useHistory } from 'react-router-dom'

const Navigation = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const login = useSelector(state => state.login)

  const handleLogout = () => {
    dispatch(logout())
    history.push('/')
  }

  console.log(handleLogout)

  return(
    <Navbar bg="light" expand="lg" collapseOnSelect>
      <div className="container">
        <LinkContainer to="/">
          <Navbar.Brand>blog app</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/">
              <Nav.Link>blogs</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/users">
              <Nav.Link>users</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            {login && <Navbar.Text>Signed in as: {login.name}</Navbar.Text>}
            { login
              ? <LinkContainer to='#'><Nav.Link onClick={handleLogout}>logout</Nav.Link></LinkContainer>
              : <LinkContainer to="login"><Nav.Link>login</Nav.Link></LinkContainer>
            }
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  )
}

export default Navigation