import '../../css/login.css';
import { loginIngreso } from "../../api/rutasApi";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import  { useState } from 'react';
import Cookies from 'js-cookie';

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [Empeleado, setEmpeleado] = useState(null);
  const handleSubmit = async (values, { setSubmitting }) => {
    const { email, contrasena } = values;
    try {
      const response = await loginIngreso(email, contrasena);
      console.log('Valores enviados:', response);

      if (response.token) {
        Cookies.set('token', response.token);

        setEmpeleado(response.Empeleado);
        
        localStorage.setItem('Empeleado', JSON.stringify(response.Empeleado));

        navigate('/empleado',{ state: { Empeleado: response.Empeleado } });
        window.location.reload();
      } else {
        setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      // console.error('Error al iniciar sesión:', error);
      setError('Error al iniciar sesión, inténtalo de nuevo.');
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

                <div className="row">
                  {/* columna imagen */}
                  <div className="col-md-6">
                    <div className="logo-container">
                      <img
                        src="../../img/1687297823359 (1).png"
                        alt="Logo"
                        className="logo-card"
                      />
                    </div>
                    {/* fin */}
                  </div>
                  {/* columna formulario */}
                  <div className="col-md-6">
                    <div className="form-container">
                    {error && <div className="alert alert-danger">{error}</div>}
                    <p className="brand-text">PS Barber</p>
                    <h5 className="card-title">Iniciar sesión</h5>
                    <Formik 
                    initialValues={{
                      email:"",
                      contrasena:""
                    }}
                    onSubmit={handleSubmit}
                    >
                    {({ isSubmitting }) => (
                      <Form>
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">
                            Correo electrónico
                          </label>
                          <Field type="email" id="email" name="email"   className="form-control" />
                          <small id="emailError" className="text-danger">
                          <ErrorMessage name="email" component="div" />
                          </small>
                        </div>
                        <div className="mb-3 password-toggle">
                          <label htmlFor="password" className="form-label">
                            Contraseña
                          </label>
                          <div className="input-group">
                          <Field type="password" id="contrasena" name="contrasena" className="form-control" />
                            <span
                              className="toggle-icon"
                            >
                              <small id="emailError" className="text-danger">
                              <ErrorMessage name="contrasena" component="div" />
                              </small>
                              <i id="passwordToggleIcon" className="far fa-eye"></i>
                            </span>
                          </div>
                        </div>
                        <a href="/cliente">
                          <button type="submit" disabled={isSubmitting} className="btn btn-dark">
                            Iniciar sesión
                          </button>
                        </a>
                        <div className="mt-3">
                          <a href="/" className="text-decoration-none">
                            De vuelta al inicio
                          </a>
                          <br />
                          <a href="/recuperarCon" className="text-decoration-none login-link">
                            ¿Has olvidado tu contraseña?
                          </a>
                        </div>
                      </Form>
                    )
                    }
                  </Formik>
                    </div>
                  </div>
                  {/* fin */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </body>
    
  );
}

export default Login;
