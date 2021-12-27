import { gql } from '@apollo/client'

const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    name
    born
    bookCount
    id
  }
`

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    author{
      name
      born
      id
    }
    genres
    published
  }
`
const USER_DETAILS = gql`
  fragment UserDetails on User {
    id
    username
    favoriteGenre
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`
export const ALL_BOOKS = gql`
  query allBooks($genres: [String!]){
    allBooks(genres: $genres ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const CREATE_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: String!, $genres: [String!]! ){
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
       ...BookDetails
      }
  }
  ${BOOK_DETAILS}
`

export const EDIT_BIRTH_YEAR = gql`
  mutation editBirth ($name: String!, $born: String!) {
    editAuthor(name: $name, setBornTo: $born) {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
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
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`

export const LOGGED_IN = gql`
  subscription{
    loggedIn {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`
export const AUTHOR_ADDED = gql`
  subscription{
    authorAdded {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

export const BOOK_ADDED = gql`
  subscription{
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`