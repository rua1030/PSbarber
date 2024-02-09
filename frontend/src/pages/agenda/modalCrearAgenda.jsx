import React, { useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import Swal from 'sweetalert2';
import { postAgenda, obtenerHorasDisponibles } from '../../api/rutasApiAgenda';
import { getListarServicios } from '../../api/rutasApiServicio';
import HorarioCarousel from '../../components/HorarioCarousel';

const ModalCrearAgenda = ({ handleCloseModal }) => {

  const [servicios, setServicios] = useState([]);
  const [fecha, setFecha] = useState('');
  const [horaSeleccionada, setHoraSeleccionada] = useState('');
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


  const generarHorasDisponibles = () => {
    return horasDisponibles;
  };

//   const seleccionarHora = (hora) => {
//     setHoraSeleccionada(hora);
//   };
  return (
    <>
      <Formik
        initialValues={{
          nombre: '',
          correo: '',
          telefono: '',
          fecha: '',
          hora:'',
          id_empleado:51,
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

          // Validaciones para el campo "nombre"    
          if (!values.nombre) {
            errors.nombre = 'Este campo es requerido';
          } else if (!/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(values.nombre)) {
            errors.nombre =
              'Este campo solo debe contener letras. Puede incluir un espacio entre nombres y apellidos.';
          }

          // Validaciones para el campo "correo"
          if (!values.correo) {
            errors.correo = 'Este campo es requerido';
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.correo)) {
            errors.correo = 'Correo electrónico no válido';
          }

          // Validaciones para el campo "telefono"
          if (!values.telefono) {
            errors.telefono = 'Este campo es requerido';
          } else if (
            !/^[0-9]+$/.test(values.telefono) ||
            values.telefono.length < 7 ||
            values.telefono.length > 10
          ) {
            errors.telefono =
              'El teléfono debe tener 7-10 dígitos y solo números.';
          }

          // Agregar más validaciones para "servicios", "fecha" y "hora" si es necesario

          return errors;
        }}
        enableReinitialize={true}
                    onSubmit={async (values) => {
                        try {
                            if (!values.correo.includes("@") || !values.correo.includes(".com")) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Correo no valido',
                                    text: 'Por favor ingresar un correo valido!',
                                });
                            } else {
                                const swalWithBootstrapButtons = Swal.mixin({
                                    customClass: {
                                        confirmButton: 'btn btn-success',
                                        cancelButton: 'btn btn-danger'
                                    },
                                    buttonsStyling: false
                                });
    
                                swalWithBootstrapButtons.fire({
                                    title: 'Confirmar el envio del formulario?',
                                    text: "",
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonText: 'Aceptar!',
                                    cancelButtonText: 'Cancelar!',
                                    buttons: true
                                }).then(async (result) => {
                                    if (result.isConfirmed) {
                                        try {
                                            console.log('values:', values);
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
                                            console.log(response);
    
                                            if (response.data && response.data.error) {
                                                // Verificar errores específicos
                                                if (response.data.error === 'el id de agenda ya existe') {
                                                    console.log('Mostrar alerta de agenda existente');
    
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Error',
                                                        text: 'El documento de agenda ya existe.',
                                                    });
                                                } else {
                                                    console.log('Mostrar alerta de otro error');
    
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Error',
                                                        text: response.data.error,
                                                    });
                                                }
                                            } else {
                                                // Verificar si se creó el agenda correctamente
                                                if (response.data && response.data.agenda) {
                                                    // Si no hay errores, redirige a la página de agenda
    
                                                    swalWithBootstrapButtons.fire(
                                                        'Registro Enviado!',
    
                                                    );
                                                } else {
                                                    swalWithBootstrapButtons.fire(
                                                        'Registro Enviado!',
                                                    ).then(() => {
                                                        handleCloseModal()
                                                    })
                                                }
                                            }
                                        } catch (error) {
                                            console.error(error);
                                            swalWithBootstrapButtons.fire(
                                                'Error',
                                                'Ocurrió un error al crear el agenda.',
                                                'error'
                                            );
                                        }
                                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                                        swalWithBootstrapButtons.fire(
                                            'Se cancelo el envio',
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
          <div className="modal-content" style={{ position: 'absolute', top: '0%', left: '0%', transform: 'translate(-50%, -50%)', width: '800px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
          <h5 className="card-title">Agregar agenda</h5>
          <Form onSubmit={handleSubmit} className="row g-3 needs-validation">
              <div className="col-md-6">
                  <div className='mb-3'>
                      
                      
    
                  </div>

                  <div className="mb-3">
                      <Field
                          type="text"
                          name="nombre"
                          label='Nombre'
                          onChange={(e) =>{
                            handleChange(e)
                            setNombre(e.target.value)}
                           }
                          value={values.nombre}
                          as={TextField}
                          className={`${values.nombre && /^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(values.nombre) ? 'is-valid' : 'is-invalid'}`}
                          InputProps={{
                              endAdornment: (
                                  <React.Fragment>
                                      {values.nombre && /^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(values.nombre) ? (
                                          <CheckIcon style={{ color: 'green' }} />
                                      ) : (
                                          <ErrorIcon style={{ color: 'red' }} />
                                      )}
                                  </React.Fragment>
                              ),
                          }}


                          required
                          style={{ width: '100%', height: '40px', marginBottom: '15px' }}
                      />
                      {errors.nombre && (
                          <div className='invalid-feedback'>{errors.nombre}</div>
                      )}
                  </div>
                  <div className="mb-3">
                  <Field
                          type="text"
                          name="telefono"
                          label='Telefono'
                          className={` ${errors.telefono ? 'is-invalid' : 'is-valid'}`}
                          id="telefono"
                          as={TextField}
                          onChange={(e) => { 
                              setTelefono(e.target.value)
                              handleChange(e);
                              if (/^[0-9]+$/.test(e.target.value) && e.target.value.length >= 7 && e.target.value.length <= 10) {
                                  document.getElementById('telefono').classList.add('is-valid');
                                  document.getElementById('telefono').classList.remove('is-invalid');
                              } else {
                                  document.getElementById('telefono').classList.add('is-invalid');
                                  document.getElementById('telefono').classList.remove('is-valid');
                              }
                          }}
                          value={values.telefono}
                          required
                          InputProps={{
                              endAdornment: (
                                  <React.Fragment>
                                      {values.telefono ? (
                                          /^[0-9]+$/.test(values.telefono) && values.telefono.length >= 7 && values.telefono.length <= 10 ? (
                                              <CheckIcon style={{ color: 'green' }} />
                                          ) : (
                                              <ErrorIcon style={{ color: 'red' }} />
                                          )
                                      ) : (
                                          <ErrorIcon style={{ color: 'red' }} />
                                      )}
                                  </React.Fragment>
                              ),
                          }}
                          style={{ width: '100%', height: '40px', marginBottom: '15px' }}
                      />
                      {errors.telefono && (
                          <div className='invalid-feedback'>{errors.telefono}</div>
                      )}
                  </div>
                  <div className="mb-3">
                  <Field
                          type="correo"
                          name="correo"
                          id="correo"
                          label=""
                          className={`${values.correo && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.correo) ? 'is-valid' : 'is-invalid'
                              }`}
                          as={TextField}
                          onChange={(e) =>{
                            handleChange(e)
                            setCorreo(e.target.value)}
                           }
                          value={values.correo}
                          aria-describedby="inputGroupPrepend"
                          required
                          InputProps={{
                              endAdornment: (
                                  <React.Fragment>
                                      {values.correo && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.correo) ? (
                                          <CheckIcon style={{ color: 'green' }} />
                                      ) : (
                                          <ErrorIcon style={{ color: 'red' }} />
                                      )}
                                  </React.Fragment>
                              ),
                          }}
                          style={{ width: '100%', height: '40px', marginBottom: '15px' }}
                      />
                      {errors.correo && <div className="invalid-feedback">{errors.correo}</div>}
                 

                  </div>
                  <div className="mb-3">
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
              <div className="col-md-6">

              </div>
              <div className="col-md-12 d-flex justify-content-between">
                  <button className="btn btn-dark" type="submit" disabled={!isValid}>
                      Agregar
                  </button>
                  <button type="button" className="btn btn-danger" onClick={handleCloseModal}>
                      Cancelar
                  </button>
              </div>

          </Form>
      </div>    
        )}
      </Formik>
    </>
  );
};

export default ModalCrearAgenda;
