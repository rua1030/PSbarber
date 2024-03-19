/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Form, Formik, Field } from 'formik';
import { postRol, listarPermiso } from '../../api/rutasApiRol';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import Swal from 'sweetalert2';
import Autocomplete from '@mui/material/Autocomplete';
import { getListarEmpleadoauto } from '../../api/rutasApi'; 

const CrearRol = ({ handleCloseModal }) => {
  const [permisosDisponibles, setPermisosDisponibles] = useState([]);
  const [empleadosDisponibles, setEmpleadosDisponibles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPermisos = async () => {
      try {
        const response = await listarPermiso();
        setPermisosDisponibles(response.data);
      } catch (error) {
        console.error('Error al obtener permisos', error);
      }
    };

    fetchPermisos();
  }, []);

 useEffect(() => {
  const fetchEmpleados = async () => {
    try {
      const response = await getListarEmpleadoauto();
      setEmpleadosDisponibles(response.data);
    } catch (error) {
      console.error('Error al obtener empleados', error);
    }
  };

  fetchEmpleados();
}, []);

  return (
    <div className="modal-content" style={{ width: '600px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
      <h5 className="card-title">Agregar nombre rol</h5>
      <Formik
        initialValues={{
          nombre: '',
          permisos: [],
          empleado: '', // Cambiado de 'id_Empledo' a 'empleado'
        }}
        validate={(values) => {
          const errors = {};
          if (!values.nombre) {
            errors.nombre = 'Este campo es requerido';
          } else if (!/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(values.nombre)) {
            errors.nombre = 'Este campo solo debe contener letras. Puede incluir un espacio entre nombres y apellidos.';
          }
          return errors;
        }}
        onSubmit={async (values) => {
          try {
            const swalWithBootstrapButtons = Swal.mixin({
              customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
              },
              buttonsStyling: false
            });

            const result = await swalWithBootstrapButtons.fire({
              title: 'Confirmar el envío del formulario?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Aceptar!',
              cancelButtonText: 'Cancelar!',
              buttons: true
            });

            if (result.isConfirmed) {
              setLoading(true);
              try {
                const response = await postRol(values);

                if (response.data && response.data.error) {
                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.data.error,
                  });
                } else {
                  Swal.fire('Registro Enviado!');
                  handleCloseModal();
                }
              } catch (error) {
                console.error(error);
                Swal.fire('Error', 'Ocurrió un error al crear el rol.', 'error');
              } finally {
                setLoading(false);
              }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire('Se canceló el envío', 'error');
            }
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({ handleChange, handleSubmit, setFieldValue, values, errors, isValid }) => (
          <Form onSubmit={handleSubmit} className="row g-3 needs-validation">
            <div className="mb-3">
              <Field
                type="text"
                name="nombre"
                label='Nombre del rol'
                onChange={handleChange}
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

            <div className='col-md-12'>
              <Autocomplete
                multiple
                id='permisos'
                name="permisos"
                options={permisosDisponibles}
                getOptionLabel={(option) => option.nombre}
                getOptionSelected={(option, value) => option.id === value.id}
                value={values.permisos}
                onChange={(_, newValue) => {
                  // Selecciona múltiples valores
                  setFieldValue('permisos', newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label='Permisos' variant='outlined' />
                )}
              />
            </div>
            <div className='col-md-12'>
            <Autocomplete

                id='empleados'
                name="empleado" 
                options={empleadosDisponibles}
                getOptionLabel={(option) => option.nombre}
                getOptionSelected={(option, value) => option.id_Empledo === value.id_Empledo}
                value={values.empleado}
                onChange={(_, newValue) => {
                setFieldValue('empleado', newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label='Empleado' variant='outlined' />
                )}
            />
            </div>

            <div className="col-md-12 d-flex justify-content-between">
              <button className="btn btn-dark" type="submit" disabled={!isValid || loading}>
                {loading ? 'Enviando...' : 'Agregar'}
              </button>
              <button type="button" className="btn btn-danger" onClick={handleCloseModal}>
                Cancelar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CrearRol;
