const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')
const schema = require('../schema')
const app = express()
app.use(cors())
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
  })
)
const PORT = 4000
app.listen(PORT, err => err ? console.error(err) : console.log(`Server started on port ${PORT}`))