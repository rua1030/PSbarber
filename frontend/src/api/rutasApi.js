import axios from 'axios';

export const getListarEmpleado = async ()=>{
    return await axios.get('http://localhost:3001/empleado')
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
    // eslint-disable-next-line no-useless-catch
    try{  
      const response = await axios.post(' ',{
      email: email,
      contrasena: contrasena,
    });
    const { token, empleados } = response.data; 
    return { token, empleados };
    }catch(error){
      throw error
    }
  };



