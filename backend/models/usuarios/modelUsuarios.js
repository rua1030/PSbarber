const {DataTypes, Model}=require("sequelize")
const sequelize=require("../../database/db")
const Rol = require("../rol/modelRol")

const Usuario=sequelize.define('usuarios',{
    id_Usuario:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    },
  nombres:DataTypes.STRING,
  pass:DataTypes.STRING,
  email:DataTypes.STRING,
  estado:DataTypes.BOOLEAN,
  id_Rol:DataTypes.STRING,
},{
  timestamps: false // Desactiva las columnas createdAt y updatedAt
  }
)
Usuario.belongsTo(Rol, { foreignKey: 'id_Rol' });
module.exports=Usuario;
