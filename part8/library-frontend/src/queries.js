import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`
export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
        born
      }
      genres
      published
      id
    }
  }
`

export const CREATE_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: String!, $genres: [String!]! ){
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
        title
        author {
          name
          born
          id
        }
        published
        genres
        id
      }
  }
`

export const EDIT_BIRTH_YEAR = gql`
  mutation editBirth ($name: String!, $born: String!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
      bookCount
      id
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!){
    login(username: $username, password: $password){
      value
    }
  }
`

export const GET_USER = gql`
  query{
    me{
      username
      favoriteGenre
      id
    }
  }
`