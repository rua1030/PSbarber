const Rol=require("../../models/rol/modelRol")
const sequelize=require("../../database/db");
const RolXPermiso = require("../../models/rol/modelRolxPermiso");
const Permiso = require("../../models/permisos/modelPermiso");
const { Sequelize } = require("sequelize");
const Empleado = require("../../models/empleado/modelEmpleado");


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
        GROUP_CONCAT(DISTINCT p.nombre ORDER BY p.id_Permiso) AS permisos,
        GROUP_CONCAT(DISTINCT e.nombre ORDER BY e.id_empleado) AS empleados
    FROM 
        rol_permisos rp
    LEFT JOIN 
        permisos p ON rp.id_Permiso = p.id_Permiso
    LEFT JOIN 
        empleados e ON rp.id_empleado = e.id_empleado
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
    

// async function createRol(req, res) {
//     const dataRol = req.body;
//     const t = await sequelize.transaction();
  
//     try {
//       const rol = await Rol.create({
//         nombre: dataRol.nombre,
//         estado: 1,
//       }, { transaction: t });
  
//       // Verifica si se proporciona un array de permisos en dataRol
//       if (dataRol.permisos && Array.isArray(dataRol.permisos)) {
//         const promisesPermisos = dataRol.permisos.map(async (permiso) => {
//           await RolXPermiso.create({
//             id_rol: rol.id_Rol,
//             id_Permiso: permiso.id_Permiso,
//           }, { transaction: t });
//         });
  
//         await Promise.all(promisesPermisos);
//       }
    
//       // Verifica si se proporciona un array de empleados en dataRol
//       if (dataRol.empleados && Array.isArray(dataRol.empleados)) {
//         const promisesEmpleados = dataRol.empleados.map(async (empleado) => {
//           await RolXEmpleado.create({
//             id_rol: rol.id_Rol,
//             id_Empleado: empleado.id_Empleado,
//           }, { transaction: t });
//         });
  
//         await Promise.all(promisesEmpleados);
//       }
  
//       await t.commit();
//       res.status(201).json(rol);
//     } catch (error) {
//       await t.rollback();
//       console.error(error);
//       res.status(500).json({ error: 'Error al crear rol' });
//     }
//   }

// Asegúrate de ajustar la ruta según tu estructura de archivos

async function createRol(req, res) {
    const dataRol = req.body;

    try {
        // Validaciones de datos de entrada
        if (!dataRol.nombre || !Array.isArray(dataRol.permisos) || !Array.isArray(dataRol.empleados)) {
            return res.status(400).json({ error: 'Datos de entrada incorrectos' });
        }

        // Crear el rol
        const rol = await Rol.create({
            nombre: dataRol.nombre,
            estado: true,
        });

        // Asigna permisos al rol
        await Promise.all(dataRol.permisos.map(async (idPermiso) => {
            await RolXPermiso.create({
                id_rol: rol.id_Rol,
                id_Permiso: idPermiso,
            });
        }));

        // Asigna empleados al rol
        await Promise.all(dataRol.empleados.map(async (idEmpleado) => {
            await RolXPermiso.create({
                id_rol: rol.id_Rol,
                id_Empleado: idEmpleado,
            });
        }));

        res.status(201).json(rol);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear rol' });
    }
}


// async function createRol(req, res) {
//     const dataRol = req.body;
//     const t = await sequelize.transaction();

//     try {
//         // Crear el rol
//         const rol = await Rol.create({
//             nombre: dataRol.nombre,
//             estado: true, // Ajusta según tus necesidades
//         }, { transaction: t });

//         // Verifica si se proporciona un array de empleados y permisos en dataRol
//         if (Array.isArray(dataRol.empleados) && Array.isArray(dataRol.permisos)) {
//             // Asigna permisos al rol
//             const promisesPermisos = dataRol.permisos.map(async (id_Permiso) => {
//                 await RolXPermiso.create({
//                     id_Rol: rol.id_Rol,
//                     id_Permiso: id_Permiso,
//                     id_Empleado: [52,53,54]
//                 }, { transaction: t });
//             });

//             await Promise.all(promisesPermisos);

//             // Asigna empleados al rol
//             const promisesEmpleados = dataRol.empleados.map(async (idEmpleado) => {
//                 await RolXPermiso.create({
//                     id_rol_permiso: rol.id_Rol,
//                     id_Rol: rol.id_Rol,
//                     id_Empleado:  [52, 53, 54] ,
//                 }, { transaction: t });
//             });

//             await Promise.all(promisesEmpleados);
//         }

//         await t.commit();
//         res.status(201).json(rol);
//     } catch (error) {
//         await t.rollback();
//         console.error(error);
//         res.status(500).json({ error: 'Error al crear rol' });
//     }
// }

async function createRol(req, res) {
    const dataRol = req.body;
    try {
      const t = await sequelize.transaction();
      try {
        // Insertar el rol
        const rol = await Rol.create({
          nombre: dataRol.nombre,
          estado: 1,
          // Otras propiedades del rol
        }, { transaction: t });
        console.log("no entro_______-",dataRol)
        // Verifica si se proporciona un array de permisos en dataRol
        if (dataRol.permisos && Array.isArray(dataRol.permisos)) {
            
          // Insertar los permisos asociados al rol en la tabla RolXPermiso
          for (const id_Permiso of dataRol.permisos) {
            await RolXPermiso.create({
              id_Rol: rol.id_Rol,
              id_Permiso: id_Permiso,
              id_Empleado: dataRol.id_Empleado
             }, { transaction: t });
          }
        }
  
        await t.commit();
        res.status(201).json({ message: 'Rol y permisos creados exitosamente' });
      } catch (error) {
        await t.rollback();
        throw error;
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear rol y permisos' });
    }
  }


  const { Op } = require('sequelize');
  
  async function actualizarRol(req, res) {
    const { id } = req.params;
    const { nombre_rol, permiso } = req.body;

    try {
      
        const rol = await Rol.findByPk(id);
        if (!rol) {
            return res.status(404).send('Rol no encontrado');
        }

        // Actualizar el nombre del rol
        rol.nombre_rol = nombre_rol;

        // Guardar los cambios en el rol
        await rol.save();

        // Eliminar todos los permisos asociados al rol
        await RolXPermiso.destroy({ where: { fk_rol: id } });


        // Insertar los nuevos permisos asociados al rol
        if (permiso && permiso.length > 0) {
            await Promise.all(permiso.map(async (permisoId) => {
                await RolXPermiso.create({ fk_rol: id, fk_permiso:permisoId, fk_usuario: 28});
            }));
        }

        console.log('Rol actualizado:', rol.toJSON());

        return res.status(200).json(rol);
    } catch (error) {
        console.error('Error al actualizar el rol:', error);
        return res.status(500).send('Error al actualizar el rol');
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