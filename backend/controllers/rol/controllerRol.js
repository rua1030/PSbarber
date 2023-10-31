const Rol=require("../../models/rol/modelRol")

async function listarRol(req, res){

    try {
        const rol = await Rol.findAll();
        res.json(rol);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener roles' });
      }
    }

    module.exports={
        listarRol
    }