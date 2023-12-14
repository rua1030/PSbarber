const {DataTypes, Model}=require("sequelize")
const sequelize=require("../../database/db")
const Rol=sequelize.define('rols',{
    id_Rol:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
    },
  nombre:DataTypes.STRING,
  estado:DataTypes.BOOLEAN
},{
  timestamps: false // Desactiva las columnas createdAt y updatedAt
}
)

module.exports=Rol
