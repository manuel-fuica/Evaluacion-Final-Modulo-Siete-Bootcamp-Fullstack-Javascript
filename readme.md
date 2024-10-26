## Evaluacion Manuel Fuica
## Proyecto utilizando API Backend Node Express

## Se realiza estructurada solicitada y se agrega la carpeta img con las capturas de los procesos realizados

## Se realizo:
- configuracion a la base de datos y carga inicial de datos
- creacion de modelos para los bootcamps y users, segun los atributos solicitados
- relacion entre las tablas
- Archivo index contiene la conexion a la base de datos 

## En la carpeta controller, para el archivo user controller se realizo:
- Registar usuarios generando token.
- Iniciar sesion validando token.
- Listar informacion del usuario segun ID
- Obtener todos los usuarios incluyendo los bootcamps llamando findAll
- Actualizar un usuario llamando updateuser
- Eliminar un usuario por Id llamado deleteUserById.

## En la carpeta controller, para el archivo bootcamp controller se realizo:
- Crear y guardar un nuevo Bootcamp llamado createBootcamp.
- Agregar un Usuario al Bootcamp llamado addUser.
- Obtener los Bootcamp por id llamado findById.
- Obtener todos los Bootcamp llamado findAll

## Finalmente las consultas realizadas desde el archivo server.js fueron:
# Para el user
- Se realiza la utilizacion del middleware para validar token y se ejecutan todas las consultas solicitadas
- Iniciar sesion
- Obtener usuarios por ID
- Obtener todos los usuarios incluyendo los bootcamps
- Actualizar usuarios
- Eliminar usuarios

# Para el Bootcamp
- Crear y guardar un nuevo bootcamp
- Agregar un usuario al bootcamp
- Obtener bootcamp por ID
- Obtener todos los bootcamps
