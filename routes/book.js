const express = require('express');
const router = express.Router();
const sequelize = require('../connection')
// const BookModel = require('../models/books');
// const Book = BookModel(sequelize);
// const AuthorModel = require('../models/authors');
// const Author = AuthorModel(sequelize)
// const GenresModel = require('../models/genres');
// const Genre = GenresModel(sequelize)
//const Authors = AuthorModel(sequelize)
const Authors = require('../models/authors')
const Book = require('../models/books')
//const Authors = require('../models/author')
const Genre = require('../models/genres')


router.get('/', async (req, res) => {
    console.log("inside get")
  try {
    console.log(Genre.associations)
    const books = await Book.findAll({
        include: [Genre]
      });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new book
router.post('/', async (req, res) => {
    console.log("inside post")
  try {
    console.log(req.body)
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update an book by ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Book.update(req.body, {
      where: { book_id: req.params.id }
    });
    if (updated) {
      const updatedBook = await Book.findByPk(req.params.id);
      res.json(updatedBook);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE an book by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Book.destroy({
      where: { book_id: req.params.id }
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
