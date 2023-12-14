const {DataTypes, Model}=require("sequelize")
const sequelize=require("../../database/db")

const Permiso=sequelize.define('permisos',{
    id_Permiso:{
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
module.exports=Permiso
