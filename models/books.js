const { DataTypes } = require('sequelize')
const sequelize = require('../connection')
const Author = require('./authors')
const Genre = require('./genres')



const Book = sequelize.define('Book', {
  // Model attributes
    book_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    publication_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
    },
    author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    genre_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

Author.hasMany(Book, { foreignKey: 'author_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Book.belongsTo(Author, { foreignKey: 'author_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Genre.hasMany(Book, { foreignKey: 'genre_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Book.belongsTo(Genre, { foreignKey: 'genre_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });


// Sync Book model with the database
async function syncModel() {
  await Book.sync()
  console.log('Book model was synchronized successfully.')
}
syncModel()


module.exports = Book;