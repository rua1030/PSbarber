const Router=require("express").Router()
const agendaController=require("../../controllers/agenda/controllerAgenda")

Router.get("/", agendaController.listarCitas)
Router.post("/create",agendaController.createCita)
Router.put("/update/:id_Agenda", agendaController.actualizarCita)
Router.get("/:id", agendaController.listarPorIdCita);
Router.put("/disable/:id_Agenda", agendaController.desactivarCita)
Router.put("/activate/:id_Agenda", agendaController.activarCita)
Router.get('/obtenerHorasDisponibles/:fecha', agendaController.obtenerHorasDisponibles);

module.exports=Router;