const Router=require("express").Router()
const clienteController=require("../../controllers/cliente/controllerCliente")

Router.get("/", clienteController.listarCliente)
Router.post("/create",clienteController.crearCliente)
Router.put("/update/:id_Cliente", clienteController.actualizarCliente)
Router.get("/:id",clienteController.listarporid)
Router.put("/disable/:id_Cliente", clienteController.desactivarCliente)
Router.put("/activate/:id_Cliente", clienteController.activarCliente)
Router.delete("/delete/:id_Cliente", clienteController.eliminarCliente)

module.exports=Router;
