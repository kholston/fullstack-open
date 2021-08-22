import React  from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'



const UserList = () => {
  const users = useSelector(state => state.users)

  return(
    <div>
      <h2 className="mb-3 mt-3">Users</h2>
      <Table striped className='w-75'>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map(user => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>

      </Table>
    </div>
  )
}


export default UserList