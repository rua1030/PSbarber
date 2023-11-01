const Usuario = require('../../models/usuarios/modelUsuarios')
const Rol  = require('../../models/rol/modelRol');
const bcrypt = require('bcrypt');

async function listarUsuario(req, res) {
  try {
    const usuariosConRoles = await Usuario.findAll({
      include: [
        {
          model: Rol,
          attributes: ['nombre'],
        },
      ],
      attributes: [
        'id_Usuario',
        'nombres',
        'email',
        'pass',
        'estado'
      ],
    });

    res.json(usuariosConRoles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al obtener los usuarios con roles' });
  }
 }

 async function crearUsuario(req, res){
  const dataUsuario=req.body;
  try {
    const hashedPassword = await bcrypt.hash(dataUsuario.pass, 10);

    const usuario = await Usuario.create({
      id_Usuario:dataUsuario.id_Usuario,
      id_Rol:dataUsuario.id_Rol,
      nombres:dataUsuario.nombres,
      email:dataUsuario.email,
      pass:hashedPassword,
      estado:1
    });
    res.status(201).json(usuario)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear nuevo usuario' });
  }
 }   

 async function actualizarUsuario(req, res){
  const { id } = req.params;
  const { 
    id_usuario,
    id_Rol,
    nombres,
    email,
    pass,
    estado } = req.body;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).send('Usuario no encontrado');
    }

    const hashedPassword2 = await bcrypt.hash(usuario.pass, 10);
    usuario.id_usuario = id_usuario;
    usuario.id_Rol = id_Rol;
    usuario.nombres = nombres;
    usuario.email=email;
    usuario.pass=hashedPassword2;  
    usuario.estado=estado

    await usuario.save();

    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(500).send('Error al actualizar el usuario');
  }
 }

 async function actualizarEstado(req, res){

  try{
      const id_usuario = req.params.id;
      const nuevoEstado = req.body
      const usuarioExistente = await Usuario.findByPk(id_usuario);
      if (!usuarioExistente) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Actualiza los campos del cliente
      await Usuario.update(
          {
            
              estado: 0
          },
          {
              where: { id_usuario }
          }
      );
  }catch (error){
      console.error(error);
      res.status(500).json({error: 'Error al actualizar cliente'});
  }
}


async function login(req, res){
  const datosUsuarios = req.body;

  const user = await Usuario.findOne({ where: { email:datosUsuarios.email, pass:datosUsuarios.pass } });

  if (user) {
    res.json({ message: 'Login exitoso' });
  } else {
    res.status(401).json({ message: 'Credenciales incorrectas' });
  }
}



module.exports={
    listarUsuario,
    crearUsuario,
    actualizarUsuario,
    actualizarEstado,
    login
}
    