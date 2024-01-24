const {DataTypes, Model}=require("sequelize")
const sequelize=require("../../database/db")

const Servicio=sequelize.define('servicios',{
    id_Servicio:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
    },
    precio:DataTypes.INTEGER,
    nombre:DataTypes.STRING,
    estado:DataTypes.BOOLEAN
},{
  timestamps: false // Desactiva las columnas createdAt y updatedAt
}
)
module.exports=Servicio
