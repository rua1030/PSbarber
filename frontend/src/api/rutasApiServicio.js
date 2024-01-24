import axios from 'axios';

export const getListarServicios = async ()=>{
    return await axios.get('http://localhost:3001/Servicio')
}

export const postServicio = async (task) => {
    try {
      const response = await axios.post('http://localhost:3001/Servicio/create',task);
      return response.data;
    } catch (error) {
      if (error.response) {
        
        return { error: 'Error del servidor', data: error.response.data };
      }
    }
  };

  export const datosServicio=async (id_Servicio)=>{
    return await axios.get(`http://localhost:3001/Servicio/${id_Servicio}`)
  }

  export const actualizarServicio=async (id_Servicio, task)=>{
    return await axios.put(`http://localhost:3001/Servicio/update/${id_Servicio}`, task)
  }
  export const deleteServicio = async (id_Servicio) => {
    return await axios.delete(`http://localhost:3001/Servicio/delete/${id_Servicio}`);
  }

  export const putDesactivarServicio = async (id_Servicio) => {
    return await axios.put(`http://localhost:3001/Servicio/disable/${id_Servicio}`);
  }

  export const putActivarServicio = async (id_Servicio) => {
    return await axios.put(`http://localhost:3001/Servicio/activate/${id_Servicio}`);
  }


