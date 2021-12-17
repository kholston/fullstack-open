require('dotenv').config()
const { ApolloServer, UserInputError, gql, AuthenticationError} = require('apollo-server-express')
const cors = require('cors')
const express = require('express')
const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { createServer } = require('http')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Person = require('./models/Person')
const User = require('./models/User')


console.log('connecting to database')

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  enum YesNo {
    YES
    NO
  }

  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  type User {
    username: String!
    friends: [Person!]!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!) : Person
    me: User
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    editNumber(
      name: String!
      phone: String!
    ): Person
    createUser(
      username: String!
    ): User
    login(
      username: String!
      password: String!
    ) : Token
    addAsFriend(
      name: String!
    ): User
  }
`

const resolvers = {
  Query: {
    personCount: () => Person.collection.countDocuments(),
    allPersons: async (root, args) => {
      if(!args.phone){
        return await Person.find({})
      }
      
      return await Person.find({phone: {$exists: args.phone === 'YES'}})
    },
    findPerson: (root, args) => {
      return Person.findOne({name: args.name}).exec()
    }
      ,
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Person : {
    address: (root) => {
      return {
        street: root.street,
        city: root.city
      }
    }
  },
  Mutation: {
    addPerson: async (root, args, context) => {
      const person = new Person({...args})
      const currentUser = context.currentUser

      if(!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      try {
        await person.save()
        currentUser.friends = currentUser.friends.concat(person)
        await currentUser.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return person
    },
    editNumber: async (root,args) => {
      const person = await Person.findOne({name: args.name})
      person.phone = args.phone
      
      try {
        await person.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return person
    },
    createUser: (root, args) => {
      const user = new User({username: args.username})
      
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({username: args.username})

      if(!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET)}
    },
    addAsFriend: async (root, args, { currentUser } ) => {
      const nonFriendAlready = (person) => 
      !currentUser.friends.map(f => f._id).includes(person._id)

      if(!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const person = await Person.findOne({name: args.name})
      if(nonFriendAlready(person)){
        currentUser.friends = currentUser.friends.concat(person)
      }

      await currentUser.save()

      return currentUser
   }
  },
}

const app = express()
const httpServer = createServer(app)

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

const schema = makeExecutableSchema({typeDefs, resolvers})
const subscriptionServer = SubscriptionServer.create({
  schema,
  execute,
  subscribe
}, {
  server: httpServer,
  path: '/'
})

const server = new ApolloServer({
  schema,
  context: async ({req}) => {
    const auth = req ? req.headers.authorization : null
    if(auth && auth.toLowerCase().startsWith('bearer ')){
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id).populate('friends')
      return { currentUser }
    }
  },
  plugins: [{
    async serverWillStart() {
      return {
        async drainServer() {
          subscriptionServer.close()
        }
      }
    }
  }],
})



server.start().then(() => [
  server.applyMiddleware({
    app
  })
])

const PORT = 4000
httpServer.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
})
