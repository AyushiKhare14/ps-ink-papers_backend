const express = require('express');
// const sequelize = require('./connection');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;


// Import routes
const authorRoutes = require('./routes/author');
const bookRoutes = require('./routes/book');
const genreRoutes = require('./routes/genre');
app.use('/api/author', authorRoutes);
app.use('/api/book', bookRoutes);
app.use('/api/genre', genreRoutes);

//static images folder

app.use('/images', express.static('./images'))

app.get('/', (req, res) => {
  res.send('Welcome to Pustakalay Administrator!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
