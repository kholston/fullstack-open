import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import BirthYearForm from './BirthYearForm'

const Authors = ({notify, show, token}) => {
  const [authors, setAuthors] = useState([])
  const result = useQuery(ALL_AUTHORS) 

  useEffect(() => {
    if(result.data){
      setAuthors(result.data.allAuthors)
    }
  }, [result.data])
  
  if (!show) {
    return null
  }
  
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {token ? <BirthYearForm notify={notify} authors={authors}/> : null}
    </div>
  )
}

export default Authors
