const jwt = require('jsonwebtoken')
const db = require('../models')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const bcrypt = require('bcryptjs')

const secretPassword = 'claveSecreta'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//-------------REGISTRAR USUARIOS-------------
exports.createUser = async (req) => {
    const User = db.users

    if (!req.body) {
        return { error: 'No se proporcionaron datos en el cuerpo de la solicitud' };
    }

    const { firstname, lastname, email, password } = req.body;

    try {
        if (!firstname || !lastname || !email || !password) {
            return { error: 'No se proporcionaron todos los campos requeridos' };
        }
        const userExistente = await User.findOne({ where: { email } });
        if (userExistente) {
            return { error: 'Este email ya está registrado' };
        }

        //encripta la contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({
            firstname,
            lastname,
            email,
            password: hashedPassword //guarda la contraseña encriptada
        });

        //elimina la contraseña del usuario para no mostarrla
        delete newUser.password;

        return {
            message: 'Usuario creado exitosamente',
            user: newUser,
        };
    } catch (error) {
        console.error(error);
        return { error: 'Error al crear el usuario' };
    }
};

//------------------INICIA SESION------------------
exports.loginUser = async (req, res) => {
    const User = db.users
    const { email, password } = req.body

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }
        const token = jwt.sign({ id: user.id }, secretPassword, { expiresIn: '1h' });

        return res.status(200).json({ token, user });
    }

    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al iniciar sesión' });
    }
}

//-------------------------------Listar informacion del usuario segun ID-------------------------------
exports.findById = async (Id) => {
    const User = db.users
    try {
        const user = await User.findByPk(Id);
        if (!user) {
            throw new Error(`Usuario no encontrado con ID ${Id}`);
        }
        return user;
    } catch (err) {
        console.error(`Error mientras se encontraba el usuario: ${err}`);
        throw err;
    }
};



//-------------------obtener todos los usuarios incluyendo los bootcamps llamando findAll---------------
exports.findAll = () => {
    const User = db.users
    return User.findAll({
        include: [{
            model: db.bootcamps,
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

//-----------------------   ACTUALIZAR USUARIOS    -----------------------
exports.updateUser = async (req, res) => {
    console.log('Solicitud PUT para actualizar usuario');
    console.log('Req.body:', req.body);
    console.log('Req.params:', req.params);

    const { id } = req.params;
    const { firstname, lastname } = req.body;
    const User = db.users;

    try {
        const user = await User.findByPk(id);
        console.log('Usuario encontrado:', user);

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        user.firstname = firstname;
        user.lastname = lastname;
        console.log('Usuario actualizado:', user);

        await user.save();
        console.log('Usuario guardado');

        res.json({ message: 'Usuario actualizado correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};

//------------------ELIMINAR USUARIOS------------------
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const User = db.users;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        await user.destroy();

        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};