import axios from 'axios';

export const getListarClientes = async ()=>{
    return await axios.get('http://localhost:3001/cliente')
}

export const postCliente = async (task) => {
    try {
      console.log("mamilo es muy lindo",task)
      const response = await axios.post('http://localhost:3001/cliente/create/',task);
      return response.data;
    } catch (error) {
      if (error.response) {
        
        return { error: 'Error del servidor', data: error.response.data };
      }
    }
  };

  export const datosCliente=async (documento)=>{
    return await axios.get(`http://localhost:3001/cliente/${documento}`)
  }

  export const actualizarCliente=async (documento, task)=>{
    return await axios.put(`http://localhost:3001/cliente/update/${documento}`, task)
  }
  export const deleteCliente = async (documento) => {
    return await axios.delete(`http://localhost:3001/cliente/delete/${documento}`);
  }

  export const putDesactivarCliente = async (documento) => {
    return await axios.put(`http://localhost:3001/cliente/disable/${documento}`);
  }

  export const putActivarCliente = async (documento) => {
    return await axios.put(`http://localhost:3001/cliente/activate/${documento}`);
  }


