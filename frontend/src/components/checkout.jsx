import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import '../css/LandingPage.css';
import '../css/Navbar.css';
import HorarioCarousel from './HorarioCarousel';
import Pasos from './pasos';
import { getListarServicios } from '../api/rutasApiServicio';
import { obtenerHorasDisponibles, postAgenda } from '../api/rutasApiagenda';



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

  // Estados para mensajes de    error
  const [fechaError, setFechaError] = useState('');
  const [horaError, setHoraError] = useState('');
  const [serviciosError, setServiciosError] = useState('');
  const [nombreError, setNombreError] = useState('');
  const [correoError, setCorreoError] = useState('');
  const [telefonoError, setTelefonoError] = useState('');

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

  const validarFecha = () => {
    if (!fecha) {
      setFechaError('Debe seleccionar una fecha.');
      return false;
    }
    setFechaError('');
    return true;
  };

  const validarHora = () => {
    if (!horaSeleccionada) {
      setHoraError('Debe seleccionar una hora.');
      return false;
    }
    setHoraError('');
    return true;
  };

  const validarServicios = () => {
    if (servicios.length === 0) {
      setServiciosError('Debe seleccionar al menos un servicio.');
      return false;
    }
    setServiciosError('');
    return true;
  };

  const validarNombre = () => {
    const nombreRegex = /^[a-zA-Z]+$/;
    if (nombre.length >  15) {
      setNombreError('Debe ingresar su nombre menor de 15 caracteres');
      return false;
    }
    if (!nombre) {
      setNombreError('Debe ingresar su nombre.');
      return false;
    }
    if (!nombreRegex.test(nombre)) {
      setNombreError('El nombre no puede contener números ni caracteres especiales.');
      return false;
    }
    setNombreError('');
    return true;
  };
  
  const validarCorreo = () => {
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correo) {
      setCorreoError('Debe ingresar un correo válido.');
      return false;
    }
    if (!correoRegex.test(correo)) {
      setCorreoError('El correo no cumple con el formato válido.');
      return false;
    }
    setCorreoError('');
    return true;
  };
  
  const validarTelefono = () => {
    const telefonoRegex = /^[0-9]+$/;
    if (telefono.length > 10) {
      setTelefonoError('ingresa un numero telefonico de maximo 10 digitos.');
      return false;
    }
    if (!telefono) {
      setTelefonoError('Debe ingresar un número de teléfono.');
      return false;
    }
    if (!telefonoRegex.test(telefono)) {
      setTelefonoError('El teléfono solo puede contener números.');
      return false;
    }
    setTelefonoError('');
    return true;
  };

  const handleFechaHoraSubmit = (event) => {
    event.preventDefault();

    if (validarFecha() && validarHora()) {
      setPasoActual(pasoActual + 1);
    }
  };

  const handleServiciosSubmit = (event) => {
    event.preventDefault();

    if (validarServicios()) {
      setPasoActual(pasoActual + 1);
    }
  };

 const handleFinalSubmit = async (event) => {
    event.preventDefault();
  
    if (
      validarNombre() &&
      validarCorreo() &&
      validarTelefono() &&
      validarFecha() &&
      validarHora() &&
      validarServicios()
    ) {
      // Mostrar SweetAlert para confirmar la cita
      const confirmResult = await Swal.fire({
        title: '¿Estás seguro de que quieres agendar esta cita?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, agendar',
        cancelButtonText: 'Cancelar',
      });
      console.log('Confirm Result:', confirmResult);
  
      if (confirmResult.isConfirmed) {
        console.log('Confirmado');
  
        // Continuar con el proceso de agendar la cita
        try {
          const data = {
            nombre,
            correo,
            telefono,
            fecha,
            hora: horaSeleccionada,
            id_Empleado: 45,
            servicios: servicios.map(servicio => ({ id_Servicio: servicio.id_Servicio }))
          };
  
          const response = await postAgenda(data);
          console.log('Respuesta de la API:', response);
          
            // Mostrar SweetAlert con el mensaje de éxito
            Swal.fire({
                title: 'Registro Exitoso',
                text: 'Cita creada exitosamente.',
                icon: 'success',
                confirmButtonText: 'Volver a Agendar'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Redirigir a la página de agendar (o recargar la página actual)
                    window.location.reload();
                }
            });
           if (response && response.data && response.data.citaCreada) {
            console.error('La respuesta de la API no contiene la información esperada:', response);
            // Mostrar SweetAlert con mensaje de error
            Swal.fire({
              title: 'Error al Agendar',
              text: 'No se pudo agendar la cita. Por favor intenta con otra opcion.',
              icon: 'error',
              confirmButtonText: 'Cerrar'
            });
          }
        } catch (error) {
          console.error('Error al enviar la solicitud de agenda:', error);
          // Mostrar SweetAlert con mensaje de error
          Swal.fire({
              title: 'Error al Agendar',
              text: 'Hubo un problema al agendar la cita. Por favor, inténtalo de nuevo.',
              icon: 'error',
              confirmButtonText: 'Cerrar'
          });
        }
      }
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
                    className={`form-control ${fechaError ? 'is-invalid' : ''}`}
                    id="fecha"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    required
                  />
                  {fechaError && <div className="invalid-feedback">{fechaError}</div>}
                </div>
                <div className="form-group">
                  <label>Selecciona la hora:</label>
                  <HorarioCarousel
                    horasDisponibles={generarHorasDisponibles()}
                    horaSeleccionada={horaSeleccionada}
                    handleSeleccionarHora={seleccionarHora}
                  />
                   {horaError && <div className="invalid-feedback">{horaError}</div>}
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
                  {serviciosError && <div className="invalid-feedback">{serviciosError}</div>}
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
                    className={`form-control ${nombreError ? 'is-invalid' : ''}`}
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                  {nombreError && <div className="invalid-feedback">{nombreError}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="correo">Correo:</label>
                  <input
                    type="email"
                    className={`form-control ${correoError ? 'is-invalid' : ''}`}
                    id="correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                  {correoError && <div className="invalid-feedback">{correoError}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="telefono">Teléfono:</label>
                  <input
                    type="tel"
                    className={`form-control ${telefonoError ? 'is-invalid' : ''}`}
                    id="telefono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    required
                  />
                  {telefonoError && <div className="invalid-feedback">{telefonoError}</div>}
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