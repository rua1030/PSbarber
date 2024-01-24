import {createContext , useContext, useState} from "react"
import {deleteServicio,putDesactivarServicio,putActivarServicio,datosServicio, getListarServicios,postServicio } from "../../api/rutasApiServicio";
import Swal from 'sweetalert2';


export const ServicioContext = createContext()

export const useServicio=()=>{
   const context= useContext(ServicioContext)
    if(!context){
        throw new Error ("El useServicio debe de estar del provider")
    }
    return context;
}
export const ServicioContextProvider = ({ children }) => {
    
    const [listar, setListar]=useState([])
    const [searchTerm, setSearchTerm] = useState("");

    async function listaServicio() {
        const response = await getListarServicios();
        const filterList = response.data.filter(
          (item) =>
          item.id_Servicio.toString().includes(searchTerm) ||
          item.precio.toString().includes(searchTerm.toLowerCase()) ||
          item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) 
        );
          setListar(filterList);
        }

    const filtrarDesactivados = listar.sort((a, b) => {
            if (a.estado === b.estado) {
              return 0;
            }
            return a.estado ? -1 : 1;
        });

    async function agregarServicio(values){
            try {
              if (!values.email.includes("@") || !values.email.includes(".com")) {
                 Swal.fire({
                   icon: 'error',
                   title: 'Correo no valido',
                   text: 'Por favor ingresar un correo valido!',
                 });
               } else {
                 const swalWithBootstrapButtons = Swal.mixin({
                   customClass: {
                     confirmButton: 'btn btn-success',
                     cancelButton: 'btn btn-danger'
                   },
                   buttonsStyling: false
                 });
           
                 swalWithBootstrapButtons.fire({
                   title: 'Confirmar el envio del formulario?',
                   text: "",
                   icon: 'warning',
                   showCancelButton: true,
                   confirmButtonText: 'Aceptar!',
                   cancelButtonText: 'Cancelar!',
                   buttons: true
                 }).then(async (result) => {
                   if (result.isConfirmed) {
                     try {
                       const response = await postServicio(values);
                       console.log(response);
                 
                       if (response.data && response.data.error) {
                         // Verificar errores específicos
                         if (response.data.error === 'el id de Servicio ya existe') {
                           console.log('Mostrar alerta de Servicio existente');
                 
                           Swal.fire({
                             icon: 'error',
                             title: 'Error',
                             text: 'El documento de Servicio ya existe.',
                           });
                         } else if (response.data.error === 'El correo electrónico ya está registrado') {
                           // Mostrar alerta específica para correo existente
                           swalWithBootstrapButtons.fire({
                             icon: 'error',
                             title: 'Error',
                             text: 'El correo electrónico ya está registrado. Por favor, elige otro correo electrónico.',
                           });
    
    
                         } else {
                           console.log('Mostrar alerta de otro error');
                 
                           Swal.fire({
                             icon: 'error',
                             title: 'Error',
                             text: response.data.error,
                           });
                         }
                       } else {
                         // Verificar si se creó el Servicio correctamente
                         if (response.data && response.data.empleado) {
                           // Si no hay errores, redirige a la página de Servicio
                           swalWithBootstrapButtons.fire(
                             'Registro Enviado!',
                             'Your file has been deleted.',
                             'success'
                           );
                         } else {
                           swalWithBootstrapButtons.fire(
                             'Registro Enviado!',
                             'Your file has been deleted.',
                             'success'
                           );
                         }
                       }
                     } catch (error) {
                       console.error(error);
                       swalWithBootstrapButtons.fire(
                         'Error',
                         'Ocurrió un error al crear el Servicio.',
                         'error'
                       );
                     }
                   } else if (result.dismiss === Swal.DismissReason.cancel) {
                     swalWithBootstrapButtons.fire(
                       'Se cancelo el envio',
                       'Your imaginary file is safe :)',
                       'error'
                     );
                   }
                 });
               }              
             } catch (error) {
               console.log(error);
             }
        }
    
    //funciones de actualizar


    const[ListarActualizar, setListarActualizar]=useState({
      id_Servicio:"",
      precio:"",
      nombres:"",
   })

  async function cargarDatosServicios(id_Servicio) {
    try {
      const response = await datosServicio(id_Servicio);
      const ServicioData = response.data;
      setListarActualizar({
        id_Servicio: ServicioData.id_Servicio,
        precio: ServicioData.precio,
        nombres: ServicioData.nombres,
        estado: ServicioData.estado,
      });
    } catch (error) {
      console.log(error);
    }
  }
 
  async function validacionActualizar(id_Servicio) {
    try {
      const ServicioUpdate = await datosServicio(id_Servicio);
      const response = ServicioUpdate.data;

      setListarActualizar({
        precio: response.precio,
        nombre: response.nombre,
        estado: response.estado,
      });
    } catch (error) {
      console.log(error);
    }
  }

  const destroyServicio = async (id_Servicio) => {
    try {
      Swal.fire({
        title: "Eliminar registro?",
        text: "No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await deleteServicio(id_Servicio);
          if (response.status === 200) {
            Swal.fire(
              "Eliminado!",
              "El registro ha sido eliminado.",
              "success"
            );
            listaServicio();
          } else {
            Swal.fire({
              icon: "error",
              title: "Error al eliminar el registro",
              text: "No se pudo eliminar el registro",
            });
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
    };

    const desactivarServicio = async (id_Servicio) => {
      try {
        const response = await putDesactivarServicio(id_Servicio);
        if (response.status === 200) {
          const updatedList = listar.map((item) => {
            if (item.id_Servicio === id_Servicio) {
              return { ...item, estado: false };
            }
            return item;
          });
          setListar(updatedList);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const activarServicio = async (id_Servicio) => {
      try {
        const response = await putActivarServicio(id_Servicio);
        if (response.status === 200) {
          const updatedList = listar.map((item) => {
            if (item.id_Servicio === id_Servicio) {
              return { ...item, estado: true };
            }
            return item;
          });
          setListar(updatedList);
        }
      } catch (error) {
        console.error(error);
      }
    };
    


        return(
            <ServicioContext.Provider value={{desactivarServicio,activarServicio,destroyServicio,validacionActualizar,cargarDatosServicios,ListarActualizar,setListarActualizar,agregarServicio,listaServicio,searchTerm,listar,setSearchTerm,filtrarDesactivados }}>
                {children}
            </ServicioContext.Provider>
            )

}