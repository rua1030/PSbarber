const Pagos = require("../../models/pagos/modelPagos");
const Agenda = require("../../models/agenda/modelAgenda");
const Detalle_servicios=require("../../models/agenda/modelDetalleServicio")
const Servicio=require("../servicio/controllerServicio") 
const Cliente=require("../cliente/controllerCliente")
const Empleado=require("../Empleado/controllerEmpleado")

async function listarPagos(req, res) {
    try {
      const pagoContodo = await Pagos.findAll({
        include: [
          {
            model:Agenda,
            attributes: ["fecha"],
          },
          {
            model:Cliente,
            attributes: ["nombre"],
          },
          {
            model:Empleado,
            attributes: ["nombre"],
          },
          {
            model:Servicio,
            attributes: ["nombre"],
          },
        ],
        attributes: [
          "id_Pago",
          "fecha_pago",
          "monto",
          "id_agenda",
        ],
      });
      res.json(pagoContodo);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Hubo un error al obtener los pagos con toda la info" });
    }
  }