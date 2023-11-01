const Router=require("express").Router()
const clienteController=require("../../controllers/cliente/controllerCliente")



// Las rutas de cliente

// Ruta de listar clientes
Router.get("/", clienteController.listarCliente);

// Ruta para crear cliente
Router.post("/create", clienteController.crearCliente);

// Ruta para actualizar cliente
Router.put("/update/:id", clienteController.actualizarCliente);

// Ruta para eliminar cliente
Router.delete("/delete/:id", clienteController.eliminarCliente);



module.exports=Router;