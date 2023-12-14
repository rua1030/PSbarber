import axios from 'axios';

export const getListarClientes = async ()=>{
    return await axios.get('http://localhost:3001/cliente')
}

export const postCliente = async (task) => {
    try {
      const response = await axios.post('http://localhost:3001/cliente/create',task);
      return response.data;
    } catch (error) {
      if (error.response) {
        
        return { error: 'Error del servidor', data: error.response.data };
      }
    }
  };

  export const datosCliente=async (id_Cliente)=>{
    return await axios.get(`http://localhost:3001/cliente/${id_Cliente}`)
  }

  export const actualizarCliente=async (id_Cliente, task)=>{
    return await axios.put(`http://localhost:3001/cliente/update/${id_Cliente}`, task)
  }

