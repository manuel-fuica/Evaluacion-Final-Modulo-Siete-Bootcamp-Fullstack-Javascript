const db = require("../models")
const User = db.users

// Crear un usuario y obtener los usuarios
exports.createUser = (user) => {
    return User.create({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
    }, {
        returning: true
    })
    .then(user => {
        console.log(`>> Creado el usuario: ${JSON.stringify(user, null, 2)}`)
        return user
    })
    .catch(err => {
        console.log(`Error al crear el usuario ${err}`)
    })
}

//obtner los bootcamps de un user llamado findUserById
exports.findUserBootcamps = (userId) => {
    return User.findByPk(userId, {
        include: ['bootcamps']
    })
        .then(user => {
            return user.bootcamps
        })
        .catch(err => {
            console.log(`>> Error mientras se encontraban los bootcamps del usuario: ${err}`)
        })
}

//obtener todos los usuarios incluyendo los bootcamps llamando findAll
exports.findAll = () => {
    return User.findAll({
        include: ['bootcamps']
    })
        .then(users => {
            return users
        })
        .catch(err => {
            console.log(`>> Error mientras se encontraban todos los usuarios: ${err}`)
        })
}

//actualizar un user llamando updateUser
exports.updateUser = (user) => {
    return User.update({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
    }, {
        where: {
            id: user.id
        }
    })
        .then(user => {
            console.log(`Se ha actualizado el usuario ${user.firstname} ${user.lastname} con el email ${user.email}`)
            return user
        })
        .catch(err => {
            console.log(`Error al actualizar el usuario ${err}`)
        })
}

//borrar un user llamando deleteUser
exports.deleteUser = (userId) => {
    return User.destroy({
        where: {
            id: userId
        }
    })
        .then(user => {
            console.log(`Se ha borrado el usuario ${user.firstname} ${user.lastname} con el email ${user.email}`)
            return user
        })
        .catch(err => {
            console.log(`Error al borrar el usuario ${err}`)
        })
}



