const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const http = require('http');
//const port = 3000  
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/product', db.getProduct)
app.get('/users/:id', db.getUserById)
app.post('/product', db.createProduct)
app.put('/product/:id', db.updateProduct)
app.delete('/users/:id', db.deleteUser)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`)
})
