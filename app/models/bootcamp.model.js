const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Bootcamp = sequelize.define('bootcamps', {
        title: {
            type: DataTypes.STRING
        },
        cue: {
            type: DataTypes.INTEGER,
            validate: {
                min: 5,
                max: 20,
                isInt: true
            }
        },
        description: {
            type: DataTypes.STRING
        }
    })
    return Bootcamp
}
