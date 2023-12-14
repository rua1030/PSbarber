const Router=require("express").Router()
const empleadoController=require("../../controllers/Empleado/controllerEmpleado")

Router.get("/", empleadoController.listarEmpleado)
Router.post("/create", empleadoController.crearEmpleado)
Router.put("/update/:id_Empleado", empleadoController.actualizarEmpleado)
Router.get("/:id", empleadoController.listarporid);
Router.put("/disable/:id_Empleado", empleadoController.desactivarEmpleado)
Router.put("/activate/:id_Empleado", empleadoController.activarEmpleado)
Router.delete("/delete/:id_Empleado", empleadoController.eliminarEmpleado)
Router.post("/login/", empleadoController.login)
// Router.post("/cambiarcontrasena", empleadoController.enviarEmail)
Router.post("/enviaremail/", empleadoController.enviarEmail)

module.exports=Router;
