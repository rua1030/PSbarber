import '../../css/login.css';

const Registrarse = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <p className="brand-text">PS Barber</p>
              <form action="/registrar/save" method="post">
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="nombre" className="form-label">
                        Nombre
                      </label>
                      <input
                        type="text"
                        name="nombres"
                        className="form-control"
                        placeholder="Ingrese su nombre completo"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="apellidos" className="form-label">
                        Apellidos
                      </label>
                      <input
                        type="text"
                        name="apellidos"
                        className="form-control"
                        placeholder="Ingrese sus apellidos"
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="telefono" className="form-label">
                        Teléfono
                      </label>
                      <input
                        type="text"
                        name="telefono"
                        className="form-control"
                        placeholder="Ingrese su número telefónico"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="tipoDeDocumento" className="form-label">
                        Tipo de documento
                      </label>
                      <select name="tipo_documento" className="form-select">
                        <option value="TI">Tarjeta de Identidad (T.I)</option>
                        <option value="CC">Cédula de Ciudadanía (C.C)</option>
                        <option value="CE">Cédula de Extranjería (C.E)</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="documento" className="form-label">
                        Documento
                      </label>
                      <input
                        type="text"
                        name="documento"
                        className="form-control"
                        placeholder="Ingrese su documento de identidad"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">
                        Correo electrónico
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Ingrese su correo electrónico"
                        required
                      />
                    </div>
                  </div>
                  <br/>
                </div>
               <div className="d-flex flex-column align-items-center">
  <button type="submit" className="btn btn-dark">
    Registrarse
  </button>

  <div className="mt-3">
    <a href="/login" className="text-decoration-none">
      ¿Ya tengo una cuenta?
    </a>
  </div>
</div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registrarse;
