import { createContext, useContext, useState } from "react";
import Swal from 'sweetalert2'; // Import SweetAlert2
import { useNavigate } from "react-router-dom";
import { getListarRol,postRol,putDesactivarRol,putActivarRol,listarPermiso } from "../../api/rutasApiRol"

export const RolContext = createContext()

export const useRol=()=>{
    const context= useContext(RolContext)
     if(!context){
         throw new Error ("El useRol debe de estar del provider")
     }
     return context;
 }

 export const RolContextProvider = ({ children }) => {

    const navigate=useNavigate()
    const [listar, setListar]=useState([])//Lista todos los roles
    const [searchTerm, setSearchTerm] = useState("");

    const cargarRol = async () => {
      try {
        const response = await getListarRol(); // Llamar la ruta del servidor
        const rolesConPermisos = response.data.map((item) => ({
          id_Rol: item.id_rol,
          nombre: item.nombre_rol,
          estado: item.estado_rol,
          permisos: item.permisos.split(','), // Convierte la cadena de permisos en un array
        }));
  
        const filteredList = rolesConPermisos.filter((item) =>
          item.id_Rol.toString().includes(searchTerm) ||
          item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
  
        setListar(filteredList); // Se le pasa los datos al setListar
      } catch (error) {
        console.error(error);
        // Maneja el error de manera adecuada
      }
    };

async function cargarpermiso(){
  const response =await listarPermiso()
  setListar(response.data)
}

const crearRoles=async(values)=>{
try {
  if( values.nombre_rol==""||values.permisos==""){
           
    Swal.fire({
        icon: 'error',
        title: 'Campos Vacios',
        text: 'Por favor ingresar datos!',
        
      })
    }else{
           
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Confirmar el envio del formulario?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Aceptar!',
        cancelButtonText: 'Cancelar!',
        Buttons: true
      }).then(async(result) => {
        if (result.isConfirmed) {

      
          await postRol(values)
          navigate("/rol")
          window.location.reload()

          swalWithBootstrapButtons.fire(
            'Registro Enviado!',
            'Your file has been deleted.',
            'success'
          )
        
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Se cancelo el envio',
            'Your imaginary file is safe :)',
            'error'
          )
        }
       

      })
     
     
    }

} catch (error) {
  console.log(error)
}
}

const filtrarDesactivados = listar.sort((a, b) => {
  if (a.estado === b.estado) {
    return 0;
  }
  return a.estado ? -1 : 1;
});

const desactivarRol= async (id_Rol) => {
    try {
      const response = await putDesactivarRol(id_Rol);
      if (response.status === 200) {
        // Actualiza la lista de rol después de desactivar uno
        const updatedList = listar.map((item) => {
          if (item.id_Rol === id_Rol) {
            // Actualiza el estado del cliente en la lista
            return { ...item, estado: false };
          }
          return item;
        });
        setListar(updatedList);
      }
    } catch (error) {
      console.error(error);
      // Maneja el error de manera adecuada
    }
  };
const activarRol = async (id_Rol) => {
    try {
      const response = await putActivarRol(id_Rol);
      if (response.status === 200) {
        // Actualiza la lista de rol después de activar uno
        const updatedList = listar.map((item) => {
          if (item.id_Rol === id_Rol) {
            // Actualiza el estado del cliente en la lista
            return { ...item, estado: true };
          }
          return item;
        });
        setListar(updatedList);
      }
    } catch (error) {
      console.error(error);
      // Maneja el error de manera adecuada
    }
  };
  
    return( 
        <RolContext.Provider value={{listar, cargarRol, desactivarRol, activarRol, crearRoles,searchTerm,setSearchTerm, cargarpermiso,filtrarDesactivados}}>
            {children}
        </RolContext.Provider>
      )
 }