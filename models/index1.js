// const { Sequelize } = require('sequelize');
// const sequelize = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: 'mysql' // or 'sqlite', 'postgres', etc.
// });
const sequelize = require('../connection')

const AuthorModel = require('./authors');
const GenreModel = require('./genres');
const BookModel = require('./books');

const Author = AuthorModel(sequelize);
const Genre = GenreModel(sequelize);
const Book = BookModel(sequelize);

// Establish associations
Author.hasMany(Book, { foreignKey: 'author_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Book.belongsTo(Author, { foreignKey: 'author_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Genre.hasMany(Book, { foreignKey: 'genre_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Book.belongsTo(Genre, { foreignKey: 'genre_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Author.sync()
    .then(()=>{
        Genre.sync()
            .then(()=>{
                Book.sync()
                    .then(()=>{
                        console.log('Models synchronized successfully.') 
                    })
            })
    })
    .catch(err => {
            console.error('Error synchronizing models:', err);
          });
          
module.exports = {
  Author,
  Genre,
  Book
};
