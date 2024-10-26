const db = require('./app/models')
const userController = require('./app/controllers/user.controller')
const bootcampController = require('./app/controllers/bootcamp.controller')

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const cors = require('cors')
const cookieParser = require('cookie-parser')

//middleware
app.use(express.json())
app.use(cookieParser())

//manejo de autenticacion con cookies
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

const secretPassword = 'claveSecreta'

//middelware de autenticacion
const verificarToken = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ error: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, secretPassword);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }
};



//------------------REGISTRAR USUARIOS------------------
app.post('/api/signup', async (req, res) => {

    const status = await userController.createUser(req)
    console.log(status)
    if (status.error) {
        res.status(400).json(status)
    } else {
        res.status(201).json(status)
    }
});

//------------------INICIA SESION------------------
app.post('/api/signin', async (req, res) => {
    await userController.loginUser(req, res)
}
)

//------------------OBTENER USUARIOS POR ID------------------
app.get('/api/user/:id', verificarToken, async (req, res) => {
    const user = await userController.findById(req.params.id);
    res.json(user);
});

//------------------OBTENER TODOS LOS USUARIOS INCLUYENDO BOOTCAMP------------------
app.get('/api/user', verificarToken, async (req, res) => {
    const user = await userController.findAll()
    res.json(user)
})

//------------------ACTUALIZAR USUARIOS------------------
app.put('/api/user/:id', verificarToken, async (req, res) => {
    const user = await userController.updateUser(req, res)
    res.json(user)
})


//------------------ELIMINAR USUARIOS------------------
app.delete('/api/user/:id', verificarToken, async (req, res) => {
    const user = await userController.deleteUser(req, res)
    res.json(user)
})

//-------------------CREAR Y GUARDAR UN NUEVO BOOTCAMP------------------
app.post('/api/bootcamp', verificarToken, async (req, res) => {

    const bootcamp = await bootcampController.createBootcamp(req)

    if (bootcamp.error) {
        res.status(400).json(bootcamp)
    } else {
        res.status(201).json(bootcamp)
    }
})

//-------------------AGREGAR UN USUARIO AL BOOTCAMP------------------
app.post('/api/bootcamp/adduser', verificarToken, async (req, res) => {
    const result = await bootcampController.addUser(req.body.bootcampId, req.body.userId)
    if (result.error) {
        res.status(400).json(result)
    } else {
        res.status(201).json(result)
    }
})

//-------------------OBTENER BOOTCAMP POR ID------------------
app.get('/api/bootcamp/:id', verificarToken, async (req, res) => {
    const id = req.params.id;
    const result = await bootcampController.findById(id);
    if (!result) {
        res.status(404).json({ error: 'Bootcamp no encontrado' })
    } else {
        res.status(200).json(result)
    }
})

//-------------------OBTENER TODOS LOS BOOTCAMP------------------app.get('/api/bootcamp', async (req, res) => {
app.get('/api/bootcamp', async (req, res) => {
    const result = await bootcampController.findAll();
    if (!result) {
        res.status(404).json({ error: 'No se encontraron bootcamps' })
    } else {
        res.status(200).json(result)
    }
})



//---------------CARGA INICIAL------------------
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


// db.sequelize.sync({
//     force: true
// }).then(() => {
//     console.log('Eliminando y resincronizando la base de datos...')
//     run()
// })

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000')
})


