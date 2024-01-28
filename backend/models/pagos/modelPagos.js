const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../database/db");
const agenda = require("../agenda/modelAgenda");

const pagos = sequelize.define('pagos', {
    id_Pago: {  
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    fecha_pago: DataTypes.DATE, 
    monto: DataTypes.INTEGER,
},{
    timestamps: false // Desactiva las columnas createdAt y updatedAt
});

Empleado.belongsTo(agenda, { foreignKey: 'id_agenda' });

module.exports = pagos;