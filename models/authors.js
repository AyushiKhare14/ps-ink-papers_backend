const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Author = sequelize.define('Author', {
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

    return Author;
};