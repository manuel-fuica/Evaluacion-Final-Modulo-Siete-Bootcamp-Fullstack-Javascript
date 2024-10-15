const db = require('./app/models')
const userController = require('./app/controllers/user.controller')
const bootcampController = require('./app/controllers/bootcamp.controller')

const run = async () => {
    //creacion de usuarios
    const user1 = await userController.createUser({ firstname: 'Mateo', lastname: 'Diaz', email: 'mateo.diaz@correo.com' })
    const user2 = await userController.createUser({ firstname: 'Santiago', lastname: 'Mejias', email: 'santiago.mejias@correo.com' })
    const user3 = await userController.createUser({ firstname: 'Lucas', lastname: 'Rojas', email: 'lucas.rojas@correo.com' })
    const user4 = await userController.createUser({ firstname: 'Facundo', lastname: 'Fernandez', email: 'facundo.fernandez@correo.com' })

    //creacion de bootcamps
    const bootcamp1 = await bootcampController.createBootcamp({ title: 'Introduciendo El Bootcamp De React', cue: 10, description: 'React es la librería más usada en JavaScript para el desarrollo de interfaces.' })
    const bootcamp2 = await bootcampController.createBootcamp({ title: 'Bootcamp Desarrollo Web Full Stack', cue: 12, description: 'Crearás aplicaciones web utilizando las tecnologías y lenguajes más actuales y populares, como:JavaScript, nodeJS, Angular,MongoDB, ExpressJS' })
    const bootcamp3 = await bootcampController.createBootcamp({ title: 'Bootcamp Big Data, Inteligencia Artificial & Machine Learning', cue: 18, description: 'Domina Data Science, y todo el ecosistema de lenguajes y herramientas de Big Data, e intégralos con modelos avanzados de Artificial Intelligence y Machine Learning.' })

    //agregar usuarios a bootcamps
    await bootcampController.addUser(bootcamp1.id, user1.id)
    await bootcampController.addUser(bootcamp1.id, user2.id)
    await bootcampController.addUser(bootcamp2.id, user3.id)
    await bootcampController.addUser(bootcamp3.id, user1.id)
    await bootcampController.addUser(bootcamp3.id, user2.id)
    await bootcampController.addUser(bootcamp3.id, user4.id)

    //obtener el bootcamp por id incluyendo los users
    const _bootcamp1 = await bootcampController.findById(bootcamp1.id)
    console.log(
        '>> Bootcamp1: ' + JSON.stringify(_bootcamp1, null, 4)
    )

    //obtener todos los bootcamps 
    const bootcamps = await bootcampController.findAll()
    console.log(
        '>> Bootcamps: ' + JSON.stringify(bootcamps, null, 4)
    )

    //consultando los usuarios por id con sus bootcamps
    const _user = await userController.findUserById(user1.id)
    console.log(
        '>> User: ' + JSON.stringify(_user, null, 4)
    )


    //listar los usuarios con sus bootcamps
    const users = await userController.findAll()
    console.log(
        '>> Users: ' + JSON.stringify(users, null, 4)
    )

    // actualizar un usuario
    const _userUpdated = await userController.updateUser(user1.id, { firstname: 'Pedro', lastname: 'Sánchez', email: 'pedro.sanchez@correo.com' })
    console.log(
        'usuario actualizado correctamente'
    )

    // eliminar un usuario
    const _userDeleted = await userController.deleteUser(1)
    console.log(
        '>> Usuario eliminado: ' + _userDeleted.firstname + ' ' + _userDeleted.lastname
    )


}

db.sequelize.sync({
    force: true
}).then(() => {
    console.log('Eliminando y resincronizando la base de datos...')
    run()
})


