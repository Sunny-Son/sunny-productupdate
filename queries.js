const Pool = require('pg').Pool
const pool = new Pool({
  user: 'gthysnmmpsafap',
  host: 'ec2-54-225-89-195.compute-1.amazonaws.com',
  database: 'd84dr7o4jk38a1',
  password: '1ad745beee17c2eec7aedd5ae11429e511b7ba28e3578018588e52d339107e93',
  port: 5432,
})
const getProduct = (request, response) => {
  pool.query('SELECT * FROM product ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createProduct = (request, response) => {
  const { productcode, product_name, product_description, product_category } = request.body

  pool.query('INSERT INTO product (productcode, product_name, product_description, product_category) VALUES ($1, $2, $3, $4)', [productcode, product_name, product_description, product_category], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Product added with ID: ${results.insertId}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getProduct,
  getUserById,
  createProduct,
  updateUser,
  deleteUser,
}
