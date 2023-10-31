const Usuario=require("../router/usuario/routerUsuario")
const Rol=require("../router/rol/routerRol")

function resApi(app){
app.use("/usuario", Usuario)
app.use("/rol", Rol)
}

module.exports=resApi;