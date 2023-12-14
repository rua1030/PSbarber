const Router=require("express").Router()
const clienteController=require("../../controllers/cliente/controllerCliente")

Router.get("/", clienteController.listarCliente)
Router.post("/create",clienteController.crearCliente)
Router.put("/update/:id_Cliente", clienteController.actualizarCliente)
Router.get("/:id",clienteController.listarporid);
// Router.put("/disable/:id_Empleado", clienteController.desactivarEmpleado)
// Router.put("/activate/:id_Empleado", clienteController.activarEmpleado)
// Router.delete("/delete/:id_Empleado", clienteController.eliminarEmpleado)
module.exports=Router;
