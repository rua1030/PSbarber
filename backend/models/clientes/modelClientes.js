const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../database/db");

const Cliente = sequelize.define('clientes', {
    documento: {
        type: DataTypes.STRING,
        primaryKey: true,
         // Se añade autoincremento para las claves primarias
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false, // Hace que el nombre sea obligatorio
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false, // Hace que los apellidos sean obligatorios
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true, // Ajusta según tus requerimientos
    },
    tipo_documento: {
        type: DataTypes.STRING,
        allowNull: true, // Ajusta según tus requerimientos
    },
    email:{
        type: DataTypes.STRING,
        allowNull: true, // Ajusta según tus requerimientos
        unique: true, // Asegura que el correo electrónico sea único
        validate: {
        isEmail: true, // Valida que el campo sea un correo electrónico válido
        },
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false, // Ajusta según tus requerimientos
        defaultValue: true, // Puedes ajustar el valor predeterminado según tus requerimientos
    },
}, {
    timestamps: false // Desactiva las columnas createdAt y updatedAt
});

module.exports = Cliente;
