    /* eslint-disable react/prop-types */

    import '../../css/pages.css'
    import { Field } from 'formik';
    import { Form, Formik } from 'formik';
    import { postServicio } from '../../api/rutasApiServicio';
    import TextField from '@mui/material/TextField';
    import CheckIcon from '@mui/icons-material/Check';
    import ErrorIcon from '@mui/icons-material/Error';
    import React from 'react';
    import Swal from 'sweetalert2';
    import { useEffect } from 'react'
    // import { useServicio } from '../../context/Servicio/contexServicio';


        


    const opcionesDocumento = [
        { value: 'TI', label: 'Tarjeta de Identidad (T.I)' },
        { value: 'CC', label: 'Cédula de Ciudadanía (C.C)' },
        { value: 'CE', label: 'Cédula de Extranjería (C.E)' },
    ];

    const CrearServicio = ({handleCloseModal}) => {


        
        useEffect(()=>{

        },[]);

        return (
            <>

                <Formik

                    initialValues={{
                        tipo_documento: '',
                        documento: '',
                        nombre: '',
                        apellidos: '',
                        telefono: '',
                        email: '',
                    }}
                    
                    validate={async (values) => {
                        const errors = {};
                    
                        // Validaciones para el campo "nombre"
                        if (!values.nombre) {
                            errors.nombre = 'Este campo es requerido';
                        } else if (!/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(values.nombre)) {
                            errors.nombre = 'Este campo solo debe contener letras. Puede incluir un espacio entre las palabras.';
                        }
                    
                        // Validaciones para el campo "apellidos"
                        if (!values.precio) {
                            errors.precio = 'Este campo es requerido y solo se permiten numeros';
                        }else if (!/^[+-]?\d*\.?\d*$/.test(values.precio)) {
                            errors.precio = 'El precio debe ser un número';
                        } else if (parseFloat(values.precio) <= 0) {
                            errors.precio = 'El precio debe ser mayor que cero';
                        }

                    
                        // Validación para no-leading-trailing-space en cualquier campo
                        for (const key in values) {
                            if (typeof values[key] === 'string' && /^\s|\s$/.test(values[key])) {
                                errors[key] = 'No debe empezar ni terminar con un espacio en blanco';
                            }
                        }
                    
                        return errors;
                    }}
                    
                    
                    enableReinitialize={true}
                    onSubmit={async (values) => {
                        try {
                            {
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
                                            const response = await postServicio(values);
                                            console.log(response);
    
                                            if (response.data && response.data.error) {
                                                // Verificar errores específicos
                                                if (response.data.error === 'el id de servicio ya existe') {
                                                    console.log('Mostrar alerta de empleado existente');
    
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Error',
                                                        text: 'El nombre del servicio ya existe.',
                                                    });
                                                } 
                                                else {
                                                    console.log('Mostrar alerta de otro error');
    
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Error',
                                                        text: response.data.error,
                                                    });
                                                }
                                            }else {
                                                // Verificar si se creó el empleado correctamente
                                                if (response.data && response.data.empleado) {
                                                    // Si no hay errores, redirige a la página de empleado
    
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
                                                'Ocurrió un error al crear el empleado.',
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
                            <h5 className="card-title">Agregar Servicio</h5>
                            <Form onSubmit={handleSubmit} className="row g-3 needs-validation">
                                <div className="">
                                <div className="mb-3 mt-3">
                                    <Field
                                        type="text"
                                        name="nombre"
                                        label='Nombre del servicio'
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
                                    <div className="">
                                    <Field
    type="number"  // Cambié el tipo a "text" para permitir texto y números
    name="precio"
    label='Precio'
    className={`${errors.precio ? 'is-invalid' : ''}`}
    id="precio"
    required
    as={TextField}
    onChange={handleChange}
    value={values.precio}
    InputProps={{
        endAdornment: (
            <React.Fragment>
                {errors.precio ? (
                    <ErrorIcon style={{ color: 'red' }} />
                ) : (
                    <CheckIcon style={{ color: 'green' }} />
                )}
            </React.Fragment>
        ),
    }}
    style={{ width: '100%', height: '40px', marginBottom: '15px' }}
/>
{errors.precio && (
    <div className='invalid-feedback'>{errors.precio}</div>
)}


                                    </div>
                                    
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
    }
    export default CrearServicio;
