const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const blogRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const userRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')


const app = express()

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB:', error)
  })

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

if(process.env.NODE_ENV === 'test'){
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app