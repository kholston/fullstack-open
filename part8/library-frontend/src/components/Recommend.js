import React from 'react'


const Recommend = ({ books, show, favoriteGenre}) => {

  const favoriteGenreFilter = (book) => book.genres.includes(favoriteGenre)

  if(!show){
    return null
  }

  return(
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{favoriteGenre}</b> </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th></th>
          </tr>
          {
            books.filter(favoriteGenreFilter).map(b => 
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>  
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default Recommend