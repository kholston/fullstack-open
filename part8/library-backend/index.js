const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Book =  require('./models/Book')
const Author =  require('./models/Author')
const User = require('./models/User')

const JWT_SECRET = 'Token Secret'

const MONGODB_URI = 'mongodb+srv://admin:adminPassword@cluster0.2wg1w.mongodb.net/library?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  }).catch((error) => {
    console.log('error connenting to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount:Int!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genres: [String]): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: String!
      genres:[String!]!
    ) : Book
    addAuthor(
      name: String!
      born: Int
    ): Author
    editAuthor(
      name: String!
      setBornTo: String!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`


const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      try {
        if(args.author && args.genres){
          const books = await Book.find({genres: { $in: args.genres } }).populate('author')
          return books.filter(b => b.author.name === args.author)
        } else if (args.author){
          const books = await Book.find({}).populate('author')
          return books.filter(b => b.author.name === args.author)
        } else if (args.genres) {
            return await Book.find({genres: { $in: args.genres } }).populate('author')
        } else {
            return await Book.find({}).populate('author')
        }
      } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
      }
    },
    me: (root, args, context) => {
      return context.currentUser
    } 
  ,
    allAuthors: async (root, args) => {
      return await Author.find({})
    },
  },
  Author: {
    bookCount: async (root) => {
      const authorBooks = await Book.find({author: root._id})
      return authorBooks.length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if(!currentUser){
        throw new AuthenticationError("not authenticated")
      }

      try {
        let bookAuthor = await Author.findOne({name: args.author})
        if(!bookAuthor){
          bookAuthor = await new Author({
            name: args.author,
            born: null
          }).save()
        }

        bookAuthor = bookAuthor.toJSON()
        const book = await new Book({...args, author: bookAuthor._id}).save()
        return await book.populate('author')
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    addAuthor: async (root, args) => {
      const author = new Author({...args})
      try {
       await author.save()
       return author
      } catch(error){
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      
      if(!currentUser){
        throw new AuthenticationError("not authenticated")
      }

      const author = await Author.findOne({name: args.name}) 
      if(!author){
        return new UserInputError("author not found")
      }

      try {
        const editedAuthor = {...author.toJSON(), born: args.setBornTo}
        const updatedAuthor = await Author.findByIdAndUpdate(author.id, editedAuthor, {returnDocument: 'after'})
        return updatedAuthor
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })
      try {
        await user.save()
        return { username: user.username, favoriteGenre: user.favoriteGenre}
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if( !user || args.password !== 'secret' ){
        throw new UserInputError("Wrong Credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    const auth = req ? req.headers.authorization: null
    if(auth && auth.toLowerCase().startsWith('bearer ')){
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})