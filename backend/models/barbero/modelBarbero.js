const {DataTypes, Model}=require("sequelize")
const sequelize=require("../../database/db")

const Rol=sequelize.define('barberos',{
    id_Barbero:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
    },
  nombre:DataTypes.STRING,
  telefono:DataTypes.STRING,
  documento:DataTypes.STRING,
  email:DataTypes.STRING,
  estado:DataTypes.BOOLEAN
},{
  timestamps: false // Desactiva las columnas createdAt y updatedAt
}
)
module.exports=Rol