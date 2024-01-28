import axios from 'axios';

export const obtenerHorasDisponibles  = async (fecha)=>{
    return await axios.get(`http://localhost:3001/agenda/obtenerHorasDisponibles/${fecha}`)
}