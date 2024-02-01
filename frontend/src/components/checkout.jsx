import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import '../css/LandingPage.css';
import '../css/Navbar.css';
import HorarioCarousel from './HorarioCarousel';
import Pasos from './pasos';
import { getListarServicios } from '../api/rutasApiServicio';
import { obtenerHorasDisponibles,postAgenda } from '../api/rutasApiagenda';

const FormularioPasoAPaso = () => {
  const [pasoActual, setPasoActual] = useState(1);
  const [fecha, setFecha] = useState('');
  const [horaSeleccionada, setHoraSeleccionada] = useState('');
  const [servicios, setServicios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [serviciosDisponibles, setServiciosDisponibles] = useState([]);
  const [horasDisponibles, setHorasDisponibles] = useState([]);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await getListarServicios();
        const serviciosActivos = response.data.filter(servicio => servicio.estado);
        setServiciosDisponibles(serviciosActivos);
      } catch (error) {
        console.error('Error al obtener servicios', error);
      }
    };

    fetchServicios();
  }, []);

  useEffect(() => {
    const fetchHorasDisponibles = async () => {
      try {
        if (fecha) {
          const response = await obtenerHorasDisponibles(fecha);
          setHorasDisponibles(response.data.horasDisponibles);
        }
      } catch (error) {
        console.error('Error al obtener horas disponibles', error);
      }
    };

    fetchHorasDisponibles();
  }, [fecha]);

  const handleFechaHoraSubmit = (event) => {
    event.preventDefault();
    console.log('Fecha:', fecha);
    console.log('Hora:', horaSeleccionada);
    setPasoActual(pasoActual + 1);
  };

  const handleServiciosSubmit = (event) => {
    event.preventDefault();
    console.log('Servicios seleccionados:', servicios);
    setPasoActual(pasoActual + 1);
  };

  const handleFinalSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Construir el objeto de datos que deseas enviar al servidor
      const data = {
        nombre,
        correo,
        telefono,
        fecha,
        hora: horaSeleccionada,
        id_Empleado: 46, // Puedes cambiar esto según tus necesidades
        servicios: servicios.map(servicio => ({ id_Servicio: servicio.id_Servicio }))
      };
      console.log("este es la data",data)
  
      // Realizar la solicitud POST a tu API
      const response = await postAgenda(data);
  
      // Hacer algo con la respuesta, por ejemplo, mostrar un mensaje al usuario
      console.log('Respuesta de la API:', response);
  
      // Puedes redirigir al usuario a una página de confirmación o realizar otras acciones necesarias
    } catch (error) {
      console.error('Error al enviar la solicitud de agenda:', error);
      // Manejar el error según tus necesidades, mostrar un mensaje al usuario, etc.
    }
  };
  

  const generarHorasDisponibles = () => {
    return horasDisponibles;
  };

  const seleccionarHora = (hora) => {
    setHoraSeleccionada(hora);
  };

  const retrocederPaso = () => {
    if (pasoActual > 1) {
      setPasoActual(pasoActual - 1);
    }
  };

  return (
    <div className="containerr">
      <h3>Agenda con nosotros</h3>
      <p>¡Anímate a agendar con nosotros en 3 simples pasos y rápido!</p>
      <div className="row pt-5 card">
        <div className="col-md-12">
          <div className="mb-4">
            <Pasos pasoActual={pasoActual} />
          </div>
          <form>
            {pasoActual === 1 && (
              <div>
                <div className="form-group">
                  <label htmlFor="fecha">Fecha:</label>
                  <input
                    type="date"
                    className="form-control"
                    id="fecha"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Selecciona la hora:</label>
                  <HorarioCarousel
                    horasDisponibles={generarHorasDisponibles()}
                    horaSeleccionada={horaSeleccionada}
                    handleSeleccionarHora={seleccionarHora}
                  />
                  <div className='pt-4'>
                    <p>Fecha seleccionada: {fecha}</p>
                    <p>Hora seleccionada: {horaSeleccionada}</p>
                  </div>
                </div>
                <div className='pb-3 pt-2 d-flex justify-content-between'>
                  <button type="submit" className="btn btn-primary" onClick={handleFechaHoraSubmit}>
                    Siguiente
                  </button>
                </div>
              </div>
            )}
            {pasoActual === 2 && (
              <div>
                <div className="form-group">
                  <label className='pb-4 pt-3'>Selecciona los servicios:</label>
                  <Autocomplete
                    multiple
                    id="servicios"
                    options={serviciosDisponibles}
                    getOptionLabel={(option) => option.nombre}
                    getOptionSelected={(option, value) => option.id_Servicio === value.id_Servicio}
                    value={servicios}
                    onChange={(_, newValue) => setServicios(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} label='Servicios' variant='outlined' />
                    )}
                  />
                </div>
                <div className="pb-2 pt-2 d-flex justify-content-between">
                  <button type="button" className="btn btn-secondary" onClick={retrocederPaso}>
                    Retroceder
                  </button>
                  <button type="submit" className="btn btn-primary mr-2" onClick={handleServiciosSubmit}>
                    Siguiente
                  </button>
                </div>
              </div>
            )}
            {pasoActual === 3 && (
              <div>
                <div className="form-group">
                  <label htmlFor="nombre">Nombre:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="correo">Correo:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="telefono">Teléfono:</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="telefono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    required
                  />
                </div>
                <div className='pb-2 pt-2 d-flex justify-content-between'>
                  <button type="button" className="btn btn-secondary" onClick={retrocederPaso}>
                    Retroceder
                  </button>
                  <button type="submit" className="btn btn-primary mr-2" onClick={handleFinalSubmit}>
                    Agendar Cita
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormularioPasoAPaso;
