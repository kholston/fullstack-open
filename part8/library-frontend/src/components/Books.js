import React, { useState, useEffect } from 'react'


const Books = ({show, books}) => {
  const [filter, setFilter] = useState('all genres')
  const [genres, setGenres] = useState([])
  

  const buttonSpacing = {
    margin: "5px"
  }


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
          {books.filter(genreFilter).map(b =>
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