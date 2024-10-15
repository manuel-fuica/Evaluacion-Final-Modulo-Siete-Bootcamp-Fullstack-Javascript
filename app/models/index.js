const dbConfig = require('../config/db.config')
const Sequelize = require('sequelize')

//se crea la conexion a la base de datos
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

// Ahora que db y sequelize están definidos, podemos acceder a ellos
db.users = require('./user.model')(sequelize, Sequelize)
db.bootcamps = require('./bootcamp.model')(sequelize, Sequelize)

// se establece la relación "muchos a muchos"
db.users.belongsToMany(db.bootcamps, {
    through: 'UserBootcamp', // Nombre de la tabla intermedia
    as: 'bootcamps',
    foreignKey: 'userId', // Nombre de la clave foránea en la tabla intermedia
    
});

db.bootcamps.belongsToMany(db.users, {
    through: 'UserBootcamp', 
    as: 'users',
    foreignKey: 'bootcampId',
    
});

module.exports = db;