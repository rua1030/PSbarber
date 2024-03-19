const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../database/db");
const Rol = require("./modelRol");
const Permiso = require("../permisos/modelPermiso");
const Empleado = require("../empleado/modelEmpleado");

const RolXPermiso = sequelize.define('rol_permisos', {
    id_Rol_Permiso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_Rol: DataTypes.INTEGER,
    id_Permiso: DataTypes.INTEGER,
    id_Empleado: DataTypes.INTEGER
}, {
    timestamps: false // Desactiva las columnas createdAt y updatedAt
});

RolXPermiso.belongsTo(Rol, { foreignKey: 'id_Rol', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
RolXPermiso.belongsTo(Permiso, { foreignKey: 'id_Permiso', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
RolXPermiso.belongsTo(Empleado, { foreignKey: 'id_Empleado', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = RolXPermiso;
