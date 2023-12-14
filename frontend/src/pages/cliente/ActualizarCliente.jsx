    /* eslint-disable react/prop-types */
    import '../../css/pages.css'
    import { Field } from 'formik';
    import { Form, Formik } from 'formik';
    import TextField from '@mui/material/TextField';
    import CheckIcon from '@mui/icons-material/Check';
    import ErrorIcon from '@mui/icons-material/Error';
    import { useParams} from 'react-router-dom'
    import React from 'react';
    import Swal from 'sweetalert2';
    import { useEffect } from 'react'

    import {useCliente} from "../../context/cliente/contexCliente"
    // import { useCliente } from '../../context/cliente/contexCliente';
    import { actualizarCliente } from '../../api/rutasApiCliente';


        


    const opcionesDocumento = [
        { value: 'TI', label: 'Tarjeta de Identidad (T.I)' },
        { value: 'CC', label: 'Cédula de Ciudadanía (C.C)' },
        { value: 'CE', label: 'Cédula de Extranjería (C.E)' },
    ];

    const CrearCliente = ({handleCloseModal2,clienteId}) => {

      const {ListarActualizar,cargarDatosClientes,validacionActualizar}=useCliente()
      const params =useParams()

        
      useEffect(()=>{
      
        validacionActualizar(clienteId)
        cargarDatosClientes(params.id_Cliente)

      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[params.id_Cliente,clienteId])

      const handleCancel = () => {
        Swal.fire("Actualización cancelada", "Su archivo está seguro", "error");
      };

      const handleFormSubmit = async (values) => {
        try {
          const result = await Swal.fire({
            title: "Confirmar actualización?",
            text: "Tu registro será actualizado",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            buttons: true,
          });
          
          if (result.isConfirmed) {
            await actualizarCliente(clienteId, values)
              .then((response) => {
                if (response.status === 200) {
                  Swal.fire({
                    icon: "success",
                    title: "Actualización exitosa",
                    text: "Su archivo ha sido actualizado.",
                  });
                  handleCloseModal2();
                } else if (response.status === 400 && response.data.error) {
                  Swal.fire({
                    icon: "error",
                    title: "Cliente ya registrado",
                    text: response.data.error,
                  });
                } else {
                  Swal.fire({
                    icon: "error",
                    title: "Error en la solicitud",
                    text: "Error al actualizar el cliente.",
                  });
                }
              })
              .catch(() => {
                Swal.fire({
                  icon: "error",
                  title: "Error en la solicitud",
                  text: "Documento existente en la base de datos",
                });
              });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            handleCancel();
          }
        } catch (error) {
          console.error(error);
        }
      };
    

        return (
            <>
                <Formik
                     initialValues={ListarActualizar}
                     enableReinitialize={true}
                     onSubmit={
                         handleFormSubmit
                     }
                    
                    validate={async (values) => {
                        const errors = {};
                    
                        // Validaciones para el campo "tipoDocumento"
                        if (!values.tipo_documento) {
                            errors.tipo_documento = 'Este campo es requerido';
                        }
                    
                        // Validaciones para el campo "nombre"
                        if (!values.nombre) {
                            errors.nombre = 'Este campo es requerido';
                        } else if (!/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(values.nombre)) {
                            errors.nombre = 'Este campo solo debe contener letras. Puede incluir un espacio entre nombres y apellidos.';
                        }
                    
                        // Validaciones para el campo "apellidos"
                        if (!values.apellidos) {
                            errors.apellidos = 'Este campo es requerido';
                        } else if (!/^[a-zA-Z]+(?: [a-zA-Z]+)?$/.test(values.apellidos)) {
                            errors.apellidos = 'Este campo solo debe contener letras. Puede incluir un espacio entre nombres y apellidos.';
                        }
                    
                        // Validaciones para el campo "documento"
                        if (!values.documento) {
                            errors.documento = 'Este campo es requerido';
                        } else if (!/^[0-9]+$/.test(values.documento) || values.documento.length < 7 || values.documento.length > 10) {
                            errors.documento = 'El documento debe tener 7-10 dígitos y solo números.';
                        }
                    
                        // Validaciones para el campo "email"
                        if (!values.email) {
                            errors.email = 'Este campo es requerido';
                        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
                            errors.email = 'Correo electrónico no válido';
                        }
                    
                        // Validaciones para el campo "telefono"
                        if (!values.telefono) {
                            errors.telefono = 'Este campo es requerido';
                        } else if (!/^[0-9]+$/.test(values.telefono) || values.telefono.length < 7 || values.telefono.length > 10) {
                            errors.telefono = 'El teléfono debe tener 7-10 dígitos y solo números.';
                        }

                    
                        // Validación para no-leading-trailing-space en cualquier campo
                        for (const key in values) {
                            if (typeof values[key] === 'string' && /^\s|\s$/.test(values[key])) {
                                errors[key] = 'No debe empezar ni terminar con un espacio en blanco';
                            }
                        }
                    
                        return errors;
                    }}
                    >
                    {({ handleChange, handleSubmit, values, errors, isValid }) => (
                        <div className="modal-content justify-content-center" style={{ position: 'absolute', top: '0%', left: '0%', transform: 'translate(-50%, -50%)', width: '800px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px',textAlign:'center' }}>
                            <h5 className="card-title">Actualizar cliente</h5>
                            <Form onSubmit={handleSubmit} className="row g-3 needs-validation">
                                <div className="col-md-6">
                                <div className="mb-3 mt-3">
                                    <Field
                                        type="text"
                                        name="nombre"
                                        label='Nombre'
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
                                    <div className="mb-3">
                                    <Field
                                        type="text"
                                        name="apellidos"
                                        label='Apellidos'
                                        className={`${values.apellidos && /^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(values.apellidos) ? 'is-valid' : 'is-invalid'}`}
                                        id="apellidos"
                                        required
                                        as={TextField}
                                        onChange={handleChange}
                                        value={values.apellidos} // <-- Ajusta aquí
                                        InputProps={{
                                            endAdornment: (
                                                <React.Fragment>
                                                    {values.apellidos && /^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(values.apellidos) ? (
                                                        <CheckIcon style={{ color: 'green' }} />
                                                    ) : (
                                                        <ErrorIcon style={{ color: 'red' }} />
                                                    )}
                                                </React.Fragment>
                                            ),
                                        }}
                                        style={{ width: '100%', height: '40px', marginBottom: '15px' }}
                                    />
                                    {errors.apellidos && (
                                        <div className='invalid-feedback'>{errors.apellidos}</div>
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
                                </div>
                                <div className="col-md-6">
                            

                                <div className="mb-3">
                                <label htmlFor="tipoDocumento" className="form-label">
                                    Tipo de Documento
                                </label>
                                <select
                                    className={`form-select ${errors.tipo_documento ? 'is-invalid' : values.tipo_documento ? 'is-valid' : ''}`}
                                    name="tipo_documento"
                                    value={values.tipo_documento}
                                    onChange={handleChange}
                                    aria-describedby="tipoDocumentoFeedback"
                                >
                                    <option value="">Seleccionar</option>
                                    {opcionesDocumento.map(opcion => (
                                    <option key={opcion.value} value={opcion.value}>
                                        {opcion.label}
                                    </option>
                                    ))}
                                </select>
                                {errors.tipo_documento && (
                                    <div id="tipoDocumentoFeedback" className="invalid-feedback">
                                    {errors.tipo_documento}
                                    </div>
                                )}
                                </div>

                                <div className="mb-3">
                                    <Field
                                        type="text"
                                        name="documento"
                                        id="documento"
                                        label='Documento'
                                        className={`${values.documento && /^[0-9]+$/.test(values.documento) ? 'is-valid' : 'is-invalid'}`}
                                        as={TextField}
                                        onChange={(e) => {
                                            handleChange(e);
                                            if (/^[0-9]+$/.test(e.target.value) && e.target.value.length >= 7 && e.target.value.length <= 10) {
                                                document.getElementById('documento').classList.add('is-valid');
                                                document.getElementById('documento').classList.remove('is-invalid');
                                            } else {
                                                document.getElementById('documento').classList.add('is-invalid');
                                                document.getElementById('documento').classList.remove('is-valid');
                                            }
                                        }}
                                        value={values.documento}
                                        required
                                        InputProps={{
                                            endAdornment: (
                                                <React.Fragment>
                                                    {values.documento ? (
                                                        /^[0-9]+$/.test(values.documento) && values.documento.length >= 7 && values.documento.length <= 10 ? (
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

                                    {errors.documento && (
                                        <div className='invalid-feedback'>{errors.documento}</div>
                                    )}
                                </div>
                                    
                                    <div className="mb-3">
                                    <Field
                                        type="text"
                                        name="email"
                                        id="email"
                                        label="Email"
                                        className={`${
                                        values.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) ? 'is-valid' : 'is-invalid'
                                        }`}
                                        as={TextField}
                                        onChange={handleChange}
                                        value={values.email}
                                        aria-describedby="inputGroupPrepend"
                                        required
                                        InputProps={{
                                        endAdornment: (
                                            <React.Fragment>
                                            {values.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) ? (
                                                <CheckIcon style={{ color: 'green' }} />
                                            ) : (
                                                <ErrorIcon style={{ color: 'red' }} />
                                            )}
                                            </React.Fragment>
                                        ),
                                        }}
                                        style={{ width: '100%', height: '40px', marginBottom: '15px' }}
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </div>  

                                </div>
                                <div className="col-md-6">
                                
                                </div>
                                <div className="col-md-12 d-flex justify-content-between">
                                    <button className="btn btn-dark" type="submit" disabled={!isValid}>
                                        Agregar
                                    </button>
                                    <button type="button" className="btn btn-danger" onClick={handleCloseModal2}>
                                        Cancelar
                                    </button>
                                </div>

                            </Form>
                        </div>
                    )}
                </Formik>
            </>
        );
    }
    export default CrearCliente;
