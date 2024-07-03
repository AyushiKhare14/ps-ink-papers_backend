const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    const Book = sequelize.define('Books', {
        book_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,        
            primaryKey: true,
            
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull: true,
                notEmpty: true,
            }
        },
        price:{
            type: DataTypes.FLOAT,
            allowNull: false,
            validate:{
                notNull: true,
                notEmpty: true,
            }
        },
        publication_date:{
            type: DataTypes.DATE,
            allowNull: false,
            validate:{
                notNull: true,
                notEmpty: true,
            }
        }
      })

  return Book
}


