const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')
const mongoose = require('mongoose')
const schema = require('../schema')
const app = express()
const PORT = 4000
mongoose.connect('mongodb+srv://root:root@cluster0.b7ymz.mongodb.net/demo-graphql-2022?retryWrites=true&w=majority')
app.use(cors())
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
  })
)
const dbConnection = mongoose.connection
dbConnection.on('error', err => console.log(`Connection error: ${err}`))
dbConnection.once('open', () => console.log('Connected to DB'))
app.listen(PORT, err => err ? console.error(err) : console.log(`Server started on port ${PORT}`))