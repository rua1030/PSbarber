const Rol=require("../../models/rol/modelRol")
const sequelize=require("../../database/db");
const RolXPermiso = require("../../models/rol/modelRolxPermiso");
const Permiso = require("../../models/permisos/modelPermiso");
const { Sequelize } = require("sequelize");


async function listarRolEmpleado(req, res){

    try {
        const rol = await Rol.findAll();
        res.json(rol);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener roles' });
      }
    }


async function listarRol(req, res) {
  try {
    const query = `
      SELECT
        r.id_rol,
        r.nombre AS nombre_rol,
        r.estado AS estado_rol,
        GROUP_CONCAT(p.nombre ORDER BY p.id_Permiso) AS permisos
      FROM
        rol_permisos rp
      LEFT JOIN
        permisos p ON rp.id_Permiso = p.id_Permiso
      LEFT JOIN
        rols r ON rp.id_rol = r.id_rol
      GROUP BY
        r.id_rol;
    `;

    const rolesConPermisos = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

    res.json(rolesConPermisos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener roles con permisos' });
  }
} 
    async function createRol(req, res) {
      const dataRol = req.body;
      const t = await sequelize.transaction();
  
      try {
          const rol = await Rol.create({
              nombre: dataRol.nombre,
              estado: 1,
          }, { transaction: t });
  
          // Verifica si se proporciona un array de permisos en dataRol
          if (dataRol.permisos && Array.isArray(dataRol.permisos)) {
              const promises = dataRol.permisos.map(async (permiso) => {
                  await RolXPermiso.create({
                      id_rol: rol.id_Rol,  // Utiliza el id_Rol recién creado
                      id_Permiso: permiso.id_Permiso,
                  }, { transaction: t });
              });
  
              await Promise.all(promises);
          }
  
          await t.commit();
          res.status(201).json(rol);
      } catch (error) {
          await t.rollback();
          console.error(error);
          res.status(500).json({ error: 'Error al crear rol' });
      }
  }
  

    async function desactivarRol(req, res) {
      try {
          const { id_Rol } = req.params;
          const rol = await Rol.findByPk(id_Rol);
          if (!rol) {
              return res.status(404).json({ error: 'Rol no encontrado' });
          }
          // Actualiza el estado del rol a "deshabilitado" (false)
          await rol.update({ estado: false });
    
          res.status(200).json({ message: 'Rol deshabilitado exitosamente' });
      } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Error al deshabilitar rol' });
      }
    }
    
    async function activarRol(req, res) {
      try {
          const { id_Rol } = req.params;
          const rol = await Rol.findByPk(id_Rol);
          if (!rol) {
              return res.status(404).json({ error: 'Rol no encontrado' });
          }
          await rol.update({ estado: true });
    
          res.status(200).json({ message: 'Rol habilitado exitosamente' });
      } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Error al habilitar rol' });
      }
    }
    

    module.exports={
        listarRol,
        createRol,
        desactivarRol,
        activarRol,
        listarRolEmpleado
    }