import React, { useState, useEffect } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import { ALL_BOOKS, GET_USER } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [books, setBooks] = useState([])

  const bookQuery =  useQuery(ALL_BOOKS, {
    pollInterval: 3000
  })

  const [getUser, userQuery] = useLazyQuery(GET_USER) 

  useEffect(() => {
    if(bookQuery.data){
      setBooks(bookQuery.data.allBooks)
    }
  }, [bookQuery.data]) //eslint-disable-line

  useEffect(()=>{
    if(token){
      getUser({})
      if(userQuery.data){
        setUser(userQuery.data.me)
      }
    }
  } ,[token, userQuery.data]) // eslint-disable-line

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('library-user-token')
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? <button onClick={() => setPage('add')}>add book</button> : null}
        {token ? <button onClick={() => setPage('recommend')}>recommend</button> : null}
        {token ? <button onClick={logout}>logout</button> : <button onClick={() => setPage('login')}>login</button>}
      </div>

      <Authors
        show={page === 'authors'}
        token={token}
      />

      <Books
        show={page === 'books'}
        books={books}
      />

      <NewBook
        show={page === 'add'}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setError={null}
        setPage={setPage}
      />

      <Recommend 
        show={page === 'recommend'}
        books={books}
        favoriteGenre={user ? user.favoriteGenre : null}
      />

    </div>
  )
}

export default App