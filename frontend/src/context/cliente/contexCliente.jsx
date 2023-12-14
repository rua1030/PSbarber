import {createContext , useContext, useState} from "react"
import {deleteCliente,putDesactivarCliente,putActivarCliente,datosCliente, getListarClientes,postCliente } from "../../api/rutasApiCliente";
import Swal from 'sweetalert2';


export const ClienteContext = createContext()

export const useCliente=()=>{
   const context= useContext(ClienteContext)
    if(!context){
        throw new Error ("El useCliente debe de estar del provider")
    }
    return context;
}
export const ClienteContextProvider = ({ children }) => {
    
    const [listar, setListar]=useState([])
    const [searchTerm, setSearchTerm] = useState("");

    async function listaCliente() {
        const response = await getListarClientes();
        const filterList = response.data.filter(
          (item) =>
          item.id_Cliente.toString().includes(searchTerm) ||
          item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.telefono.toString().includes(searchTerm) ||
          item.tipo_documento.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.documento.toString().includes(searchTerm) ||
          item.email.toString().includes(searchTerm.toLowerCase()) 
        );
          setListar(filterList);
        }

    const filtrarDesactivados = listar.sort((a, b) => {
            if (a.estado === b.estado) {
              return 0;
            }
            return a.estado ? -1 : 1;
        });

    async function agregarCliente(values){
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
                       const response = await postCliente(values);
                       console.log(response);
                 
                       if (response.data && response.data.error) {
                         // Verificar errores específicos
                         if (response.data.error === 'el id de cliente ya existe') {
                           console.log('Mostrar alerta de cliente existente');
                 
                           Swal.fire({
                             icon: 'error',
                             title: 'Error',
                             text: 'El documento de cliente ya existe.',
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
                         // Verificar si se creó el cliente correctamente
                         if (response.data && response.data.empleado) {
                           // Si no hay errores, redirige a la página de cliente
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
                         'Ocurrió un error al crear el cliente.',
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
      id_Cliente:"",
      nombres:"",
      apellidos:"",
      telefono:"",
      tipo_documento:"",
      documento:"",
      email:"",
      estado:"",
   })

  async function cargarDatosClientes(id_Cliente) {
    try {
      const response = await datosCliente(id_Cliente);
      const ClienteData = response.data;
      setListarActualizar({
        id_Cliente: ClienteData.id_Cliente,
        nombres: ClienteData.nombres,
        apellidos: ClienteData.apellidos,
        telefono: ClienteData.telefono,
        tipo_documento: ClienteData.tipo_documento,
        documento: ClienteData.documento,
        email: ClienteData.email,
        estado: ClienteData.estado,
      });
    } catch (error) {
      console.log(error);
    }
  }
 
  async function validacionActualizar(id_Cliente) {
    try {
      const clienteUpdate = await datosCliente(id_Cliente);
      const response = clienteUpdate.data;

      setListarActualizar({
        nombre: response.nombre,
        apellidos: response.apellidos,
        telefono: response.telefono,
        tipo_documento: response.tipo_documento,
        documento: response.documento,
        email: response.email,
        estado: response.estado,
      });
    } catch (error) {
      console.log(error);
    }
  }

  const destroyCliente = async (id_Cliente) => {
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
          const response = await deleteCliente(id_Cliente);
          if (response.status === 200) {
            Swal.fire(
              "Eliminado!",
              "El registro ha sido eliminado.",
              "success"
            );
            listaCliente();
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

    const desactivarCliente = async (id_Cliente) => {
      try {
        const response = await putDesactivarCliente(id_Cliente);
        if (response.status === 200) {
          const updatedList = listar.map((item) => {
            if (item.id_Cliente === id_Cliente) {
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

    const activarCliente = async (id_Cliente) => {
      try {
        const response = await putActivarCliente(id_Cliente);
        if (response.status === 200) {
          const updatedList = listar.map((item) => {
            if (item.id_Cliente === id_Cliente) {
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
            <ClienteContext.Provider value={{desactivarCliente,activarCliente,destroyCliente,validacionActualizar,cargarDatosClientes,ListarActualizar,setListarActualizar,agregarCliente,listaCliente,searchTerm,listar,setSearchTerm,filtrarDesactivados }}>
                {children}
            </ClienteContext.Provider>
            )

}