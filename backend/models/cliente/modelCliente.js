const {DataTypes, Model}=require("sequelize")
const sequelize=require('../../database/database')


       const Cliente=sequelize.define('cliente',{
                id_Cliente:{
                type:DataTypes.INTEGER,
                primaryKey:true,
                },
              nombre:DataTypes.STRING,
              telefono:DataTypes.STRING,
              documento:DataTypes.STRING,
              email:DataTypes.STRING,
              estado:DataTypes.BOOLEAN
       },{
              timestamps: false // Desactiva las columnas createdAt y updatedAt
            }
       )
       


       
module.exports=Cliente;