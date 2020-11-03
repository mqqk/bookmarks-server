require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const logger = require('./logger')
const { NODE_ENV } = require('./config')
const app = express()
const bookmarksRouter = require('./bookmarks-router/bookmarks-router')
const bookmarkRouter = require('./bookmark-router/bookmark-router')
const validateBearerToken = require('./validate-bearer-token')

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())


app.get('/', (req,res) =>{
    res.send('hi')
})



app.use(validateBearerToken)

app.use('/api/bookmarks',bookmarksRouter)
app.use(bookmarkRouter)



 app.use(function errorHandler(error, req, res, next) {
       let response
       if (NODE_ENV === 'production') {
         response = { error: { message: 'server error' } }
       } else {
         console.error(error)
         response = { message: error.message, error }
       }
       res.status(500).json(response)
     })

module.exports = app