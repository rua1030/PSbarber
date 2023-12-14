const Cliente = require("../../models/clientes/modelClientes");
const { Op } = require("sequelize");

async function listarCliente(req, res){

    try {
        const cliente = await Cliente.findAll();
        res.json(cliente);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener roles' });
      }
    }

async function crearCliente(req, res) {
  const dataCliente = req.body;
  try {
    
// Verificar si el documento de Cliente ya existe
    const existingCliente = await Cliente.findOne({
      where: {
        documento: dataCliente.documento,
      },
    });

    if (existingCliente) {
      return res.status(400).json({ error: "El documento del Cliente ya existe" });
    }

    const cliente = await Cliente.create({
      id_Cliente: dataCliente.id_Cliente,
      nombre: dataCliente.nombre,
      apellidos: dataCliente.apellidos,
      telefono: dataCliente.telefono,
      tipo_documento: dataCliente.tipo_documento,
      documento: dataCliente.documento,
      email: dataCliente.email,
      estado: 1,
    });
    res.status(201).json({cliente});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear nuevo cliente" });
  }
}

// // actualizar cliente
async function actualizarCliente(req, res) {
  const { id_Cliente } = req.params;
  const {
    nombre,
    apellidos,
    telefono,
    tipo_documento,
    documento,
    email,
    estado,
  } = req.body;

  try {
  const existingClienteWithDocument = await Cliente.findOne({
  where: {
    documento,
    id_Cliente: { [Op.ne]: id_Cliente }
  }
    });

    if (existingClienteWithDocument) {
      return res.status(400).json({ error: 'Documento ya existente en la base de datos' });
    }

    const clienteToUpdate = await Cliente.findByPk(id_Cliente);

    if (!clienteToUpdate) {
      return res.status(404).send('Cliente no encontrado');
    }

    // Actualizar los campos del cliente
    clienteToUpdate.nombre = nombre;
    clienteToUpdate.apellidos = apellidos;
    clienteToUpdate.telefono = telefono;
    clienteToUpdate.tipo_documento = tipo_documento;
    clienteToUpdate.documento = documento;
    clienteToUpdate.email = email;
    clienteToUpdate.estado = estado;
    
    // Guardar los cambios en la base de datos
    await clienteToUpdate.save();

    return res.status(200).json(clienteToUpdate);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error al actualizar el cliente');
  }
}
// fin de actualizar

// traer informacion para actualizar
async function listarporid(req, res){
  try {
    const ClienteId = req.params.id;
    const clienteGet = await Cliente.findByPk(ClienteId);

    if (clienteGet) {
      res.json(clienteGet);
    } else {
      res.status(404).json({ message: 'cliente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
}

// async function desactivarEmpleado(req, res) {
//   try {
//       const { id_Cliente } = req.params;
//       const empleado = await Empleado.findByPk(id_Cliente);
//       if (!empleado) {
//           return res.status(404).json({ error: 'Empleado no encontrado' });
//       }
//       // Actualiza el estado del empleado a "deshabilitado" (false)
//       await empleado.update({ estado: false });

//       res.status(200).json({ message: 'Empleado deshabilitado exitosamente' });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Error al deshabilitar empleado' });
//   }
// }

// async function activarEmpleado(req, res) {
//   try {
//       const { id_Cliente } = req.params;
//       const empleado = await Empleado.findByPk(id_Cliente);
//       if (!empleado) {
//           return res.status(404).json({ error: 'Empleado no encontrado' });
//       }
//       await empleado.update({ estado: true });

//       res.status(200).json({ message: 'Empleado habilitado exitosamente' });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Error al habilitar empleado' });
//   }
// }

// async function eliminarEmpleado(req, res) {
//   try {
//       const { id_Cliente } = req.params;
//       const empleado = await  Empleado.findByPk(id_Cliente);

//       if (!empleado) {
//           return res.status(404).json({ error: 'Empleado no encontrado' });
//       }

//       // Elimina el empleado
//       await empleado.destroy();

//       res.json({ message: 'Empleado eliminado exitosamente' });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Error al eliminar empleado' });
//   }
// }

// async function login(req, res) {

//   const {email, contrasena} = req.body;

//   const empleado = await Empleado.findOne({ where: { email } });

//   if (!empleado) {
//     return res.status(401).json({ error: 'Authentication failed empleado' });
//   }

//   const passwordMatch = await bcrypt.compare(contrasena, empleado.contrasena)

//   if (!passwordMatch) {
//     return res.status(401).json({ error: 'Authentication failed' });
//   }
//   if (!empleado.estado) {
//     return res.status(401).json({ error: 'empleado is not authorized to login' });
//   }
//   const rol = await Rol.findByPk(empleado.id_Rol);

//   const token = jwt.sign({ empleadoId: empleado.id_Cliente, email: empleado.email, nombre: empleado.nombres, rol: rol ? rol.nombre : 'Sin rol',  }, secretKey, { expiresIn: '1h' });
//   res.cookie('token', token, { httpOnly: true });

//   res.status(200).json({ 
//     token,
//     Empleados: {
//       id: empleado.id_Cliente,
//       email: empleado.email,
//       nombre: empleado.nombres,
//       rol: rol ? rol.nombre_rol : 'Sin rol',
//     },
//    });
// }

module.exports = {
  listarCliente,
  crearCliente,
  actualizarCliente,
//   activarEmpleado,
  listarporid,
//   eliminarEmpleado,
//   desactivarEmpleado,
 
};
