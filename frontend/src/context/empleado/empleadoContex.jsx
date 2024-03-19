import {createContext , useContext, useState} from "react"
import { getListarTipo_Empleado,getListarEmpleado,postEmpleado,datosEmpleado,deleteEmpleado, putDesactivarEmpleado, putActivarEmpleado} from "../../api/rutasApi";
import {getListarRolEmpleado} from "../../api/rutasApiRol"
import Swal from 'sweetalert2';


export const EmpleadoContext = createContext()

export const useEmpleado=()=>{
   const context= useContext(EmpleadoContext)
    if(!context){
        throw new Error ("El useEmpleado debe de estar del provider")
    }
    return context;
}

export const EmpleadoContextProvider = ({ children }) => {

    const [listar, setListar]=useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [Listar, setListar2]=useState([])
    const [Listar3, setListar3]=useState([])

    async function listaEmpleado() {
      const response = await getListarEmpleado();
      const filterList = response.data.filter(
        (item) =>
        item.id_Empleado.toString().includes(searchTerm) ||
        item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.telefono.toString().includes(searchTerm) ||
        item.tipo_documento.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.documento.toString().includes(searchTerm) ||
        item.email.toString().includes(searchTerm.toLowerCase()) ||
        item.estado.toString().includes(searchTerm.toLowerCase())||
        item.tipo_empleado.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
        setListar(filterList);
      }

      async function agregarEmpleado(values){
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
                   const response = await postEmpleado(values);
                   console.log(response);
             
                   if (response.data && response.data.error) {
                     // Verificar errores específicos
                     if (response.data.error === 'el id de empleado ya existe') {
                       console.log('Mostrar alerta de empleado existente');
             
                       Swal.fire({
                         icon: 'error',
                         title: 'Error',
                         text: 'El documento de empleado ya existe.',
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
                     // Verificar si se creó el empleado correctamente
                     if (response.data && response.data.empleado) {
                       // Si no hay errores, redirige a la página de empleado
              
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
                     'Ocurrió un error al crear el empleado.',
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

        async function cargarRol(){
          const response =  await getListarRolEmpleado()
          setListar2(response.data)
        }

        async function cargarTipo_Empleado(){
          const response =  await getListarTipo_Empleado()
          setListar3(response.data)
        }

      const filtrarDesactivados = listar.sort((a, b) => {
        if (a.estado === b.estado) {
          return 0;
        }
        return a.estado ? -1 : 1;
      });


    const[ListarActualizar, setListarActualizar]=useState({
        id_Empleado:"",
        nombres:"",
        apellidos:"",
        telefono:"",
        tipo_documento:"",
        documento:"",
        email:"",
        estado:"",
        id_Rol:"",
        id_Tipo_Empleado:"",
        contrasena:""
     })

    async function cargarDatosEmpleados(id_Empleado) {
      try {
        const response = await datosEmpleado(id_Empleado);
        const EmpleadoData = response.data;
        setListarActualizar({
          id_Empleado: EmpleadoData.id_Empleado,
          nombres: EmpleadoData.nombres,
          apellidos: EmpleadoData.apellidos,
          telefono: EmpleadoData.telefono,
          tipo_documento: EmpleadoData.tipo_documento,
          documento: EmpleadoData.documento,
          email: EmpleadoData.email,
          estado: EmpleadoData.estado,
          id_Rol: EmpleadoData.id_Rol,
          id_Tipo_Empleado: EmpleadoData.id_Tipo_Empleado,
          contrasena:EmpleadoData.contrasena
        });
      } catch (error) {
        console.log(error);
      }
    }
    
    async function validacionActualizar(id_Empleado) {
  try {
    const empleadoUpdate = await datosEmpleado(id_Empleado);
    const response = empleadoUpdate.data;

    setListarActualizar({
      nombre: response.nombre,
      apellidos: response.apellidos,
      telefono: response.telefono,
      tipo_documento: response.tipo_documento,
      documento: response.documento,
      email: response.email,
      estado: response.estado,
      id_Rol: response.id_Rol,
      id_Tipo_Empleado: response.id_Tipo_Empleado,
      contrasena: response.contrasena
    });

    // Verificar si el correo ya está registrado
    const existingEmpleadoEmail = await Empleado.findOne({
      where: { email: response.email, id_Empleado: { [Op.ne]: id_Empleado } },
    });

    if (existingEmpleadoEmail) {
      // Mostrar alerta de correo ya registrado
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El correo electrónico ya está registrado. Por favor, elige otro correo electrónico.',
      });
      return; // Puedes ajustar esto según lo que necesites hacer en tu aplicación
    }

    // ... Resto de la lógica de validación o actualización
  } catch (error) {
    console.log(error);
  }
}

    

    const destroyEmpleado = async (id_Empleado) => {
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
          const response = await deleteEmpleado(id_Empleado);
          console.log("este es el response ",response)
          if (response.status === 200) {
            Swal.fire(
              "Eliminado!",
              "El registro ha sido eliminado.",
              "success"
            );
            listaEmpleado();
          }else if(response.status === 500){
            Swal.fire({
              icon: "error",
              title: "Error al eliminar el registro",
              text: "No se pudo eliminar el registro",
            });
          }
          else {
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

    const desactivarEmpleado = async (id_Empleado) => {
      try {
        const response = await putDesactivarEmpleado(id_Empleado);
        if (response.status === 200) {
          const updatedList = listar.map((item) => {
            if (item.id_Empleado === id_Empleado) {
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

    const activarEmpleado = async (id_Empleado) => {
      try {
        const response = await putActivarEmpleado(id_Empleado);
        if (response.status === 200) {
          const updatedList = listar.map((item) => {
            if (item.id_Empleado === id_Empleado) {
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
        <EmpleadoContext.Provider value={{activarEmpleado,desactivarEmpleado,destroyEmpleado,cargarTipo_Empleado,Listar3,Listar,listaEmpleado,filtrarDesactivados,searchTerm,setSearchTerm,agregarEmpleado,ListarActualizar,setListarActualizar,cargarDatosEmpleados,validacionActualizar,cargarRol}}>
            {children}
        </EmpleadoContext.Provider>
        )
      }
