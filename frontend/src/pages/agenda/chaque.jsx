import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getbuscarCitaConClientePorId } from '../../api/rutasApiAgenda';

const DetallesCita = () => {
  const { idCita } = useParams();
  const [citaConCliente, setCitaConCliente] = useState(null);

  useEffect(() => {
    const fetchCitaConCliente = async () => {
      try {
        const response = await getbuscarCitaConClientePorId(idCita);
        setCitaConCliente(response.data);
      } catch (error) {
        console.error('Error al obtener detalles de la cita', error);
      }
    };

    fetchCitaConCliente();
  }, [idCita]);

  return (
    <div className="detalles-cita">
      <h2>Detalles de la cita</h2>
      {citaConCliente && (
        <div>
          <h3>Cita:</h3>
          <p>ID: {citaConCliente.cita.id_Agenda}</p>
          <p>Fecha: {citaConCliente.cita.fecha}</p>
          <p>Hora: {citaConCliente.cita.hora}</p>
          {/* Otros detalles de la cita */}
          
          <h3>Cliente:</h3>
          <p>Nombre: {citaConCliente.cliente.nombre}</p>
          <p>Apellidos: {citaConCliente.cliente.apellidos}</p>
          <p>Email: {citaConCliente.cliente.email}</p>
          <p>Teléfono: {citaConCliente.cliente.telefono}</p>
          {/* Otros detalles del cliente */}
        </div>
      )}
    </div>
  );
};

export default DetallesCita;
