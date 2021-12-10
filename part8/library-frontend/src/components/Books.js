import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [books, setBooks] = useState([])
  const [filter, setFilter] = useState('all genres')
  const [genres, setGenres] = useState([])
  
  const result = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })

  const buttonSpacing = {
    margin: "5px"
  }


  useEffect(() => {
    if(result.data){
      setBooks(result.data.allBooks)
    }
  },[result.data]) //eslint-disable-line 

  useEffect(() => {
    setGenres(
      Array.from(new Set( books.map(b => b.genres).flat() ))
    )
  }, [books])

  const genreFilter = (book) => {
    if(filter === 'all genres'){
      return true
    } else {
      return book.genres.includes(filter)
    } 
  }

  const genreClick = (event) => {
    setFilter(event.target.innerText)
  }

  if (!props.show) {
    return null
  }


  return (
    <div>
      <h2>books</h2>

      {filter === 'all genres' ? null : <p>in genre <b>{filter}</b></p>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.filter(genreFilter).map(a =>
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {
          genres.map( g => 
            <button key={g} style={buttonSpacing} onClick={genreClick}>{g}</button>
          )
        }
        <button onClick={genreClick}>all genres</button>
      </div>
    </div>
  )
}

export default Books