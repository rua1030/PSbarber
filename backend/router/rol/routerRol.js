const Router=require("express").Router()
const rolController=require("../../controllers/rol/controllerRol")

Router.get("/", rolController.listarRol)


module.exports=Router;