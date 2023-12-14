const {DataTypes, Model}=require("sequelize")
const sequelize=require("../../database/db")
const Rol = require("./modelRol");
const Permiso = require("../permisos/modelPermiso");

const RolXPermiso=sequelize.define('rol_permisos',{
    id_rol_permiso:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    id_rol:DataTypes.INTEGER,
    id_Permiso: DataTypes.INTEGER 
},{
    timestamps: false // Desactiva las columnas createdAt y updatedAt
  }
)
RolXPermiso.belongsTo(Rol, { foreignKey: 'id_Rol' });
RolXPermiso.belongsTo(Permiso, { foreignKey: 'id_Permiso' });


module.exports = RolXPermiso