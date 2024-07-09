const express = require('express');
const router = express.Router();
// const sequelize = require('../connection')
const Author = require('../models/authors')
const Book = require('../models/books')
const Genre = require('../models/genres')
const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: {fileSize: '1000000'},
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname){
            return cb(null, true)
        }
        cb("Incorrect file format. Only jpeg, jpg and png can be used.")
        
    }
}).single('image')



router.get('/', async (req, res) => {
    console.log("inside get")
  try {
    console.log(Genre.associations)
    const books = await Book.findAll({
        include: [Author, Genre]
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
router.post('/', upload ,async (req, res) => {
  try {
    const book_img = {"image": req.file.path};
    const book_detail = req.body;
    const book = {
        ...book_detail, ...book_img
    };
    //console.log(book)
    await Book.create(book);
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
