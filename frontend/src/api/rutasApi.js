import axios from 'axios';

export const getListarClientes = async ()=>{
    return await axios.get('http://localhost:3001/cliente')
}
export const getListarServicios = async ()=>{
    return await axios.get('http://localhost:3001/servicio')
}
export const getListarEmpleados = async ()=>{
    return await axios.get('http://localhost:3001/empleado')
}


