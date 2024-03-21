import axios from 'axios';

export const obtenerHorasDisponibles = async (fecha) => {
  return await axios.get(`http://localhost:3001/agenda/obtenerHorasDisponibles/${fecha}`);
}

export const getListarAgenda = async () => {
  return await axios.get('http://localhost:3001/agenda');
}

export const obtenerInfoClientePorCorreo = async (documento) => {
  return await axios.get(`http://localhost:3001/agenda/obtenerDatosClientes/${documento}`);
}

export const putDesactivarAgenda = async (id_Agenda) => {
  return await axios.put(`http://localhost:3001/agenda/disable/${id_Agenda}`);
}

export const putActivarAgenda = async (id_Agenda) => {
  return await axios.put(`http://localhost:3001/agenda/activate/${id_Agenda}`);
}


export const getbuscarCitaConClientePorId = async (id_Agenda) => {
  try {
    const response = await axios.get(`http://localhost:3001/agenda/citaExitosa/${id_Agenda}`);
    return response.data;
  } catch (error) {
    console.error('Error al buscar la cita y el cliente:', error);
    throw error; // Re-lanza el error para que pueda ser manejado por el código que llama a esta función
  }
};
export const postAgenda = async (data) => {
  try {
    console.log('la data es esta___________',data)
    const response = await axios.post('http://localhost:3001/agenda/create', data);
    return response.data;
  } catch (error) {
    console.error('Error en postAgenda:', error);
    throw error;
  }
};
export const getListarCitaEstadoPago = async () =>{
  return await axios.get('http://localhost:3001/agenda/finalizada')
}

export const putDesactivarEstadoPago = async (id_Agenda) => {
  return await axios.put(`http://localhost:3001/agenda/disablePago/${id_Agenda}`)
}
export const putActivarEstadoPago = async (id_Agenda) => {
  return await axios.put(`http://localhost:3001/agenda/activatePago/${id_Agenda}`)
}
