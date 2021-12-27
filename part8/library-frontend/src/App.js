import React, { useState } from 'react'
import { useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import Notification from './components/Notification'
import { BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [notifications, setNotifications] = useState([])

  const notify = (messages) => {
    setNotifications(notifications.concat(messages))
    setTimeout(() => {
      setNotifications([])
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem('library-user-token')
    notify({message: 'successfully logged out', color: 'green'})
    setPage('authors')
  }

  useSubscription(BOOK_ADDED,{
    onSubscriptionData: ({subscriptionData}) => {
      notify({message: 'book created sucessfully', color: 'green'})
    }
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? <button onClick={() => setPage('add')}>add book</button> : null}
        {token ? <button onClick={() => setPage('recommend')}>recommend</button> : null}
        {token ? <button onClick={logout}>logout</button> : <button onClick={() => setPage('login')}>login</button>}
      </div>
      <Notification notifications={notifications}/>
      <Authors
        show={page === 'authors'}
        token={token}
        notify={notify}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        notify={notify}
        setPage={setPage}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        notify={notify}
        setPage={setPage}
      />

      <Recommend 
        show={page === 'recommend'}
      />

    </div>
  )
}

export default App