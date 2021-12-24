import React, { useState, useEffect } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'


const Books = ({show}) => {
  const [books, setBooks] = useState([])
  const [filter, setFilter] = useState('all genres')
  const [genres, setGenres] = useState([])
  
  // get all books on first load
  // create list of genres from books
  // create buttons from that list
  // whenever a button is clicked do a query to get bboks in that genre

  const buttonSpacing = {
    margin: "5px"
  }
  
  const initialBooks = useQuery(ALL_BOOKS)
  const [getBooksByGenre, bookGenreQuery] = useLazyQuery(ALL_BOOKS)

  // sets genres and books when component is rendered
  useEffect(()=>{
    if(initialBooks.data){
      const result = initialBooks.data.allBooks
      setBooks(result)
      setGenres(
        Array.from(new Set( result.map(b => b.genres).flat() ))
      )
    }
  }, [initialBooks.data]) //eslint-disable-line

  useEffect(()=>{
    if(bookGenreQuery.data){
      setBooks(bookGenreQuery.data.allBooks)
    }
  }, [bookGenreQuery.data])

  const genreClick = (event) => {
    const genre = event.target.innerText
    setFilter(genre)
    if(genre === 'all genres'){
      getBooksByGenre({variables: {genres: null}})
    } else {
      getBooksByGenre({variables: {genres: [genre]}})
    }
  }

  if (!show) {
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
          {books.map(b =>
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
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