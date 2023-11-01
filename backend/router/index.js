const Usuario=require("../router/usuario/routerUsuario")
const Rol=require("../router/rol/routerRol")
const Barbero=require("../router/barbero/routerBarbero")

function responsiveApi(app){
app.use("/usuario", Usuario)
app.use("/rol", Rol)
app.use("/barbero",Barbero)
}

module.exports=responsiveApi;