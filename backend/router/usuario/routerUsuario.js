const Router=require("express").Router()
const UsuarioController=require("../../controllers/usuario/controllerUsuario")

Router.get("/", UsuarioController.listarUsuario)
Router.post("/create", UsuarioController.crearUsuario)
Router.put("/update/:id", UsuarioController.actualizarUsuario)
Router.put("/cambiar/:id", UsuarioController.actualizarEstado)
Router.post("/login/", UsuarioController.login)

module.exports=Router;