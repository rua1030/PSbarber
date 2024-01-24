const Servicio = require("../../models/servicio/modelServicio");
const { Op } = require("sequelize");

async function listarServicio(req, res){

    try {
        const servicio = await Servicio.findAll();
        res.json(servicio);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los servicios' });
      }
    }

async function crearServicio(req, res) {
  const dataServicio = req.body;
  try {
    
// Verificar si el documento de servicio ya existe
const existingServicio = await Servicio.findOne({
    where: {
      nombre: dataServicio.nombre,
    },
  });
  
  if (existingServicio) {
    return res.status(400).json({ error: "el servicio ya existe" });
  }
  
  const nuevoServicio = await Servicio.create({
    id_Servicio: dataServicio.id_Servicio,
    precio: dataServicio.precio,
    nombre: dataServicio.nombre,
    estado: 1,
  });
  
  res.status(201).json({ servicio: nuevoServicio });  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear nuevo servicio" });
  }
}

// // actualizar servicio
async function actualizarServicio(req, res) {
  const { id_Servicio } = req.params;
  const {
    precio,
    nombre,
    estado,
  } = req.body;

  try {
  const existingServicioWithDocument = await Servicio.findOne({
  where: {
    nombre,
    id_Servicio: { [Op.ne]: id_Servicio }
  }
    });

    if (existingServicioWithDocument) {
      return res.status(400).json({ error: 'El servicio ya existente en la base de datos' });
    }

    const ServicioToUpdate = await Servicio.findByPk(id_Servicio);

    if (!ServicioToUpdate) {
      return res.status(404).send('Servicio no encontrado');
    }

    // Actualizar los campos del Servicio
    ServicioToUpdate.precio = precio
    ServicioToUpdate.nombre = nombre;
    ServicioToUpdate.estado = estado;
    
    // Guardar los cambios en la base de datos
    await ServicioToUpdate.save();

    return res.status(200).json(ServicioToUpdate);
  } catch (error) {
    console.error(error);
    console.log("")
    return res.status(500).send('Error al actualizar el servicio');
  }
}
// fin de actualizar

// traer informacion para actualizar
async function listarporid(req, res){
  try {
    const servicioId = req.params.id;
    const servicioGet = await Servicio.findByPk(servicioId);

    if (servicioGet) {
      res.json(servicioGet);
    } else {
      res.status(404).json({ message: 'servicio no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
}

async function desactivarServicio(req, res) {
  try {
      const { id_Servicio } = req.params;
      const servicio = await Servicio.findByPk(id_Servicio);
      if (!servicio) {
          return res.status(404).json({ error: 'servicio no encontrado' });
      }

      // Actualiza el estado del servicio a "deshabilitado" (false)
      await servicio.update({ estado: false });

      res.status(200).json({ message: 'servicio deshabilitado exitosamente' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al deshabilitar servicio' });
  }
}

async function activarServicio(req, res) {
  try {
      const { id_Servicio } = req.params;
      const servicio = await Servicio.findByPk(id_Servicio);
      if (!servicio) {
          return res.status(404).json({ error: 'servicio no encontrado' });
      }
      await servicio.update({ estado: true });

      res.status(200).json({ message: 'servicio habilitado exitosamente' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al habilitar servicio' });
  }
}

async function eliminarServicio(req, res) {
  try {
      const { id_Servicio } = req.params;
      const servicio = await  Servicio.findByPk(id_Servicio);

      if (!servicio) {
          return res.status(404).json({ error: 'Servicio no encontrado' });
      }

    // Elimina el servicio
      await servicio.destroy();

      res.json({ message: 'Servicio eliminado exitosamente' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar servicio' });
  }
}


module.exports = {
  listarServicio,
  crearServicio,
  actualizarServicio,
  activarServicio,
  listarporid,
  eliminarServicio,
  desactivarServicio,
};
