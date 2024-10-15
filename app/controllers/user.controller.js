const { user } = require('../models')
const db = require('../models')
const User = db.users
const Bootcamp = db.bootcamps

//crear y guardar usuarios
exports.createUser = (user) => {
    return User.create({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
    }, {
        returning: true
    }
    )
        .then(user => {
            console.log(`>> Creado el usuario: ${JSON.stringify(user, null, 4)}`)
            return user
        })
        .catch(err => {
            console.log(`Error al crear el usuario ${err}`)
        })
}

//obtener los bootcamps de un user llamando findUserById
exports.findUserById = (Id) => {
    return User.findByPk(Id, {
        include: [{
            model: Bootcamp,
            as: 'bootcamps',
            atributes: ['id', 'title', 'cue'],
            through: {
                attributes: [],
            }
        },],
    })
        .then(user => {
            return user
        })
        .catch(err => {
            console.log(`>> Error mientras se encontraban los bootcamps del usuario: ${err}`)
        })
}

//obtener todos los usuarios incluyendo los bootcamps llamando findAll
exports.findAll = () => {
    return User.findAll({
        include: [{
            model: Bootcamp,
            as: 'bootcamps',
            atributes: ['id', 'title', 'cue'],
            through: {
                attributes: [],
            }
        },],
    })
        .then(users => {
            return users
        })
        .catch(err => {
            console.log(`>> Error mientras se encontraban todos los usuarios: ${err}`)
        })
}

//actalizar un usuario
exports.updateUser = async (id, userData) => {
    try {
        const userUpdated = await User.update(userData, {
            where: { id }
        });
        return userUpdated;
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        throw error;
    }
};

//eliminar un usuario
exports.deleteUser = async (id) => {
    try {
        const userToDelete = await User.findOne({
            where: { id }
        });
        await User.destroy({
            where: { id }
        });
        return userToDelete;
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        throw error;
    }
};