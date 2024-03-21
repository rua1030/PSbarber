import { useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Swal from 'sweetalert2';
import { postAgenda, obtenerHorasDisponibles } from '../../src/api/rutasApiAgenda';
import { getListarServicios } from '../../src/api/rutasApiServicio';
import HorarioCarousel from '../../src/components/HorarioCarousel';


const CrearAgenda = ({ handleCloseModal }) => {



  const [servicios, setServicios] = useState([]);
  const [fecha, setFecha] = useState('');
  const [horaSeleccionada, setHoraSeleccionada] = useState('');
  const [documento, setDocumento] = useState('');

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

  const generarHorasDisponibles = () => {
    return horasDisponibles;
  };


  return (
    <div className="formulario-contenedor"> {/* Contenedor del formulario */}
      <Formik
        initialValues={{
          fecha: '',
          hora: '',
          id_empleado: 52,
          documento: '',
          servicios: [],
        }}
        validate={(values) => {
          const errors = {};

          if (!values.fecha) {
            errors.fecha = 'Este campo es requerido';
          }
          if (!values.servicios || values.servicios.length === 0) {
            errors.servicios = 'Debes seleccionar al menos un servicio.';
          }
          if (!values.hora) {
            errors.hora = 'Debes seleccionar una hora.';
          }

          if (!values.documento) {
            errors.documento = 'Este campo es requerido';
          } else if (
            !/^[0-9]+$/.test(values.documento) ||
            values.documento.length < 7 ||
            values.documento.length > 10
          ) {
            errors.documento =
              'El documento debe tener 7-10 dígitos y solo números.';
          }

          return errors;
        }}
        enableReinitialize={true}
        onSubmit={async (values) => {
         
    try {
        if (values != null) {
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          });
  
          swalWithBootstrapButtons.fire({
            title: 'Confirmar el envío del formulario?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Aceptar!',
            cancelButtonText: 'Cancelar!',
            buttons: true
          }).then(async (result) => {
            if (result.isConfirmed) {
              try {
                const data = {
                  fecha,
                  hora: horaSeleccionada,
                  id_Empleado: 45,
                  servicios: servicios.map(servicio => ({ id_Servicio: servicio.id_Servicio })),
                  documento
                };
  
                const response = await postAgenda(data);
                console.log("esta es la respuesta", response);
                console.log("este es el data", data)
                
                if (response.data && response.data.error) {
                  if (response.data.error === 'Cliente no encontrado. Debe registrarse primero.') {
                    Swal.fire({
                      icon: 'error',
                      title: 'Error',
                      text: 'Cliente no encontrado. Debe registrarse primero.',
                    });
                  } else if (response.data.error === 'el id de agenda ya existe') {
                    Swal.fire({
                      icon: 'error',
                      title: 'Error',
                      text: 'El documento de agenda ya existe.',
                    });
                  } else {
                    Swal.fire({
                      icon: 'error',
                      title: 'Error',
                      text: response.data.error,
                    });
                  }
                } else {
                  if (response.data && response.data.agenda) {
                    swalWithBootstrapButtons.fire(
                      'Registro Enviado!',
                    ).then(() => {
                      handleCloseModal();
                        
                    });
                  } else {
                    swalWithBootstrapButtons.fire(
                      'Registro Enviado!',
                    ).then(() => {
                        
                        handleCloseModal();
                    });
                  }
                }
              } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.response.data.error,
                  });
              }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              swalWithBootstrapButtons.fire(
                'Se canceló el envío',
                'error'
              );
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    }}


      >
        {({ handleChange, handleSubmit, values, errors, isValid }) => (
          <div className="containerr">
            <div className="row pt-5 card">
              <div className="col-md-12">
                <h5 className="card-title">Agregar agenda</h5>
                <Form onSubmit={handleSubmit} className="row g-3 needs-validation">
                  <div className="col-md-6">
                    <div className='mb-3'>
                    </div>
                    <div className="mb-3">
                      <div className="mb-3">
                        <Field
                          type="text"
                          name="documento"
                          label='Documento del cliente'
                          as={TextField}
                          onChange={(e) => {
                            handleChange(e);
                            setDocumento(e.target.value);
                          }}
                          value={values.documento}
                          style={{ width: '100%', height: '40px', marginBottom: '15px' }}
                        />
                      </div>
                      
                      <div className="mb-3">

                      <HorarioCarousel
                        horasDisponibles={generarHorasDisponibles()}
                        horaSeleccionada={horaSeleccionada}
                        handleSeleccionarHora={(hora) => {
                          setHoraSeleccionada(hora);
                          handleChange({
                            target: {
                              name: 'hora',
                              value: hora,
                            },
                          });
                          console.log('Hora seleccionadaaaaa:', hora);
                        }}
                      />
                    </div>
                    {errors.hora && (
                      <div className='invalid-feedback'>{errors.hora}</div>
                    )}
                    <p>Hora seleccionada: {horaSeleccionada}</p>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                    </div>
                    <div className="mb-3">
                      <Autocomplete
                        multiple
                        id="servicios"
                        options={serviciosDisponibles}
                        className={` ${errors.servicios ? 'is-invalid' : 'is-valid'}`}
                        getOptionLabel={(option) => option.nombre}
                        getOptionSelected={(option, value) => option.id_Servicio === value.id_Servicio}
                        value={servicios}
                        onChange={(_, newValue) => {
                          setServicios(newValue);
                          handleChange({
                            target: {
                              name: 'servicios',
                              value: newValue,
                            },
                          });
                        }}
                        renderInput={(params) => (
                          <TextField {...params} label='Servicios' variant='outlined' />
                        )}
                      />
                      {errors.servicios && (
                        <div className='invalid-feedback'>{errors.servicios}</div>
                      )}
                    </div>
                    <div className="mb-3">
                      <Field
                        type="date"
                        name="fecha"
                        id="fecha"
                        className={` ${errors.fecha ? 'is-invalid' : 'is-valid'}`}
                        as={TextField}
                        value={values.fecha}
                        onChange={(e) => {
                          setFecha(e.target.value);
                          handleChange(e);
                        }}
                        required
                        style={{ width: '100%', height: '40px', marginBottom: '15px' }}
                      />
                      {errors.fecha && <div className='invalid-feedback'>{errors.fecha}</div>}
                    </div>
                    
                  </div>
                  <div className="col-md-6">
                  </div>
                  <div className="col-md-12 d-flex justify-content-between">
                    <button className="btn btn-dark" type="submit" disabled={!isValid}>
                      Agregar
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        )}
      </Formik>                                     

    </div>
    
  );
  
};

export default CrearAgenda;
