const {DataTypes, Model}=require("sequelize")
const sequelize=require("../../database/db")
const Empleado = require("../empleado/modelEmpleado");

const Agenda=sequelize.define('agendas',{
    id_Agenda:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombre:DataTypes.STRING,
    correo:DataTypes.STRING,
    telefono:DataTypes.STRING,
    fecha:DataTypes.STRING,
    hora:DataTypes.TIME,
    estado:DataTypes.BOOLEAN,
    id_Empleado: DataTypes.INTEGER 
},{
    timestamps: false // Desactiva las columnas createdAt y updatedAt
  }
)
Agenda.belongsTo(Empleado, { foreignKey: 'id_Empleado' });


module.exports = Agenda