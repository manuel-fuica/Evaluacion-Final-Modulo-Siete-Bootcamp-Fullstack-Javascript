const { users, bootcamps } = require('../models')
const db = require('../models')
const Bootcamp = db.bootcamps
const User = db.users

//crear y guardar un nuevo bootcamp

exports.createBootcamp = async (req) => {
    const Bootcamp = db.bootcamps;

    if (!req.body) {
        return { error: 'No se proporcionaron datos en el cuerpo de la solicitud' };
    }

    const { title, cue, description } = req.body;

    try {
        if (!title || !cue || !description) {
            return { error: 'No se proporcionaron todos los campos requeridos' };
        }

        const bootcampExistente = await Bootcamp.findOne({ where: { title } });
        if (bootcampExistente) {
            return { error: 'Este title de bootcamp ya está registrado' };
        }

        const newBootcamp = await Bootcamp.create({
            title,
            cue,
            description,
        });

        return {
            message: 'Bootcamp creado exitosamente',
            bootcamp: newBootcamp,
        };
    } catch (error) {
        console.error(error);
        return { error: 'Error al crear el bootcamp' };
    }
};

//agregar un usuario al bootcamp

exports.addUser = (bootcampId, userId) => {
    return Bootcamp.findByPk(parseInt(bootcampId))
        .then((bootcamp) => {
            if (!bootcamp) {
                console.log(`Bootcamp no encontrado con id ${bootcampId}`);
                return null;
            }
            return User.findByPk(parseInt(userId)).then((user) => {
                if (!user) {
                    console.log(`Usuario no encontrado con id`);
                    return null;
                }
                bootcamp.addUser(user);
                return {
                    error: false,
                    message: `Agregado el usuario con ID =${userId} al bootcamp con ID =${bootcampId}`,
                    bootcamp: bootcamp
                };
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
            attributes: ['id', 'firstname', 'lastname', 'email'],
            through: {
                attributes: []
            }
        }],
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
            attributes: ['id', 'firstname', 'lastname', 'email'],
            through: {
                attributes: []
            }
        }],
    })
        .then(bootcamps => {
            return bootcamps
        })
        .catch(err => {
            console.log(`>> Error mientras se encontraban los bootcamps: ${err}`)
        })
}




