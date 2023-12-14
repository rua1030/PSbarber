const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../database/db");

const Cliente = sequelize.define('clientes', {

    id_Cliente: {
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
},{
    timestamps: false // Desactiva las columnas createdAt y updatedAt
});
module.exports = Cliente;
