const { DataTypes } = require('sequelize')
const sequelize = require('../connection')
const Genre = sequelize.define('Genre', {
  // Model attributes
    genre_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    genre_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});
// Sync the model with the database
async function syncModel() {
  await Genre.sync()
  console.log('Genre model was synchronized successfully.')
}
syncModel()

module.exports = Genre;


