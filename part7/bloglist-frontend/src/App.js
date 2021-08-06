import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser, logout } from './reducers/userReducer'
import { useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)


  const blogFormRef = useRef()
  const loginFormRef = useRef()


  useEffect(() => {
    const loggedBloglistUser = window.localStorage.getItem('loggedBloglistUser')
    if(loggedBloglistUser){
      const user = JSON.parse(loggedBloglistUser)
      dispatch(setUser(user))
    }
  },[])

  useEffect(() => {
    dispatch(initializeBlogs())
  },[dispatch])

  const toggleBlogForm = () => {blogFormRef.current.toggleVisibility()}
  const toggleLoginForm = () => {loginFormRef.current.toggleVisibility()}

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
          {user.name} logged in <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm toggleForm={toggleBlogForm}/>
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