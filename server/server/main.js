const express = require('express')
const app = express()
const PORT = 4000
app.listen(PORT, err => err ? console.error(err) : console.log(`Server started on port ${PORT}`))