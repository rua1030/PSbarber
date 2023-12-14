import {  enviarContrasena } from "../../api/rutasApi";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import  { useState } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert2

const EnviarEmail = () => {

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRecuperarContrasena = async (values, { setSubmitting }) => {
        const { email } = values;
        try {
          await enviarContrasena(email);
          Swal.fire({
            icon: 'success',
            title: 'Contraseña Enviada al correo.',
          }).then(() => {
            navigate('/');
          });
        } catch (error) {
          setError('Este correo no esta registrado en la base de datos.');
          console.error('Error al cambiar la contraseña:', error);
        }
        setSubmitting(false);
      };

  return (
    <body className='body1'>
      <div className="BodyImg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card">
                <div className="card-body">
                  <div className="row justify-content-center">
                    {/* Columna imagen */}
                    <div className="col-md-6">
                      <div className="logo-container">
                        <img
                          src="../../img/1687297823359 (1).png"
                          alt="Logo"
                          className="logo-card"
                        />
                      </div>
                      {error && <div className="alert alert-danger">{error}</div>}
                    </div>
                    {/* Fin columna imagen */}
                    
                    {/* Columna formulario */}
                    <div className="col-md-6 justify-content-center align-items-center">
                      <div className="form-container justify-content-center">
                      <Formik initialValues={{
                        email:"",
                        contrasena:""
                        }
                        } onSubmit={handleRecuperarContrasena}>
                          {({ isSubmitting }) => (
                            <Form>
                              <div className="mb-3 text-center">
                              
                                <p>Ingresa tu dirección de correo electrónico. Te enviaremos instrucciones sobre cómo restablecer tu contraseña.</p>
                                <label htmlFor="email" className="form-label">
                                  Correo electrónico
                                </label>
                                <Field type="email" id="email" name="email" className="form-control" />
                                <small id="emailError" className="text-danger">
                                  <ErrorMessage name="email" component="div" />
                                </small>
                              </div>
                              <button type="submit" disabled={isSubmitting} className="btn btn-dark">
                                Enviar correo
                              </button>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </div>
                    {/* Fin columna formulario */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default EnviarEmail;
