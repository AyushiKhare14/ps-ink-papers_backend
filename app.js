// app.js
const express = require('express')
const { Sequelize } = require('sequelize')
const AuthorModel = require('./models/authors')
const BookModel = require('./models/books')
const GenreModel = require('./models/genres')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

// Initialize Sequelize
const sequelize = new Sequelize('inkandpapers', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
})

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

// Define models
const Author = AuthorModel(sequelize)
const Book = BookModel(sequelize)
const Genre = GenreModel(sequelize)

Author.hasMany(Book, {foreignKey: 'author_id',})
Book.belongsTo(Author, {foreignKey: 'author_id',})

Genre.hasMany(Book, {foreignKey: 'genre_id',})
Book.belongsTo(Genre, {foreignKey: 'genre_id',})

// Sync models
sequelize.sync()
  .then(() => {
    console.log('Models synchronized successfully.')
  })
  .catch(err => {
    console.error('Error synchronizing models:', err)
  })

// Import routes
const routes = require('./routes')
app.use('/api', routes)

app.get('/', (req, res) => {
  res.send('Welcome to Pustakalay Administrator!')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})