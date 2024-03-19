

import '../../css/pages.css'
import { Field } from 'formik';
import { Form, Formik } from 'formik';
import { postEmpleado } from '../../api/rutasApi';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import React from 'react';
import Swal from 'sweetalert2';
import { useEffect } from 'react'
import { useEmpleado } from '../../context/empleado/empleadoContex';






const opcionesDocumento = [
    { value: 'CC', label: 'Cédula de Ciudadanía (C.C)' },
    { value: 'CE', label: 'Cédula de Extranjería (C.E)' },
];

const opcionesEmpleados = [
    { value: '1', label: 'Barbero' },
    { value: '2', label: 'Servicio' },
    { value: '3', label: 'Administrador' },
];  

// eslint-disable-next-line react/prop-types
const CrearEmpleado = ({ handleCloseModal }) => {

    const { Listar3, cargarTipo_Empleado, Listar, cargarRol } = useEmpleado()

    useEffect(() => {

        cargarRol()
        cargarTipo_Empleado()
    }, []);

    return (
        <>
            <Formik

                initialValues={{

                    tipo_documento:'',
                    documento:'',
                    nombre:'',
                    apellidos:'',
                    telefono:'',
                    id_Tipo_Empleado:'',
                    email:'',
                }}

                validate={async (values) => {
                    const errors = {};

                    // Validaciones para el campo "tipoEmpleado
                    if (!values.id_Tipo_Empleado) {
                        errors.id_Tipo_Empleado = 'Este campo es requerido';
                    }

                    // Validaciones para el campo "tipoDocumento"
                    if (!values.tipo_documento) {
                        errors.tipo_documento = 'Este campo es requerido';
                    }

                    // Validaciones para el campo "nombre"
                   // Validaciones para el campo "nombre"
                        if (!values.nombre) {
                            errors.nombre = 'Este campo es requerido';
                        } else if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+(?: [a-zA-ZñÑáéíóúÁÉÍÓÚ]+)*$/.test(values.nombre)) {
                            errors.nombre = 'Este campo solo debe contener letras. Puede incluir un espacio entre nombres y apellidos.';
                        }

                        // Validaciones para el campo "apellidos"
                        if (!values.apellidos) {
                            errors.apellidos = 'Este campo es requerido';
                        } else if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+(?: [a-zA-ZñÑáéíóúÁÉÍÓÚ]+)?$/.test(values.apellidos)) {
                            errors.apellidos = 'Este campo solo debe contener letras. Puede incluir un espacio entre nombres y apellidos.';
                        }


                    //Validaciones para el campo "documento"
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

                    if (!values.contrasena) {
                        errors.contrasena = 'Este campo es requerido';
                    } else if (values.contrasena.length < 8) {
                        errors.contrasena = 'La contraseña debe tener al menos 8 caracteres';
                    }else if (values.contrasena.length > 15) {
                        errors.contrasena = 'La contraseña debe tener menos de 15  caracteres';
                    }
                     else if (!/(?=.*[A-Z])/.test(values.contrasena)) {
                        errors.contrasena = 'La contraseña debe contener al menos una letra mayúscula';
                    } else if (!/(?=.*[a-z])/.test(values.contrasena)) {
                        errors.contrasena = 'La contraseña debe contener al menos una letra minúscula';
                    } else if (!/(?=.*\d)/.test(values.contrasena)) {
                        errors.contrasena = 'La contraseña debe contener al menos un número';
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
                        if (!values.email.includes("@") || !values.email.includes(".com")) {
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
                                        const response = await postEmpleado(values);
                                        console.log(response);

                                        if (response.data && response.data.error) {
                                            // Verificar errores específicos
                                            if (response.data.error === 'el id de empleado ya existe') {
                                                console.log('Mostrar alerta de empleado existente');

                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'Error',
                                                    text: 'El documento de empleado ya existe.',
                                                });
                                            } else if (response.data.error === 'El correo electrónico ya está registrado') {
                                                // Mostrar alerta específica para correo existente
                                                swalWithBootstrapButtons.fire({
                                                    icon: 'error',
                                                    title: 'Error',
                                                    text: 'El correo electrónico ya está registrado. Por favor, elige otro correo electrónico.',
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
                        <h5 className="card-title">Agregar empleado</h5>
                        <Form onSubmit={handleSubmit} className="row g-3 needs-validation">
                            <div className="col-md-6">
                                <div className='mb-3'>
                                    <label htmlFor="tipoEmpleado" className="form-label">
                                        Tipo de empleado
                                    </label>
                                    <select
                                        className={`form-select ${errors.id_Tipo_Empleado ? 'is-invalid' : values.id_Tipo_Empleado ? 'is-valid' : ''}`}
                                        name="id_Tipo_Empleado"
                                        value={values.id_Tipo_Empleado}
                                        onChange={handleChange}
                                        aria-describedby="tipoDocumentoFeedback"
                                    >
                                        <option value="">Seleccionar</option>
                                        {opcionesEmpleados.map(opcion => (
                                            <option key={opcion.value} value={opcion.value}>
                                                {opcion.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.id_Tipo_Empleado && (
                                        <div id="tipoDocumentoFeedback" className="invalid-feedback">
                                            {errors.id_Tipo_Empleado}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <Field
                                        type="text"
                                        name="nombre"
                                        label='Nombre'
                                        onChange={handleChange}
                                        value={values.nombre}
                                        as={TextField}
                                        className={`${values.nombre && /^[a-zA-Z-ñÑáéíóúÁÉÍÓÚ]+(?: [a-zA-Z-ñÑáéíóúÁÉÍÓÚ]+)*$/.test(values.nombre) ? 'is-valid' : 'is-invalid'}`}
                                        InputProps={{
                                            endAdornment: (
                                                <React.Fragment>
                                                    {values.nombre && /^[a-zA-Z-ñÑáéíóúÁÉÍÓÚ]+(?: [a-zA-Z-ñÑáéíóúÁÉÍÓÚ]+)*$/.test(values.nombre) ? (
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
                                        className={`${values.apellidos && /^[a-zA-Z-ñÑáéíóúÁÉÍÓÚ]+(?: [a-zA-Z-ñÑáéíóúÁÉÍÓÚ]+)*$/.test(values.apellidos) ? 'is-valid' : 'is-invalid'}`}
                                        id="apellidos"
                                        required
                                        as={TextField}
                                        onChange={handleChange}
                                        value={values.apellidos} // <-- Ajusta aquí
                                        InputProps={{
                                            endAdornment: (
                                                <React.Fragment>
                                                    {values.apellidos && /^[a-zA-Z-ñÑáéíóúÁÉÍÓÚ]+(?: [a-zA-Z-ñÑáéíóúÁÉÍÓÚ]+)*$/.test(values.apellidos) ? (
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
                                    type={values.showPassword ? 'text' : 'password'}
                                    name="contrasena"
                                    label='Contraseña'
                                    onChange={handleChange}
                                    value={values.contrasena}
                                    as={TextField}
                                    className={`${values.contrasena && /(?=.*[A-Z-ñ])+(?=.*[a-z])+(?=.*\d)/.test(values.contrasena) ? 'is-valid' : 'is-invalid'}`}
                                    InputProps={{
                                        endAdornment: (
                                            <React.Fragment>
                                                {values.contrasena ? (
                                                    /(?=.*[A-Z-ñ])+(?=.*[a-z])+(?=.*\d).{8,15}/.test(values.contrasena) && values.contrasena.length >= 8 && values.contrasena.length <= 15 ? (
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
                                    required
                                    style={{ width: '100%', height: '100%', marginBottom: '15px' }}
                                />
                                {errors.contrasena && (
                                    <div className='invalid-feedback'>{errors.contrasena}</div>
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
                                <div className="mb-3">
                                    <Field
                                        type="text"
                                        name="email"
                                        id="email"
                                        label="Email"
                                        className={`${values.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) ? 'is-valid' : 'is-invalid'
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
export default CrearEmpleado;
