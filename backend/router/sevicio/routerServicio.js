const Router=require("express").Router()
const servicioController=require("../../controllers/servicio/controllerServicio")

Router.get("/", servicioController.listarServicio)
Router.post("/create",servicioController.crearServicio)
Router.put("/update/:id_Servicio", servicioController.actualizarServicio)
Router.get("/:id",servicioController.listarporid)
Router.put("/disable/:id_Servicio", servicioController.desactivarServicio)
Router.put("/activate/:id_Servicio", servicioController.activarServicio)
Router.delete("/delete/:id_Servicio", servicioController.eliminarServicio)

module.exports=Router;
