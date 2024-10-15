const { users, bootcamps } = require('../models')
const db = require('../models')
const Bootcamp = db.bootcamps
const User = db.users

//crear y guardar un nuevo bootcamp

exports.createBootcamp = (bootcamp) => {
    return Bootcamp.create({
        title: bootcamp.title,
        cue: bootcamp.cue,
        description: bootcamp.description
    })
        .then(bootcamp => {
            console.log(`>> Creado el bootcamp: ${JSON.stringify(bootcamp, null, 4)}`)
            return bootcamp
        })
        .catch(err => {
            console.log(`Error al crear el bootcamp ${err}`)
        })
}

//agregar un usuario al bootcamp

exports.addUser = (bootcampId, userId) => {
    return Bootcamp.findByPk(bootcampId)
        .then((bootcamp) => {
            if (!bootcamp) {
                console.log(`Bootcamp no encontrado con id ${bootcampId}`);
                return null;
        }
        return User.findByPk(userId).then((user) => {
            if (!user) {
                console.log(`Usuario no encontrado con id`);
                return null;
            }
            bootcamp.addUser(user);
            console.log('****************************************************')
            console.log(`Agregado el usuario id=${userId} al bootcamp con id=${bootcampId}`)
            console.log('****************************************************')
            return bootcamp;
        });
    })
    .catch(err => {
            console.log(`Error al agregar el usuario ${err}`)
        })
};

//obtener los bootcamps por id
exports.findById = (Id) => {
    return Bootcamp.findByPk(Id, {
        include: [{
            model: User,
            as: 'users',
            atributes: ['id', 'firstname', 'lastname', 'email'],
            through: { 
                attributes: [],
            }
        },],
    })
    .then(bootcamp => {
        return bootcamp
    })
    .catch(err => {
        console.log(`>> Error mientras se encontraban los bootcamps: ${err}`)
    })
}

//obtner todos los bootcamps incluyendo los usuarios
exports.findAll = () => {
    return Bootcamp.findAll({
        include: [{
            model: User,
            as: 'users',
            atributes: ['id', 'firstname', 'lastname', 'email'],
            through: { 
                attributes: [],
            }
        },],
    })
    .then(bootcamps => {
        return bootcamps
    })
    .catch(err => {
        console.log(`>> Error mientras se encontraban los bootcamps: ${err}`)
    })
}




