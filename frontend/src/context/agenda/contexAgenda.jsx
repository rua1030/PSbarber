import {createContext , useContext, useState} from "react"
import { getListarAgenda, putDesactivarAgenda,putActivarAgenda } from "../../api/rutasApiAgenda";


export const AgendaContext = createContext()

export const useAgenda=()=>{
    const context= useContext(AgendaContext)
     if(!context){
         throw new Error ("El useAgenda debe de estar del provider")
     }
     return context;
 }
 export const AgendaContextProvider = ({ children }) => {

    const [listar, setListar]=useState([])
    const [searchTerm, setSearchTerm] = useState("");

    async function listaAgenda() {
        const response = await getListarAgenda();
        const filterList = response.data.filter(
          (item) =>
          item.id_agenda.toString().includes(searchTerm) ||
          item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.correo.toString().includes(searchTerm) ||
          item.telefono.toString().includes(searchTerm) ||
          item.fecha.toString().includes(searchTerm) ||
          item.hora.toString().includes(searchTerm) ||
          item.empleado.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
          setListar(filterList);
        }

    const filtrarDesactivados = listar.sort((a, b) => {
            if (a.estado === b.estado) {
              return 0;

            }
            return a.estado ? -1 : 1;
        });


        const desactivarAgenda = async (id_agenda) => {
            try {
              const response = await putDesactivarAgenda(id_agenda);
              if (response.status === 200) {
                const updatedList = listar.map((item) => {
                  if (item.id_agenda === id_agenda) {
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
      
          const activarAgenda = async (id_agenda) => {
            try {
              const response = await putActivarAgenda(id_agenda);
              if (response.status === 200) {
                const updatedList = listar.map((item) => {
                  if (item.id_agenda === id_agenda) {
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
            <AgendaContext.Provider value={{listaAgenda,filtrarDesactivados,setSearchTerm,activarAgenda,desactivarAgenda,listar,setListar}}>
                {children}
            </AgendaContext.Provider>
            )

}
