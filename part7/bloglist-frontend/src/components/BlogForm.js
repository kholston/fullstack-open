import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { useField } from '../hooks'

const BlogForm = ({ toggleForm }) => {
  const dispatch = useDispatch()

  const titleField = useField('text')
  const authorField = useField('text')
  const urlField = useField('text')

  const clearForm = () => {
    titleField.reset()
    authorField.reset()
    urlField.reset()
  }

  const addBlog = (event) => {
    event.preventDefault()
    toggleForm()
    const newBlog = {
      title: titleField.value,
      author: authorField.value,
      url: urlField.value
    }
    dispatch(createBlog(newBlog))
    clearForm()
  }



  return(
    <div className="w-50">
      <h2>create new blog</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title</Form.Label>
          <Form.Control type={titleField.type} value={titleField.value} onChange={titleField.onChange}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>author</Form.Label>
          <Form.Control type={authorField.type} value={authorField.value} onChange={authorField.onChange}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>url</Form.Label>
          <Form.Control type={urlField.type} value={urlField.value} onChange={urlField.onChange}/>
        </Form.Group>
        <Button type="submit">create</Button>
      </Form>
    </div>
  )
}

BlogForm.propType = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm