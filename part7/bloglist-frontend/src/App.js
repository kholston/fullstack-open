import React, { useEffect, useRef } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser, logout } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import UserList from './components/UserList'
import User from './components/User'

const Home = ({ login }) => {
  const blogFormRef = useRef()

  const toggleBlogForm = () => {blogFormRef.current.toggleVisibility()}

  return(
    <div>
      {login === null ?
        null
        :
        <div>
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm toggleForm={toggleBlogForm}/>
          </Togglable>
        </div>
      }
      <BlogList/>
    </div>
  )


}


const App = () => {
  const dispatch = useDispatch()

  const login = useSelector(state => state.login)
  const loginFormRef = useRef()
  const toggleLoginForm = () => {loginFormRef.current.toggleVisibility()}


  useEffect(() => {
    const loggedBloglistUser = window.localStorage.getItem('loggedBloglistUser')
    if(loggedBloglistUser){
      const user = JSON.parse(loggedBloglistUser)
      dispatch(setUser(user))
    }
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  },[dispatch])

  const handleLogout = () => {
    dispatch(logout())
  }



  return (
    <div>
      <h2>blogs</h2>
      <Notification />

      {login === null ?
        <Togglable buttonLabel='log in' ref={loginFormRef}>
          <LoginForm toggleForm={toggleLoginForm}/>
        </Togglable>
        :
        <div>
          <div>
            {login.name} logged in
          </div>
          <div>
            <button onClick={handleLogout}>logout</button>
          </div>
        </div>

      }

      <Switch>
        <Route path={'/users/:id'}><User/></Route>
        <Route path={'/users'}><UserList/></Route>
        <Route path={'/login'}><LoginForm/></Route>
        <Route path={'/blogs/:id'}><Blog/></Route>
        <Route path={'/blogs/new'}><BlogForm/></Route>
        <Route path={'/'}><Home login={login}/></Route>
      </Switch>
    </div>
  )
}

export default App