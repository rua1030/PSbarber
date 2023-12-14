const Permiso=require("../../models/permisos/modelPermiso")

async function listarPermiso(req, res){
    try {
        const permiso = await Permiso.findAll();
        res.json(permiso);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los permisos' });
      }
    }
module.exports={
listarPermiso
}    