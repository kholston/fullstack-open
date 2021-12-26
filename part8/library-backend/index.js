const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server-express')
const { PubSub } = require('graphql-subscriptions')
const cors = require('cors')
const express = require('express')
const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { createServer } = require('http') 
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

mongoose.set('debug', true)

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
  type Subscription {
    loggedIn: User!
    bookAdded: Book!
  }
`

const pubsub = new PubSub()

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
        let book = await new Book({...args, author: bookAuthor._id}).save()
        book = await book.populate('author')
      
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        
        return book
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

      pubsub.publish('LOGGED_IN', {loggedIn: user})
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Subscription: {
    loggedIn: {
      subscribe: () => pubsub.asyncIterator(['LOGGED_IN'])
    },
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const app = express()
const httpServer = createServer(app)

app.use(cors({
  origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
  credentials: true
}))

const schema = makeExecutableSchema({typeDefs, resolvers})

const subscriptionServer = SubscriptionServer.create({
  schema,
  execute,
  subscribe
  }, {
    server: httpServer,
    path:'/graphql'
  })

const server = new ApolloServer({
  schema,
  context: async ({req}) => {
    const auth = req ? req.headers.authorization: null
    if(auth && auth.toLowerCase().startsWith('bearer ')){
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
  plugins: [{
    async serverWillStart(){
      return {
        async drainServer() {
          subscriptionServer.close()
        }
      }
    }
  }]
})

server.start().then(() => {
  server.applyMiddleware({
    app
  })
})

const PORT = 4000

httpServer.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`Subscriptions ready at ws://localhost:${PORT}${server.graphqlPath}`)
})
