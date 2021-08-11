import React, { useEffect, useRef } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser, logout } from './reducers/userReducer'
import { useSelector } from 'react-redux'
import UserList from './components/UserList'

const Home = ({ user }) => {
  const blogFormRef = useRef()

  const toggleBlogForm = () => {blogFormRef.current.toggleVisibility()}


  return(
    <div>
      {user === null ?
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

  const user = useSelector(state => state.user)
  const loginFormRef = useRef()
  const toggleLoginForm = () => {loginFormRef.current.toggleVisibility()}



  useEffect(() => {
    const loggedBloglistUser = window.localStorage.getItem('loggedBloglistUser')
    if(loggedBloglistUser){
      const user = JSON.parse(loggedBloglistUser)
      dispatch(setUser(user))
    }
    dispatch(initializeBlogs())
  },[dispatch])



  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />


      {user === null ?
        <Togglable buttonLabel='log in' ref={loginFormRef}>
          <LoginForm toggleForm={toggleLoginForm}/>
        </Togglable>
        :
        <div>
          <div>
            {user.name} logged in
          </div>
          <div>
            <button onClick={handleLogout}>logout</button>
          </div>
        </div>

      }


      <Switch>
        <Route path={'/users'}><UserList/></Route>
        {/* <Route path={'/users/:id'}><User/></Route> */}
        <Route path={'/login'}><LoginForm/></Route>
        <Route path={'/blogs/new'}><BlogForm/></Route>
        <Route path={'/'}><Home user={user}/></Route>
      </Switch>
    </div>
  )
}

export default App