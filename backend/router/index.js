const Empleado=require("../router/empleado/routerEmpleado")
const Rol=require("../router/rol/routerRol")
const Tipo_Empleado=require("../router/Tipo_Empleado/routerTIpo_Empleado")
const Cliente=require("../router/cliente/routerCliente")
const Servicio=require("../router/sevicio/routerServicio")
function responsiveApi(app){
app.use("/empleado", Empleado)
app.use("/rol", Rol)
app.use("/Tipo_Empleado",Tipo_Empleado)
app.use("/cliente",Cliente)
app.use("/servicio",Servicio)
}
module.exports=responsiveApi;