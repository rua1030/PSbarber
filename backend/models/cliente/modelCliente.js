const {DataTypes, Model}=require("sequelize");
const sequelize=require('../../database/database');

       // Modelo del cliente donde utilizamos una constante que va a definir los valores de la tabla
       const Cliente=sequelize.define('clientes',{
                id_Cliente:{
                type:DataTypes.INTEGER,
                primaryKey:true,
                },
              nombre:DataTypes.STRING,
              apellidos:DataTypes.STRING,
              telefono:DataTypes.STRING,
              tipo_documento:DataTypes.STRING,
              documento:DataTypes.STRING,
              email:DataTypes.STRING,
              estado:DataTypes.BOOLEAN
       },{
              timestamps: false // Desactiva las columnas createdAt y updatedAt
            }
       )
       


       
module.exports=Cliente;