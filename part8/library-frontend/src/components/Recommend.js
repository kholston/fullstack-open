import React , { useState, useEffect } from 'react'
import { useSubscription, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, LOGGED_IN } from '../queries'


const Recommend = ({ show }) => {
  const [favoriteGenre, setFavoriteGenre] = useState('')
  const [books, setBooks] = useState([])
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if(result.data){
      setBooks(result.data.allBooks)
    }
  }, [result.data])

  useSubscription(LOGGED_IN, {
    onSubscriptionData: ({subscriptionData}) => {
      if(subscriptionData.data.loggedIn){
        const favorite = subscriptionData.data.loggedIn.favoriteGenre
        setFavoriteGenre(favorite)
        getBooks({variables: {genres: [favorite]}})
      }
    }
  })

  if(!show){
    return null
  }


  return(
    <div>
      <h2>recommendations</h2>
      {
        books ?
        <div>
          <p>books in your favorite genre <b>{favoriteGenre}</b> </p>
          <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th></th>
            </tr>
            {
              books.map(b => 
                <tr key={b.id}>
                  <td>{b.title}</td>
                  <td>{b.author.name}</td>
                  <td>{b.published}</td>
                </tr>  
              )
            }
          </tbody>
        </table>
        </div> :
        'loading...'
      }
    </div>
  )
}

export default Recommend