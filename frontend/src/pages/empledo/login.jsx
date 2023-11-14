import '../../css/login.css'


const Login = () => {
    return ( 

        <div className="container">
  <div className="row justify-content-center">
    <div className="col-md-6">
      <div className="form-container">
        <div className="card-body">
          <img
            src="../img/ps.png"
            alt="Logo"
            className="logo-card"
          />
          <p className="brand-text">PS Barber</p>
          <h5 className="card-title">Iniciar sesión</h5>
          <form
            action="/cliente"
            method="post"
            onsubmit="return validateForm()"
          >
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
                required=""
              />
              <small id="emailError" className="text-danger" />
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
                  required=""
                />
                <span
                  className="toggle-icon"
                  onclick="togglePasswordVisibility()"
                >
                  <i id="passwordToggleIcon" className="far fa-eye" />
                </span>
              </div>
            </div>
            <a href="/cliente"><button className="btn btn-primary">
              Iniciar sesión
            </button></a>
            <div className="mt-3">
              <a href="/" className="text-decoration-none">
                De vuelta al inicio
              </a>
              <br />
              <a href="/recuperarCon" className="text-decoration-none">
                ¿Has olvidado tu contraseña?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

    );
}
 
export default Login;