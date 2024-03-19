const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../database/db");
const Rol = require("../rol/modelRol");
const Tipo_empleado = require('../tipo_empleado/modelTipoEmpleado');

const Empleado = sequelize.define('empleados', {
    id_Empleado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    nombre: DataTypes.STRING, // Ajusta aquí para que coincida con la base de datos
    apellidos: DataTypes.STRING,
    telefono: DataTypes.STRING,
    tipo_documento: DataTypes.STRING,
    documento: DataTypes.STRING,
    email: DataTypes.STRING,
    estado: DataTypes.BOOLEAN,
    id_Tipo_Empleado: DataTypes.INTEGER,
    contrasena:DataTypes.STRING,
},{
    timestamps: false // Desactiva las columnas createdAt y updatedAt
});

Empleado.belongsTo(Tipo_empleado, { foreignKey: 'id_Tipo_Empleado' });

module.exports = Empleado;
