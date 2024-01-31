import axios from 'axios';

export const obtenerHorasDisponibles  = async (fecha)=>{
    return await axios.get(`http://localhost:3001/agenda/obtenerHorasDisponibles/${fecha}`)
}

export const getListarAgenda = async ()=>{
    return await axios.get('http://localhost:3001/agenda')
}

export const putDesactivarAgenda = async (id_agenda) => {
    return await axios.put(`http://localhost:3001/agenda/disable/${id_agenda}`);
}

export const putActivarAgenda = async (id_agenda) => {
    return await axios.put(`http://localhost:3001/agenda/activate/${id_agenda}`);
}

export const postAgenda = async (task) => {
    try {
        const response = await axios.post('http://localhost:3001/agenda/create', task);
        return response.data;
    } catch (error) {
        console.error('Error al crear la agenda', error);
        throw error;
    }
};