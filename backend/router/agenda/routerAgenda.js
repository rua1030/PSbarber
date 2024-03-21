const Router=require("express").Router()
const agendaController=require("../../controllers/agenda/controllerAgenda")

Router.get("/", agendaController.listarCitas)
Router.get("/finalizada",agendaController.listarCitasEstadoPago);
Router.post("/create",agendaController.createCita)
Router.put("/update/:id_Agenda", agendaController.actualizarCita)
Router.get("/:id", agendaController.listarPorIdCita);
Router.put("/disable/:id_Agenda", agendaController.desactivarCita)
Router.put("/activate/:id_Agenda", agendaController.activarCita)
Router.get('/obtenerHorasDisponibles/:fecha', agendaController.obtenerHorasDisponibles);
Router.get('/obtenerDatosClientes/:documento', agendaController.obtenerInfoClientePorDocumento);
Router.get('/citaExitosa/:id_Agenda', agendaController.buscarCitaConClientePorId);
Router.put("/disablePago/:id_Agenda", agendaController.desactivarEstadoPago);
Router.put("/activatePago/:id_Agenda", agendaController.activarEstadoPago);


module.exports=Router;          