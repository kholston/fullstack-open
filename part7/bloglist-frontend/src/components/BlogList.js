import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  ListGroup
} from 'react-bootstrap'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const BlogList = () => {
  const login = useSelector(state => state.login)
  const blogFormRef = useRef()
  const blogs =  useSelector(state => state.blogs)

  const toggleBlogForm = () => {blogFormRef.current.toggleVisibility()}



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
      <ListGroup>
        { blogs &&
          blogs
            .sort((a,b) => b.likes - a.likes)
            .map(blog =>
              <ListGroup.Item key={blog.id}>
                <Link  to={`/blogs/${blog.id}`} >{blog.title}</Link>
              </ListGroup.Item>
            )
        }
      </ListGroup>

    </div>
  )
}

export default BlogList