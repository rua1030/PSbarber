const Router=require("express").Router()
const Tipo_EmpleadoController=require("../../controllers/Tipo_Empleado/controllerTipo_Empleado")

Router.get("/", Tipo_EmpleadoController.listarTipo_empleado)

module.exports=Router;