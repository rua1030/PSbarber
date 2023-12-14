import axios from 'axios';

export const getListarRol = async ()=>{
    return await axios.get('http://localhost:3001/rol')
  }
  export const getListarRolEmpleado = async ()=>{
    return await axios.get('http://localhost:3001/rol/Empleado')
  }  

export const postRol = async (task) => {
    try {
      const response = await axios.post('http://localhost:3001/rol/create', task);
      return response.data;
    } catch (error) {
      if (error.response) {
        
        return { error: 'Error del servidor', data: error.response.data };
      }
    }
  };

export const putDesactivarRol = async (id_Rol) => {
    return await axios.put(`http://localhost:3001/rol/disable/${id_Rol}`);
  }

export const putActivarRol = async (id_Rol) => {
    return await axios.put(`http://localhost:3001/rol/activate/${id_Rol}`);
  }
  
export const listarPermiso=async ()=>{
    return await axios.get(`http://localhost:3001/rol/permiso`)
  }
