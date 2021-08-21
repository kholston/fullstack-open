import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const BlogList = () => {
  const login = useSelector(state => state.login)
  const blogFormRef = useRef()
  const blogs =  useSelector(state => state.blogs)

  const toggleBlogForm = () => {blogFormRef.current.toggleVisibility()}


  const linkStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div>
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
      </div>
      { blogs &&
        blogs
          .sort((a,b) => b.likes - a.likes)
          .map(blog =>
            <div key={blog.id} style={linkStyle}>
              <Link  to={`/blogs/${blog.id}`} >{blog.title}</Link>
            </div>
          )
      }
    </div>
  )
}

export default BlogList