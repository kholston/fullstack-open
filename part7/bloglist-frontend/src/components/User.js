import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

const User = () => {
  const { id } = useParams()
  const user = useSelector(state => state.users && state.users.find(u =>  u.id === id))

  if(!user){
    return null
  }

  return(
    <div>
      { user &&
        <div>
          <h2>{user.name}</h2>
          <h3>added blogs</h3>
          <ul>
            {user.blogs.map(blog => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        </div>
      }
    </div>
  )
}

export default User