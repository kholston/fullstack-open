import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Form, ListGroup } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { likeBlog, addComment } from '../reducers/blogReducer'

const Blog = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const blog = useSelector(state =>
    state.blogs &&
    state.blogs.find(blog => blog.id === id))

  // const deleteBlog = (blogToRemove) => {
  //   const message = `Remove blog ${blogToRemove.title} by ${blogToRemove.author}?`
  //   if(window.confirm(message)){
  //     dispatch(removeBlog(blogToRemove.id))
  //   }
  // }

  if(!blog){
    return null
  }

  const addLike = (blog) => {
    const changedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    dispatch(likeBlog(blog.id, changedBlog))
  }

  const submitComment = (event) => {
    event.preventDefault()
    dispatch(addComment(blog, comment))
    setComment('')
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }


  return(
    blog &&
    <div>
      {/* <h2>{blog.title} {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes
        <button onClick={() => addLike(blog)}>like</button>
      </div>
      added by {blog.user.name}
      <h3>comments</h3>
      <form onSubmit={submitComment}>
        <input type="text" value={comment} onChange={handleCommentChange}/>
        <button type='submit'>add comment</button>
      </form>
      <ul>
        {blog.comments.map(comment => (
          <li key={comment}>{comment}</li>
        ))}
      </ul> */}
      <Card className='col-sm-8 offset-sm-2 offset-4 mt-3'>
        <Card.Body>
          <Card.Title>{blog.title}</Card.Title>
          <Card.Subtitle className='mb-3 text-muted'>{blog.author}</Card.Subtitle>
          <Card.Link href={`${blog.url}`}>{blog.url}</Card.Link>
          <Card.Text>{blog.likes} likes</Card.Text>
          <Button onClick={() => addLike(blog) }>like</Button>
        </Card.Body>
      </Card>
      <h3 className='mt-3 offset-lg-4'>comments</h3>
      <Form onSubmit={submitComment} className='col-lg-4 offset-lg-4 mb-3'>
        <Form.Group>
          <Form.Label>comment</Form.Label>
          <Form.Control type='text' value={comment} onChange={handleCommentChange}/>
        </Form.Group>
        <Button type='submit'>add comment</Button>
      </Form>
      <ListGroup className='col-lg-6 offset-lg-3'>
        {blog.comments.map(comment => (
          <ListGroup.Item key={comment}>{comment}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}


export default Blog