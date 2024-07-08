// const { DataTypes } = require('sequelize');

// module.exports = (sequelize) => {
//     const Author = sequelize.define('Author', {
//         author_id: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true,
//             primaryKey: true,
//         },
//         name: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             validate: {
//                 is: /^[a-zA-Z ]*$/,
//                 notNull: true,
//                 notEmpty: true,
//             }
//         },
//         biography: {
//             type: DataTypes.TEXT('medium'),
//             allowNull: false,
//             validate: {
//                 notNull: true,
//                 notEmpty: true,
//             }
//         }
//     });

//     // Author.associate = models => {
//     //     Author.hasMany(models.Book, {
//     //       foreignKey: 'author_id'
//     //     });
//     //   }


//     return Author;
// };



const { DataTypes } = require('sequelize')
const sequelize = require('../connection')
const Author = sequelize.define('Author', {
  // Model attributes
    author_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[a-zA-Z ]*$/,
            notNull: true,
            notEmpty: true,
        }
    },
    biography: {
        type: DataTypes.TEXT('medium'),
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true,
        }
    }
});
// Sync the model with the database
async function syncModel() {
  await Author.sync()
  console.log('Author model was synchronized successfully.')
}
syncModel()

module.exports = Author;