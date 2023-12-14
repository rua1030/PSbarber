const Empleado = require("../../models/empleado/modelEmpleado");
const Rol = require("../../models/rol/modelRol");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const Tipo_empleado = require("../../models/tipo_empleado/modelTipoEmpleado");
const jwt = require('jsonwebtoken');


async function listarEmpleado(req, res) {
  try {
    const EmpleadoContipoEm = await Empleado.findAll({
      include: [
        {
          model: Rol,
          attributes: ["nombre"],
        },
        {
          model: Tipo_empleado,
          attributes: ["nombre"],
        },
      ],
      attributes: [
        "id_Empleado",
        "nombre",
        "apellidos",
        "telefono",
        "tipo_documento",
        "documento",
        "email",
        "estado",
      ],
    });

    res.json(EmpleadoContipoEm);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Hubo un error al obtener los empleados con roles" });
  }
}

async function crearEmpleado(req, res) {
  const dataEmpleado = req.body;
  try {
    
    // Verificar si el documento de Empleado ya existe
    const existingEmpleado = await Empleado.findOne({
      where: {
        documento: dataEmpleado.documento,
      },
    });

    if (existingEmpleado) {
      return res.status(400).json({ error: "El documento del Empleado ya existe" });
    }

    // Verificar si el correo electrónico ya existe
    const existingEmpleadoEmail = await Empleado.findOne({
      where: { email: dataEmpleado.email },
    });

    if (existingEmpleadoEmail) {
      return res.status(400).json({ error: "El correo electrónico ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(dataEmpleado.contrasena, 10);
    const empleado = await Empleado.create({
      id_Empleado: dataEmpleado.id_Empleado,
      nombre: dataEmpleado.nombre,
      apellidos: dataEmpleado.apellidos,
      telefono: dataEmpleado.telefono,
      tipo_documento: dataEmpleado.tipo_documento,
      documento: dataEmpleado.documento,
      email: dataEmpleado.email,
      estado: 1,
      id_Rol: dataEmpleado.id_Rol,
      id_Tipo_Empleado: dataEmpleado.id_Tipo_Empleado,
      contrasena: hashedPassword,
    });

    const token = jwt.sign({ EmpleadoId: empleado.id_Empleado }, 'your-secret-key', {
      expiresIn: '1h'
    });

    res.status(201).json({ empleado, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear nuevo empleado" });
  }
}

// actualizar empleado
async function actualizarEmpleado(req, res) {
  const { id_Empleado } = req.params;
  const {
    nombre,
    apellidos,
    telefono,
    tipo_documento,
    documento,
    email,
    estado,
    id_Rol,
    id_Tipo_Empleado,
    contrasena
  } = req.body;

  try {
  const existingEmpleadoWithDocument = await Empleado.findOne({
  where: {
    documento,
    id_Empleado: { [Op.ne]: id_Empleado }
  }
    });

    if (existingEmpleadoWithDocument) {
      return res.status(400).json({ error: 'Documento ya existente en la base de datos' });
    }

    const empleadoToUpdate = await Empleado.findByPk(id_Empleado);

    if (!empleadoToUpdate) {
      return res.status(404).send('Empleado no encontrado');
    }

    // Actualizar los campos del empleado
    empleadoToUpdate.nombre = nombre;
    empleadoToUpdate.apellidos = apellidos;
    empleadoToUpdate.telefono = telefono;
    empleadoToUpdate.tipo_documento = tipo_documento;
    empleadoToUpdate.documento = documento;
    empleadoToUpdate.email = email;
    empleadoToUpdate.estado = estado;
    empleadoToUpdate.id_Rol = id_Rol;
    empleadoToUpdate.id_Tipo_Empleado = id_Tipo_Empleado;
    empleadoToUpdate.contrasena = contrasena;

    // Guardar los cambios en la base de datos
    await empleadoToUpdate.save();

    return res.status(200).json(empleadoToUpdate);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error al actualizar el Empleado');
  }
}
// fin de actualizar
// traer informacion para actualizar
async function listarporid(req, res){
  try {
    const EmpleadoId = req.params.id;
    const empleado = await Empleado.findByPk(EmpleadoId);

    if (empleado) {
      res.json(empleado);
    } else {
      res.status(404).json({ message: 'Empleado no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
}

async function desactivarEmpleado(req, res) {
  try {
      const { id_Empleado } = req.params;
      const empleado = await Empleado.findByPk(id_Empleado);
      if (!empleado) {
          return res.status(404).json({ error: 'Empleado no encontrado' });
      }
      // Actualiza el estado del empleado a "deshabilitado" (false)
      await empleado.update({ estado: false });

      res.status(200).json({ message: 'Empleado deshabilitado exitosamente' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al deshabilitar empleado' });
  }
}

async function activarEmpleado(req, res) {
  try {
      const { id_Empleado } = req.params;
      const empleado = await Empleado.findByPk(id_Empleado);
      if (!empleado) {
          return res.status(404).json({ error: 'Empleado no encontrado' });
      }
      await empleado.update({ estado: true });

      res.status(200).json({ message: 'Empleado habilitado exitosamente' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al habilitar empleado' });
  }
}

async function eliminarEmpleado(req, res) {
  try {
      const { id_Empleado } = req.params;
      const empleado = await  Empleado.findByPk(id_Empleado);

      if (!empleado) {
          return res.status(404).json({ error: 'Empleado no encontrado' });
      }

      // Elimina el empleado
      await empleado.destroy();

      res.json({ message: 'Empleado eliminado exitosamente' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar empleado' });
  }
}

async function login(req, res) {

  const {email, contrasena} = req.body;

  const empleado = await Empleado.findOne({ where: { email } });

  if (!empleado) {
    return res.status(401).json({ error: 'Authentication failed empleado' });
  }

  const passwordMatch = await bcrypt.compare(contrasena, empleado.contrasena)

  if (!passwordMatch) {
    return res.status(401).json({ error: 'Authentication failed' });
  }
  if (!empleado.estado) {
    return res.status(401).json({ error: 'empleado is not authorized to login' });
  }
  const rol = await Rol.findByPk(empleado.id_Rol);

  const token = jwt.sign({ empleadoId: empleado.id_Empleado, email: empleado.email, nombre: empleado.nombres, rol: rol ? rol.nombre : 'Sin rol',  }, secretKey, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true });

  res.status(200).json({ 
    token,
    Empleados: {
      id: empleado.id_Empleado,
      email: empleado.email,
      nombre: empleado.nombres,
      rol: rol ? rol.nombre_rol : 'Sin rol',
    },
   });
}

module.exports = {
  listarEmpleado,
  crearEmpleado,
  actualizarEmpleado,
  activarEmpleado,
  listarporid,
  eliminarEmpleado,
  desactivarEmpleado,
  login
};
