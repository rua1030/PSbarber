/* eslint-disable no-useless-catch */
import axios from 'axios';

export const getListarEmpleado = async ()=>{
    return await axios.get('http://localhost:3001/empleado')
}

export const getListarEmpleadoauto = async ()=>{
  return await axios.get('http://localhost:3001/empleado/auto')
}

export const postEmpleado = async (task) => {
    try {
      const response = await axios.post('http://localhost:3001/empleado/create', task);
      return response.data; // Devuelve los datos exitosos
    } catch (error) {
      if (error.response) {
        
        return { error: 'Error del servidor', data: error.response.data };
      }
    }
  };

  export const datosEmpleado=async (id_Empleado)=>{
    return await axios.get(`http://localhost:3001/empleado/${id_Empleado}`)
  }
  
  export const actualizarEmpleado=async (id_Empleado, task)=>{
    return await axios.put(`http://localhost:3001/empleado/update/${id_Empleado}`, task)
  }


  export const getListarTipo_Empleado = async ()=>{
    return await axios.get('http://localhost:3001/tipo_Empleado')
  }

  export const deleteEmpleado = async (id_Empleado) => {
    return await axios.delete(`http://localhost:3001/empleado/delete/${id_Empleado}`);
  }

  export const putDesactivarEmpleado = async (id_Empleado) => {
    return await axios.put(`http://localhost:3001/empleado/disable/${id_Empleado}`);
  }

  export const putActivarEmpleado = async (id_Empleado) => {
    return await axios.put(`http://localhost:3001/empleado/activate/${id_Empleado}`);
  }

  export const loginIngreso = async (email, contrasena) => {
    const response = await axios.post('http://localhost:3001/empleado/login/', {
      email: email,
      contrasena: contrasena,
    });
  
    // Verifica si la respuesta incluye tanto el token como la información del Empeleado
    if (response.data && response.data.token && response.data.user) {
      const { token, user } = response.data;
      return { token, user };
    } else {
      // Maneja el caso en el que la respuesta no incluye el token o la información del empleado esperada
      throw new Error('La respuesta no incluye el token o la información del empleado.');
    }
  };
  export const cambiarContrasena = async (email, contrasena) => {
    try {
      const response = await axios.post(`http://localhost:3001/Empleado/cambiarcontrasena/`, {
        email: email,
        contrasena: contrasena,
      });
      console.log('Contraseña cambiada exitosamente:', response.data);
  
      return response.data; // O algo similar
  
    } catch (error) {
      throw error; // Maneja el error adecuadamente en tu componente React
    }
  };
  
  export const enviarContrasena = async (email) => {
    try {
      const response = await axios.post('http://localhost:3001/empleado/enviaremail/', {
        email: email,
        
      });
    } catch (error) {
      throw error; // Maneja el error adecuadamente en tu componente React
    }
  };



