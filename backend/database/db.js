const {Sequelize} = require("sequelize")

const sequelize = new Sequelize("ps_barber", "root", "", {
    host:"localhost",
    dialect:"mysql"
})

async function conexion(){
try{
    await sequelize.authenticate();
    console.log("Conexion Exitosa")
}catch(error){
 console.log("Tenemos un error", error)
}
}

conexion()

module.exports=sequelize;