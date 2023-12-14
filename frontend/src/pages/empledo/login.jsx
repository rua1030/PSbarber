import '../../css/login.css';

const Login = () => {
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
                      <p className="brand-text">PS Barber</p>
                      <h5 className="card-title">Iniciar sesión</h5>
                      <form action="/cliente">
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">
                            Correo electrónico
                          </label>
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            id="email"
                            placeholder="Ingrese su correo electrónico"
                            required
                          />
                          <small id="emailError" className="text-danger"></small>
                        </div>
                        <div className="mb-3 password-toggle">
                          <label htmlFor="password" className="form-label">
                            Contraseña
                          </label>
                          <div className="input-group">
                            <input
                              type="password"
                              name="pass"
                              className="form-control"
                              id="password"
                              placeholder="Ingrese su contraseña"
                              required
                            />
                            <span
                              className="toggle-icon"
                              onClick="togglePasswordVisibility()"
                            >
                              <i id="passwordToggleIcon" className="far fa-eye"></i>
                            </span>
                          </div>
                        </div>
                        <a href="/cliente">
                          <button type="submit" className="btn btn-dark">
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
                      </form>
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
