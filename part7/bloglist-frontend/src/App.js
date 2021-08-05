import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import { createNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const [user, setUser] = useState(null)


  const blogFormRef = useRef()
  const loginFormRef = useRef()


  useEffect(() => {
    const loggedBloglistUser = window.localStorage.getItem('loggedBloglistUser')
    if(loggedBloglistUser){
      const user = JSON.parse(loggedBloglistUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  useEffect(() => {
    dispatch(initializeBlogs())
  },[dispatch])


  const handleLogin = async (loginObject) => {
    loginFormRef.current.toggleVisibility()

    try {
      const user = await loginService.login(loginObject)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      dispatch(createNotification(`welcome ${user.username}`, 'success'))
    } catch (error) {
      const errorMessage = 'wrong username or password'
      dispatch(createNotification(errorMessage, 'error'))
    }
  }



  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    blogService.setToken(null)
    dispatch(createNotification('successfully logged out', 'success'))
  }



  return (
    <div>
      <h2>blogs</h2>
      <Notification />

      {user === null ?
        <Togglable buttonLabel='log in' ref={loginFormRef}>
          <LoginForm handleLogin={handleLogin}/>
        </Togglable>
        :
        <div>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm />
          </Togglable>
        </div>
      }

      <div id='bloglist'>
        {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            showRemoveButton={!user ?  false: user.name === blog.user.name ?  true: false}
          />
        )}
      </div>
    </div>
  )
}

export default App