## Evaluacion Manuel Fuica
## Proyecto utilizando controllers y models

## Se realiza estructurada solicitada y se agrega la carpeta img con las capturas de los procesos realizados

## Se realizo:
- configuracion a la base de datos 
- creacion de modelos para los bootcamps y users, segun los atributos solicitados
- relacion entre las tablas 

## En la carpeta controller, para el archivo user controller se realizo:
- Crear y guardar usuarios llamado createUser.
- Obtener los Bootcamp de un usuario llamado findUserById.
- Obtener todos los Usuarios incluyendo, los Bootcamp llamado findAll.
- Actualizar usuario por Id llamado updateUserById.
- Eliminar un usuario por Id llamado deleteUserById.

## En la carpeta controller, para el archivo bootcamp controller se realizo:
Crear y guardar un nuevo Bootcamp llamado createBootcamp.
- Agregar un Usuario al Bootcamp llamado addUser.
- Obtener los Bootcamp por id llamado findById.
- Obtener todos los Usuarios incluyendo los Bootcamp llamado findAll

## Finalmente las consultas realizadas desde el archivo server.js fueron:

- Consultando el Bootcamp por id, incluyendo los usuarios.
- Listar todos los Bootcamp con sus usuarios.
- Consultar un usuario por id, incluyendo los Bootcamp.
- Listar los usuarios con sus Bootcamp.
- Actualizar el usuario según su id; por ejemplo: actualizar el usuario con id=1 por Pedro Sánchez.
- Eliminar un usuario por id; por ejemplo: el usuario con id=1
