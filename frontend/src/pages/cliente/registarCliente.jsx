

import '../../css/login.css';

const Registrarse = () => {
    return ( 
        <div className="container">
  <div className="row justify-content-center">
    <div className="col-md-6">
      <div className="form-container">
        <div className="card-body">
          <p className="brand-text">PS Barber</p>
          <h5 className="card-title">Registrarse</h5>
          <form
            action="/registrar/save"
            method="post"
            onsubmit="return validateForm()"
          >
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                name="nombres"
                className="form-control"
                id=""
                placeholder="Ingrese su nombre completo"
                required=""
              />
              <small id="" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="Apellidos" className="form-label">
                Apellidos
              </label>
              <input
                type="text"
                name="apellidos"
                className="form-control"
                id=""
                placeholder="Ingrese sus apellidos"
                required=""
              />
              <small id="" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="telefono" className="form-label">
                Teléfono
              </label>
              <input
                type="text"
                name="telefono"
                className="form-control"
                id=""
                placeholder="Ingrese su número telefonico"
                required=""
              />
              <small id="" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="tipoDeDocumento" className="form-label">
                Tipo de documento
              </label>
              <select class="form-select" name="tipo_documento"aria-label="Default select example">
                <option value="1">C.C</option>
                <option value="2">T.I</option>
                <option value="3">C.E</option>
            </select>
              <small id="" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="docoumento" className="form-label">
                Documento
              </label>
              <input
                type="text"
                name="documento"
                className="form-control"
                id=""
                placeholder="Ingrese su documento de identidad"
                required=""
              />
              <small id="" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="password-toggle">
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
            <div className="mb-3">
              <label htmlFor="confirmEmail" className="password-toggle">
                Confirmar correo electrónico
              </label>
              <input
                type="email"
                name=""
                className="form-control"
                id="confirmEmail"
                placeholder="Confirme su correo electrónico"
                required=""
              />
              <small id="confirmEmailError" className="text-danger" />
            </div>
            <button type="submit" className="btn btn-primary">
              Registrarse
            </button>
            <div className="mt-3">
              <a href="/agenda" className="text-decoration-none texto-negro">
                ¿Volver a la agenda?
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
 
export default Registrarse;