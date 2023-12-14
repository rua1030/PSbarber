const {DataTypes, Model}=require("sequelize")
const sequelize=require("../../database/db")

const Tipo_empleado=sequelize.define('tipo_empleados',{
    id_Tipo_Empleado:{
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
module.exports=Tipo_empleado
