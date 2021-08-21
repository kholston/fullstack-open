import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import UserList from './components/UserList'
import User from './components/User'
import Navigation from './components/Navigation'



const App = () => {
  const dispatch = useDispatch()


  useEffect(() => {
    const loggedBloglistUser = window.localStorage.getItem('loggedBloglistUser')
    if(loggedBloglistUser){
      const user = JSON.parse(loggedBloglistUser)
      dispatch(setUser(user))
    }
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  },[dispatch])



  return (
    <div>
      <Navigation/>
      <div className="container">
        <Notification />

        <Switch>
          <Route path={'/users/:id'}><User/></Route>
          <Route path={'/users'}><UserList/></Route>
          <Route path={'/login'}><LoginForm/></Route>
          <Route path={'/blogs/:id'}><Blog/></Route>
          <Route path={'/blogs/new'}><BlogForm/></Route>
          <Route path={'/'}><BlogList/></Route>
        </Switch>
      </div>
    </div>
  )
}

export default App