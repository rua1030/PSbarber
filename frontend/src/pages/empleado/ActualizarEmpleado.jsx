// Importar bibliotecas de terceros
import React, { useEffect } from 'react';
import { Form, Formik, Field } from 'formik';
import { useParams} from 'react-router-dom'
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import Select from 'react-select';
import Swal from 'sweetalert2';


// Importar archivos locales
import { useEmpleado } from '../../context/empleado/empleadoContex';
import { actualizarEmpleado } from '../../api/rutasApi';



const opcionesTipoDocumento = [
    { value: 'TI', label: 'Tarjeta de Identidad (T.I)' },
    { value: 'CC', label: 'Cédula de Ciudadanía (C.C)' },
    { value: 'CE', label: 'Cédula de Extranjería (C.E)' },
];



const ActualizarEmpleado = ({handleCloseModal2,empleadoId}) => {
    const {Listar3,cargarTipo_Empleado,Listar,cargarRol,ListarActualizar,cargarDatosEmpleados,validacionActualizar}=useEmpleado()
    const params =useParams()


    useEffect(()=>{
      
        validacionActualizar(empleadoId)
        cargarRol()
        cargarTipo_Empleado()
        cargarDatosEmpleados(params.id_Empleado)

      },[params.id_Empleado,empleadoId])



      
    //   const handleCancel = () => {
    //     Swal.fire("Actualización cancelada", "Su archivo está seguro", "error");
    //   };

    //   const handleFormSubmit = async (values) => {
    //     try {
    //         const result = await Swal.fire({
    //             title: "Confirmar actualización?",
    //             text: "Tu registro será actualizado",
    //             icon: "warning",
    //             showCancelButton: true,
    //             confirmButtonText: "Aceptar",
    //             cancelButtonText: "Cancelar",
    //             buttons: true,
    //         });
    
    //         if (result.isConfirmed) {
    //             const response = await actualizarEmpleado(empleadoId, values);
    
    //             if (response.status === 200) {
    //                 Swal.fire({
    //                     icon: "success",
    //                     title: "Actualización exitosa",
    //                     text: "Su archivo ha sido actualizado.",
    //                 });
    //                 handleCloseModal2();
    //             } else if (response.status === 400) {
    //                 if (response.data && response.data.error) {
    //                     if (response.data.error === 'El correo electrónico ya está registrado por otro empleado') {
    //                         Swal.fire({
    //                             icon: 'error',
    //                             title: 'Error',
    //                             text: 'El correo electrónico ya está registrado por otro empleado. Por favor, elige otro correo electrónico.',
    //                         });
    //                     } else {
    //                         Swal.fire({
    //                             icon: 'error',
    //                             title: 'Error',
    //                             text: response.data.error,
    //                         });
    //                     }
    //                 } else {
    //                     Swal.fire({
    //                         icon: 'error',
    //                         title: 'Error en la solicitud',
    //                         text: 'Error al actualizar el empleado.',
    //                     });
    //                 }
    //             } else {
    //                 Swal.fire({
    //                     icon: 'error',
    //                     title: 'Error en la solicitud',
    //                     text: 'Error al actualizar el empleado.',
    //                 });
    //             }
    //         } else if (result.dismiss === Swal.DismissReason.cancel) {
    //             handleCancel();
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };
    
    
    

    return (
        <>

            <Formik
                initialValues={ListarActualizar}
                enableReinitialize={true}
                onSubmit={async (values) => {
                    try {
                        if (!values.email.includes("@") || !values.email.includes(".com")) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Correo no valido',
                                text: 'Por favor, ingresa un correo válido.',
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
                                        const response = await actualizarEmpleado(empleadoId, values);
                
                                        if (response.status === 200) {
                                            swalWithBootstrapButtons.fire({
                                                icon: 'success',
                                                title: 'Actualización exitosa',
                                                text: 'El archivo ha sido actualizado.',
                                            });
                                            handleCloseModal2();
                                        } else if (response.status === 400) {
                                            if (response.data && response.data.error) {
                                                if (response.data.error === 'Documento ya existente en la base de datos') {
                                                    swalWithBootstrapButtons.fire({
                                                        icon: 'error',
                                                        title: 'Error',
                                                        text: 'El documento de empleado ya existe.',
                                                    });
                                                } else if (response.data.error === 'El correo electrónico ya está registrado por otro empleado') {
                                                    swalWithBootstrapButtons.fire({
                                                        icon: 'error',
                                                        title: 'Error',
                                                        text: 'El correo electrónico ya está registrado por otro empleado. Por favor, elige otro correo electrónico.',
                                                    });
                                                } else {
                                                    swalWithBootstrapButtons.fire({
                                                        icon: 'error',
                                                        title: 'Error',
                                                        text: response.data.error,
                                                    });
                                                }
                                            } else {
                                                swalWithBootstrapButtons.fire({
                                                    icon: 'error',
                                                    title: 'Error en la solicitud',
                                                    text: 'Error al actualizar el empleado.',
                                                });
                                            }
                                        } else {
                                            swalWithBootstrapButtons.fire({
                                                icon: 'error',
                                                title: 'Error en la solicitud',
                                                text: 'Error al actualizar el empleado.',
                                            });
                                        }
                                    } catch (error) {
                                        console.error(error);
                                        swalWithBootstrapButtons.fire({
                                            icon: 'error',
                                            title: 'Error',
                                            text: 'Ocurrió un error al actualizar el empleado. Revisa el correo y documento, puede que otro empleado lo tenga en uso.',
                                        });
                                    }
                                } else if (result.dismiss === Swal.DismissReason.cancel) {
                                    swalWithBootstrapButtons.fire({
                                        icon: 'error',
                                        title: 'Se canceló el envío',
                                    });
                                }
                            });
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }}


                validate={async (values) => {
                    const errors = {};
                
                    // Validaciones para el campo "tipoEmpleado"
                    if (!values.id_Tipo_Empleado) {
                        errors.id_Tipo_Empleado = 'Este campo es requerido';
                    }
                
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
                {({ handleChange    , handleSubmit, values, errors, isValid }) => (
                    <div className="modal-content" style={{ position: 'absolute', top: '0%', left: '0%', transform: 'translate(-50%, -50%)', width: '800px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
                        <h5 className="card-title">Actualizar empleado</h5>
                        <Form onSubmit={handleSubmit} className="row g-3 needs-validation">
                            <div className="col-md-6">
                                <div className='mb-3'>
                                <label htmlFor="tipoEmpleado" className="form-label">
                                    Tipo de empleado
                                </label>
                                <select name="id_Tipo_Empleado" onChange={handleChange} value={values.id_Tipo_Empleado} className="form-control" label='tipo empleado'>
                                    <option value="Seleccionar ">Seleccionar </option>
                                    {Listar3.map((Listar3) => (
                                    <option key={Listar3.id_Tipo_Empleado} value={Listar3.id_Tipo_Empleado}>
                                        {Listar3.nombre}
                                    </option>
                                    ))}
                                </select>
                                    {errors.id_Tipo_Empleado && (
                                        <div className='invalid-feedback'>{errors.id_Tipo_Empleado}</div>
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
                                    className={`${values.apellidos && /^[a-zA-Z]+(?: [a-zA-Z]+)?$/.test(values.apellidos) ? 'is-valid' : 'is-invalid'}`}
                                    id="apellidos"
                                    required
                                    as={TextField}
                                    onChange={handleChange}
                                    value={values.apellidos} // <-- Ajusta aquí
                                    InputProps={{
                                        endAdornment: (
                                            <React.Fragment>
                                                {values.apellidos && /^[a-zA-Z]+(?: [a-zA-Z]+)?$/.test(values.apellidos) ? (
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
                                
                            </div>

                            <div className="col-md-6">
                                <div className="mb-3">
                                <label htmlFor="tipoDocumento" className="form-label">
                                    Tipo de Documento
                                </label>
                                <Select
                                        options={opcionesTipoDocumento}
                                        id="tipoDocumento"
                                        onChange={(selectedOption) => handleChange({ target: { name: "tipo_documento", value: selectedOption.value } })}
                                        value={opcionesTipoDocumento.find(option => option.value === values.tipo_documento)}
                                        style={{ width: '100%', height: '40px', marginBottom: '20px' }}
                                        className={`${errors.tipo_documento ? 'is-invalid' : ''}`}
                                    />
                                    {errors.tipo_documento && (
                                        <div className='invalid-feedback'>{errors.tipo_documento}</div>
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
                            <div className="col-md-6">
                                {/* Columna 2 */}
                                
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
export default ActualizarEmpleado;
