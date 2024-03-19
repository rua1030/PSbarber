const Router=require("express").Router()
const clienteController=require("../../controllers/cliente/controllerCliente")

Router.get("/", clienteController.listarCliente)
Router.post("/create",clienteController.crearCliente)
Router.put("/update/:id_Cliente", clienteController.actualizarCliente)
Router.get("/:id",clienteController.listarporid)
Router.put("/disable/:documento", clienteController.desactivarCliente)
Router.put("/activate/:documento", clienteController.activarCliente)
Router.delete("/delete/:documento", clienteController.eliminarCliente)

module.exports=Router;
