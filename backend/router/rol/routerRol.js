const Router=require("express").Router()
const rolController=require("../../controllers/rol/controllerRol")
const permisoController=require("../../controllers/permiso/controllerPermiso")

Router.get("/", rolController.listarRol)
Router.get("/empleado", rolController.listarRolEmpleado)
Router.post("/create", rolController.createRol)
Router.put("/disable/:id_Rol", rolController.desactivarRol)
Router.put("/activate/:id_Rol", rolController.activarRol)
Router.get("/permiso", permisoController.listarPermiso)



module.exports=Router;