import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import BirthYearForm from './BirthYearForm'
import Notification from './Notification'

const Authors = (props) => {
  const [messages, setMessages] = useState(null)
  let authors
  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  }) 

  if (!props.show) {
    return null
  }
  
  authors = (result.loading ?  [] : result.data.allAuthors)
  
  const notify = (messages) => {
    setMessages(messages)
    setTimeout(()=>{
      setMessages(null)
    }, 10000)
  }

  return (
    <div>
      <Notification messages={messages}/>
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
      <BirthYearForm notify={notify}/>
    </div>
  )
}

export default Authors
