const {DataTypes, Model}=require("sequelize")
const sequelize=require("../../database/db")
const Agenda = require("./modelAgenda");
const Servicio = require("../servicio/modelServicio");

const DetalleServicio=sequelize.define('detalle_servicios',{
    id_Detalle_Servicio:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    id_Servicio:DataTypes.INTEGER,
    id_Agenda: DataTypes.INTEGER 
},{
    timestamps: false // Desactiva las columnas createdAt y updatedAt
  }
)
DetalleServicio.belongsTo(Servicio, { foreignKey: 'id_Servicio' });
DetalleServicio.belongsTo(Agenda, { foreignKey: 'id_Agenda' });


module.exports = DetalleServicio