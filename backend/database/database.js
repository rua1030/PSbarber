// Creamos la constante que se va a cargar con el paquete de sequelize
const {Sequelize} = require("sequelize")

// Se crea la conexión con la base de datos en la constante sequelize
const sequelize = new Sequelize("ps_barber", "root", "", {
    host:"localhost",
    dialect:"mysql"
    
})


// Función para autenticarse con la base de datos usando la constante de sequelize
async function conexion(){
try{
    await sequelize.authenticate();
    console.log("Conexion Exitosa")
}catch(error){
 console.log("Hay un error", error)
}
}

conexion()

module.exports=sequelize;