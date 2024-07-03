const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    const Genre = sequelize.define('Genres', {
        genre_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            
        },
        genre_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                is: /^[a-zA-Z ]*$/,
                notNull: true,
                notEmpty: true,
            }
        }
      })
  return Genre
};


