const Tipo_empleado=require("../../models/tipo_empleado/modelTipoEmpleado")

async function listarTipo_empleado(req, res){

    try {
        const tipo_empleado = await Tipo_empleado.findAll();
        res.json(tipo_empleado);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener roles' });
      }
    }

    module.exports={
        listarTipo_empleado
    }