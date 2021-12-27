import React, { useState, useEffect } from 'react'
import { useLazyQuery, useSubscription } from '@apollo/client'
import { ALL_AUTHORS, BOOK_ADDED } from '../queries'
import BirthYearForm from './BirthYearForm'

const Authors = ({notify, show, token}) => {
  const [authors, setAuthors] = useState([])
  const [getAuthors ,authorQuery] = useLazyQuery(ALL_AUTHORS) 

  useEffect(()=>{
    getAuthors()
  }, []) // eslint-disable-line

  useEffect(() => {
    if(authorQuery.data){
      setAuthors(authorQuery.data.allAuthors)
    }
  }, [authorQuery.data])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: () => {
      getAuthors()
    }
  })
  
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
