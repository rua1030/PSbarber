const Agenda = require("../../models/agenda/modelAgenda");
const Empleado = require("../../models/empleado/modelEmpleado")
const Cliente = require("../../models/clientes/modelClientes")
const DetalleServicio = require("../../models/agenda/modelDetalleServicio")
const sequelize=require("../../database/db");
const { Op, and } = require("sequelize");

async function listarCitas(req, res) {
  try {
    const agendaConCliente = await Agenda.findAll({
      include: [
        {
          model: Cliente,
          attributes: ["nombre", "apellidos", "telefono"],
        },
      ],
      attributes: [
        "id_Agenda",
        "fecha",
        "hora",
        "estado",
        "estado_Pago"
      ],
    });

    res.json(agendaConCliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Hubo un error al obtener la agenda con los clientes" });
  }
}



      async function createCita(req, res) {
        const dataCita = req.body;
        const t = await sequelize.transaction();

        try {
            // Verificar si el cliente con el documento existe
            const existingCliente = await Cliente.findOne({
                where: {
                    documento: dataCita.documento
                },
            });

            if (!existingCliente) {
                return res.status(404).json({ error: "Cliente no encontrado. Debe registrarse primero." });
            }

            // Verificar si el empleado con el ID existe
            const existingEmpleado = await Empleado.findByPk(dataCita.id_Empleado);

            if (!existingEmpleado) {
                return res.status(404).json({ error: "Empleado no encontrado. Proporcione un ID de Empleado válido." });
            }

            // Verificar si la fecha de la cita ya existe
            const existingCitaFecha = await Agenda.findOne({
                where: {
                    fecha: dataCita.fecha
                },
            });

            // Verificar si la hora de la cita ya existe
            const existingCitaHora = await Agenda.findOne({
                where: {
                    hora: dataCita.hora
                },
            });

            if (existingCitaFecha && existingCitaHora) {
                return res.status(400).json({ error: "Esta fecha y hora no está disponible" });
            }

            // Crear la cita
            const cita = await Agenda.create({
                fecha: dataCita.fecha,
                hora: dataCita.hora,
                id_Empleado: dataCita.id_Empleado,
                documento: dataCita.documento,
                estado: 1,
                estado_pago:1,
            }, { transaction: t });

            // Verificar y crear los detalles de servicio
            if (dataCita.servicios && Array.isArray(dataCita.servicios)) {
                const promises = dataCita.servicios.map(async (servicio) => {
                    await DetalleServicio.create({
                        id_Agenda: cita.id_Agenda,
                        id_Servicio: servicio.id_Servicio,
                    }, { transaction: t });
                });

                await Promise.all(promises);
            }

            // Confirmar la transacción
            await t.commit();

            // Enviar la respuesta con la cita creada
            res.status(201).json(cita);
        } catch (error) {
            // Revertir la transacción en caso de error
            await t.rollback();

            console.error(error);

            if (error.name === 'SequelizeForeignKeyConstraintError') {
                return res.status(400).json({ error: 'ID de Empleado no válido. Verifique la existencia del Empleado.' });
            }

            return res.status(500).json({ error: 'Error al crear la cita', message: error.message });
        }
    }


// traer informacion para actualizar
async function listarPorIdCita(req, res){
  try {
    const CitaId = req.params.id;
    const cita = await Agenda.findByPk(CitaId);

    if (cita) {
      res.json(cita);
    } else {
      res.status(404).json({ message: 'Cita no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
}

// actualizar empleado
async function actualizarCita(req, res) {
  const { id_Agenda } = req.params;
  const {
    nombre,
    correo,
    telefono,
    fecha,
    hora,
    id_Empleado,
  } = req.body;

  try {
  // Verificar si la fecha de la cita ya existe
  const existingCitaFecha = await Agenda.findOne({
    where: {
      fecha,
    id_Agenda: { [Op.ne]: id_Agenda }
    },
  });

  // Verificar si la hora de la cita ya existe
  const existingCitaHora = await Agenda.findOne({
    where: {
    hora,
    id_Agenda: { [Op.ne]: id_Agenda }
    },
  });

  if (existingCitaFecha && existingCitaHora) {
    return res.status(400).json({ error: "Este horario no esta disponible" });
  }
  console.log("este es el json",body)
    const citaToUpdate = await Agenda.findByPk(id_Agenda);

    if (!citaToUpdate) {
      return res.status(404).send('Cita no encontrada');
    }

    // Actualizar los campos de la cita
    citaToUpdate.nombre = nombre;
    citaToUpdate.correo = correo;
    citaToUpdate.telefono = telefono;
    citaToUpdate.fecha = fecha;
    citaToUpdate.hora = hora;
    citaToUpdate.id_Empleado = id_Empleado;

    // Guardar los cambios en la base de datos
    await citaToUpdate.save();

    return res.status(200).json(citaToUpdate);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error al actualizar la cita');
  }
}

async function desactivarCita(req, res) {
  try {
      const { id_Agenda } = req.params;
      const cita = await Agenda.findByPk(id_Agenda);
      if (!cita) {
          return res.status(404).json({ error: 'Cita no encontrada' });
      }
      // Actualiza el estado de la cita a "deshabilitado" (false)
      await cita.update({ estado: false });

      res.status(200).json({ message: 'Cita deshabilitada exitosamente' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al deshabilitar la cita' });
  }
}

async function activarCita(req, res) {
  try {
      const { id_Agenda } = req.params;
      const cita = await Agenda.findByPk(id_Agenda);
      if (!cita) {
          return res.status(404).json({ error: 'Cita no encontrada' });
      }
      await cita.update({ estado: true });

      res.status(200).json({ message: 'Cita habilitada exitosamente' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al habilitar la cita' });
  }
}

// Función para obtener horas reservadas desde la base de datos
async function obtenerHorasReservadasEnBackend(fecha) {
  try {
      const horasReservadas = await Agenda.findAll({
          attributes: ['hora'],
          where: {
              fecha: fecha,
              estado: 1
          }
      });

      // Extraer las horas reservadas como un array de strings
      const horasReservadasArray = horasReservadas.map(reserva => reserva.hora);

      return horasReservadasArray;
  } catch (error) {
      console.error("Error al obtener horas reservadas desde la base de datos:", error);
      throw error;
  }
}

// Controlador para obtener horas disponibles
async function obtenerHorasDisponibles (req, res){
  try {
      const { fecha } = req.params; // Suponiendo que la fecha viene en los parámetros de la solicitud

      // Obtener todas las horas disponibles
      const todasLasHoras = ['07:00AM','08:00AM', '09:00AM', '10:00AM', '11:00AM', '12:00PM', '1:00PM', '2:00PM', '3:00PM', '4:00PM', '5:00PM','6:00PM','7:00PM'];

      // Obtener las horas ya reservadas desde la base de datos
      const horasReservadas = await obtenerHorasReservadasEnBackend(fecha);

      // Filtrar las horas disponibles excluyendo las horas reservadas
      const horasDisponibles = todasLasHoras.filter(hora => !horasReservadas.includes(hora));

      // Enviar las horas disponibles como respuesta
      res.json({ horasDisponibles });
  } catch (error) {
      console.error("Error general al obtener horas disponibles:", error);
      res.status(500).json({ error: "Error al obtener horas disponibles" });
  }
};

async function obtenerInfoClientePorDocumento(req, res) {
  try {
    const { documento } = req.params;

    // Buscar el cliente por documento
    const cliente = await Cliente.findOne({
      where: {
        documento: documento,
      },
      attributes: ['nombre', 'telefono', 'email', /* Otros campos que necesitas */],
    });

    if (cliente) {
      res.status(200).json(cliente);
    } else {
      res.status(404).json({ error: 'Cliente no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener información del cliente:', error);
    res.status(500).json({ error: 'Error al obtener información del cliente' });
  }
}

module.exports = {
  listarCitas,
  createCita,
  listarPorIdCita,
  actualizarCita,
  desactivarCita,
  activarCita,
  obtenerHorasDisponibles,
  obtenerInfoClientePorDocumento
};