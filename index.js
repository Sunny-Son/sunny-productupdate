const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const http = require('http');
//const port = 3000  
const PORT = process.env.PORT || 3000

/*
const server = http.createServer((req,res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});
*/

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
app.post('/users', db.createProduct)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`)
})

//node index.js
//App running on port 3000.
