const express = require('express');
const router = express.Router();
const sequelize = require('../connection')
// const AuthorModel = require('../models/authors');
// const Author = AuthorModel(sequelize);
const Author = require('../models/authors');

router.get('/', async (req, res) => {
  try {
    const authors = await Author.findAll({
      order: [
        ['createdAt', 'DESC'],]
    });
    res.json(authors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single author by ID
router.get('/:id', async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id);
    if (author) {
      res.json(author);
    } else {
      res.status(404).json({ error: 'Author not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new author
router.post('/', async (req, res) => {
    console.log("inside post")
  try {
    console.log(req.body)
    const author = await Author.create(req.body);
    res.status(201).json(author);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update an author by ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Author.update(req.body, {
      where: { author_id: req.params.id }
    });
    if (updated) {
      const updatedAuthor = await Author.findByPk(req.params.id);
      res.json(updatedAuthor);
    } else {
      res.status(404).json({ error: 'Author not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE an author by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Author.destroy({
      where: { author_id: req.params.id }
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Author not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
