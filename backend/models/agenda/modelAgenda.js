const {DataTypes, Model}=require("sequelize")
const sequelize=require("../../database/db")
const Empleado = require("../empleado/modelEmpleado");
const Cliente = require("../clientes/modelClientes");

const Agenda=sequelize.define('agendas',{
    id_Agenda:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    fecha:DataTypes.STRING,
    hora:DataTypes.STRING,
    estado:DataTypes.BOOLEAN,
    id_Empleado: DataTypes.INTEGER,
    documento: DataTypes.STRING,
    estado_Pago:DataTypes.BOOLEAN
},{
    timestamps: false // Desactiva las columnas createdAt y updatedAt
  }
)

Agenda.belongsTo(Cliente, { foreignKey: 'documento' });
Agenda.belongsTo(Empleado, { foreignKey: 'id_Empleado' });


module.exports = Agenda