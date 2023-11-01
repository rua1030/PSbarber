const Router = require("express").Router()
const barberoController = require("../../controllers/barbero/controllerBarbero")

Router.get("/", barberoController.listarBarberos);
Router.post("/create", barberoController.crearBarbero);
Router.put("/update/:id", barberoController.actualizarBarbero)
Router.put("/disable/:id", barberoController.desactivarBarbero)
Router.put("/activate/:id", barberoController.activarBarbero)
Router.delete("/delete/:id", barberoController.eliminarBarbero)
module.exports = Router