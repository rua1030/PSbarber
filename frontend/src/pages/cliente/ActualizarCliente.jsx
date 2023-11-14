import Nav from "../../components/Nav";
import '../../css/pages.css'


const ActualizarCliente = () => {
    return (
        <>
  {/* ======= Header ======= */}
  <header id="header" className="header fixed-top d-flex align-items-center">
    <div className="d-flex align-items-center justify-content-between">
      <a href="index.html" className="logo d-flex align-items-center">
        <img width="20%" height="40%" src="/img/1687297823359 (1).png" alt="" />
        <span className="d-none d-lg-block">Ps_barber</span>
      </a>
      <i className="bi bi-list toggle-sidebar-btn" />
    </div>
    {/* End Logo */}
    <div className="search-bar">
      <form
        className="search-form d-flex align-items-center"
        method="POST"
        action="#"
      >
        <input
          type="text"
          name="query"
          placeholder="Search"
          title="Enter search keyword"
        />
        <button type="submit" title="Search">
          <i className="bi bi-search" />
        </button>
      </form>
    </div>
    {/* End Search Bar */}
    <Nav/>
    {/* End Icons Navigation */}
  </header>
  {/* End Header */}
  {/* ======= Sidebar ======= */}
  {/* End Sidebar*/}
  <main id="main" className="main">
    <div className="pagetitle">
      <h1>Actualizar cliente</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/home">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="/cliente">Listar clientes</a>
          </li>
          <li className="breadcrumb-item active">Actualizar cliente</li>
        </ol>
      </nav>
    </div>
    {/* End Page Title */}
    <section className="section dashboard">
      {/* Custom Styled Validation */}
      <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Actualizar Cliente</h5>
          <form action="/cliente/save" method="post" className="row g-3 needs-validation">
            <div className="col-md-4">
              <label htmlFor="nombre" className="form-label">
                Nombre completo
              </label>
              <input
                type="text"
                name="nombre"
                className="form-control"
                id="nombre"
                defaultValue=""
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="apellidos" className="form-label">
                Apellidos
              </label>
              <input
                type="text"
                name="apellidos"
                className="form-control"
                id="apellidos"
                defaultValue=""
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="telefono" className="form-label">
                Teléfono
              </label>
              <input
                type="text"
                name="telefono"
                className="form-control"
                id="telefono"
                defaultValue=""
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <div className="">
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  id="email"
                  aria-describedby="inputGroupPrepend"
                  required
                />
              </div>
            </div>
            <div className="col-md-4">
            <label htmlFor="documento" className="form-label">
                Tipo de Documento
            </label>
            <select class="form-select" aria-label="Default select example">
              <option value="TI">Tarjeta de Identidad (T.I)</option>
              <option value="CC">Cédula de Ciudadanía (C.C)</option>
              <option value="CE">Cédula de Extranjería (C.E)</option>
            </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="documento" className="form-label">
                Documento
              </label>
              <input
                type="text"
                name="documento"
                className="form-control"
                id="documento"
                required
              />
            </div>
            <div className="col-12">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultValue=""
                  id="invalidCheck"
                  required
                />
              </div>
            </div>
            <div className="col-12">
              <button className="btn btn-dark" type="submit">
                Actualizar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </section>
  </main>
  {/* End #main */}
</>
    );
}
 
export default ActualizarCliente;