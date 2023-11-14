import Nav from "../../components/Nav";
import '../../css/pages.css';

const CrearServicio = () => {
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
      <h1>Agregar clientes</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/home">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="/cliente">Listar servicios</a>
          </li>
          <li className="breadcrumb-item active">agregar clientes</li>
        </ol>
      </nav>
    </div>
    {/* End Page Title */}
    <section className="section dashboard">
      {/* Custom Styled Validation */}
      <div className="container mt-5">
  <div className="card card-registrar" style={{width:"45%"}}>
    <div className="card-body">
      <h5 className="card-title">Agregar Servicio</h5>
      <form action="/cliente/save" method="post" className="row g-3 needs-validation">
        <div className="col-12">
          <label htmlFor="nombre" className="form-label">
            Nombre del servicio
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
        <div className="col-12">
          <label htmlFor="precio" className="form-label">
            Precio
          </label>
          <input
            type="text"
            name="precio"
            className="form-control"
            id="precio"
            defaultValue=""
            required
          />
        </div>
        <div className="col-12">
          <div className="form-check">
            Confirmar para agregar servicio
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
            Agregar
          </button>
        </div>
        <div className="col-12">
          <button className="btn btn-danger" type="submit">
            Cancelar
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
 
export default CrearServicio;