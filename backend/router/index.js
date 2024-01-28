const Empleado=require("../router/empleado/routerEmpleado")
const Rol=require("../router/rol/routerRol")
const Tipo_Empleado=require("../router/Tipo_Empleado/routerTIpo_Empleado")
const Cliente=require("../router/cliente/routerCliente")
const Servicio=require("../router/sevicio/routerServicio")
const Agenda=require("../router/agenda/routerAgenda")

function responsiveApi(app){
app.use("/empleado", Empleado)
app.use("/rol", Rol)
app.use("/Tipo_Empleado",Tipo_Empleado)
app.use("/cliente",Cliente)
app.use("/servicio",Servicio)
app.use("/agenda",Agenda)
}
module.exports=responsiveApi;