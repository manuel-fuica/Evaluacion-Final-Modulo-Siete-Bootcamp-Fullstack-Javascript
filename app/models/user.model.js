const { type } = require("os")

//creacion del modelo con sus atributos
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        firstname: {
            type: DataTypes.STRING,
            allownNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allownNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allownNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allownNull: false
        }
    })
    return User
}