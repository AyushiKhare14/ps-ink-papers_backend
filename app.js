const express = require('express');

// const AuthorModel = require('./models/authors');
// const BookModel = require('./models/books');
// const GenreModel = require('./models/genres');
const sequelize = require('./connection');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;





// // Define models
// const Author = AuthorModel(sequelize);
// const Book = BookModel(sequelize);
// const Genre = GenreModel(sequelize);

// //Define associations
// Author.hasMany(Book, { foreignKey: 'author_id' });
// Book.belongsTo(Author, { foreignKey: 'author_id' });

// Genre.hasMany(Book, { foreignKey: 'genre_id' });
// Book.belongsTo(Genre, { foreignKey: 'genre_id' });

// Author.hasMany(Book, { foreignKey: 'author_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
// Book.belongsTo(Author, { foreignKey: 'author_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Genre.hasMany(Book, { foreignKey: 'genre_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
// Book.belongsTo(Genre, { foreignKey: 'genre_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });




// Author.hasMany(Book);
// Book.belongsTo(Author);

// Genre.hasMany(Book);
// Book.belongsTo(Genre);

// Sync models
// sequelize.sync()
//   .then(() => {
//     console.log('Models synchronized successfully.');
//   })
//   .catch(err => {
//     console.error('Error synchronizing models:', err);
//   });

// Author.associate = ()=> {
//     Author.hasMany(Book, {
//       foreignKey: 'author_id'
//     });
//   }

//   Genre.associate = () => {
//     Genre.hasMany(Book, {
//       foreignKey: 'genre_id'
//     });
//   }

// Book.associate = () => {
//         Book.belongsTo(Author, {
//           foreignKey: 'author_id'
//         })
//       }

//     Book.associate = () => {
//         Book.belongsTo(Genre, {
//           foreignKey: 'genre_id'
//         })
//       }


// Author.sync()
//     .then(()=>{
//         Genre.sync()
//             .then(()=>{
//                 Book.sync()
//                     .then(()=>{
//                         console.log('Models synchronized successfully.') 
//                     })
//             })
//     })
//     .catch(err => {
//             console.error('Error synchronizing models:', err);
//           });

// Import routes
const authorRoutes = require('./routes/author');
const bookRoutes = require('./routes/book');
const genreRoutes = require('./routes/genre');
app.use('/api/author', authorRoutes);
app.use('/api/book', bookRoutes);
app.use('/api/genre', genreRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Pustakalay Administrator!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
