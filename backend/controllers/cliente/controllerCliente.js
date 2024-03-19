const Cliente = require("../../models/clientes/modelClientes");
const { Op } = require("sequelize");

async function listarCliente(req, res){

    try {
        const cliente = await Cliente.findAll();
        res.json(cliente);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener clientes' });
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

async function actualizarCliente(req, res) {
  const { documento } = req.params;
  const {
    nombre,
    apellidos,
    telefono,
    tipo_documento,
    email,
    estado,
  } = req.body;

  try {
    
    // Buscar el cliente a actualizar
    const clienteToUpdate = await Cliente.findOne({
      where: {
        documento,
        documento: { [Op.ne]: null }
      }
    });
    
    if (!clienteToUpdate) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    // Actualizar los campos del cliente
    await clienteToUpdate.update({
      nombre,
      apellidos,
      telefono,
      tipo_documento,
      email,
      estado,
    });

    return res.status(200).json(clienteToUpdate);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al actualizar el cliente' });
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

async function desactivarCliente(req, res) {
  try {
      const { documento } = req.params;
      const cliente = await Cliente.findByPk(documento);
      if (!cliente) {
          return res.status(404).json({ error: 'Cliente a desactivar no encontrado' });
      }

      // Actualiza el estado del cliente a "deshabilitado" (por ejemplo, 0 o 'inactivo')
      await Cliente.update({ estado: false }, { where: { documento: documento } });

      res.status(200).json({ message: 'Cliente deshabilitado exitosamente' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al deshabilitar cliente' });
  }
}


//  async function desactivarCliente(req, res) {
//    try {

//      const { documento } = req.params;
//      const cliente = await Cliente.findByPk(documento);

//     if (!cliente) {
//       return res.status(404).json({ error: 'Cliente no  encontrado' });
//     }

//     // Actualiza el estado del Cliente a "deshabilitado" (false)
//     await cliente.update({ estado: false });

//     return res.status(200).json({ message: 'Cliente deshabilitado exitosamente' });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Error al deshabilitar cliente' });
//   }
// }

async function activarCliente(req, res) {
  try {
      const { documento } = req.params;
      const cliente = await Cliente.findByPk(documento);
      if (!cliente) {
          return res.status(404).json({ error: 'Cliente a desactivar no encontrado' });
      }

      // Actualiza el estado del cliente a "deshabilitado" (por ejemplo, 0 o 'inactivo')
      await Cliente.update({ estado: true }, { where: { documento: documento } });

      res.status(200).json({ message: 'Cliente habilitado exitosamente' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al deshabilitar cliente' });
  }
}


async function eliminarCliente(req, res) {
  try {
    const { documento } = req.params;
    const cliente = await Cliente.findByPk(documento);

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    // Elimina el cliente
    await cliente.destroy();

    res.json({ message: 'Cliente eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar cliente' });
  }
}


module.exports = {
  listarCliente,
  crearCliente,
  actualizarCliente,
  activarCliente,
  listarporid,
  eliminarCliente,
  desactivarCliente,
};
