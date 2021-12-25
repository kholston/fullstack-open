import React, { useState } from 'react'
import { useMutation, useApolloClient } from '@apollo/client'
import { CREATE_BOOK, ALL_BOOKS } from '../queries'
import { includedIn } from '../utilities/helpers'

const NewBook = ({notify, show, setPage}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const client = useApolloClient()
  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{query: ALL_BOOKS}],
    onError: (error) => {
      notify(error.graphQLErrors[0].message)
    },
    update: (store, response) => {
      const addedBook = response.data.addBook
      const dataInStore = client.readQuery({query: ALL_BOOKS})
      if(!includedIn(dataInStore.allBooks, addedBook)){
        client.writeQuery({
          query: ALL_BOOKS,
          data: {allBooks: dataInStore.allBooks.concat(addedBook)}
        })
      }
    }
  })



  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    await createBook({ variables:{title, author, published, genres } })


    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
    setPage('books')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook
