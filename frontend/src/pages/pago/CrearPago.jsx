import Nav from "../../components/Nav";
import '../../css/pago.css'
const CrearPago = () => {
    return ( 

        <div className="container mt-5 px-5">
            <Nav/>
  <div className="mb-4">
    <h2>Agregar pago</h2>
    <span>
      Porfavor registrar el pago despues de haber sido cancelado en caja o comfirmar la trasferencia
    </span>
  </div>
  <div className="row">
    <div className="col-md-8">
      <div className="card p-3">
        <h6 className="text-uppercase">DATOS DE CLIENTE</h6>
        <div className="inputbox mt-3">
          <input
            type="text"
            name="name"
            className="form-control"
            required="required"
          />
          <span>Nombre del cliente </span>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="inputbox mt-3 mr-2">
              
              <input
                type="text"
                name="name"
                className="form-control"
                required="required"
              />
              <i className="fa fa-credit-card" /> <span>Documento del cliente</span>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-row">
              <div className="inputbox mt-3 mr-2">
                
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  required="required"
                />  
                <span>Fecha</span>
              </div>
              <div className="inputbox mt-3 mr-2">
                
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  required="required"
                />
                <span>hora</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 mb-4">
          <h6 className="text-uppercase">informacion del pago</h6>
          <div className="row mt-3">
            <div className="col-md-6">
              <div className="inputbox mt-3 mr-2">
              <label htmlFor="documento" className="form-label">
                Tipo de pago
              </label>
              <select className="form-select" aria-label="Default select example">
              <option value="tarjeta">Tarjeta de credito</option>
              <option value="trasferencia">Transferencia</option>
              <option value="efectivo">Efectivo</option>
            </select>
                
              </div>
            </div>
            <div className="col-md-6">
              <div className="inputbox mt-3 mr-2">
              <label htmlFor="documento" className="form-label">
                servicio
              </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  required="required"
                />
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-6">
              <div className="inputbox mt-3 mr-2">
                
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  required="required"
                />
                <span>Persona que resivio el pago</span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="inputbox mt-3 mr-2">
                
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  required="required"
                />
                <span>Fecha del servicio</span>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-md-4">
      <div className="card card-blue p-3 text-white mb-3">
        <span>Total pagado</span>
        <div className="d-flex flex-row align-items-end mb-3">
          <h1 className="mb-0 white">$15.000</h1> <span>.00</span>
        </div>
        <p className="mb-0 white">Comfirmar antes de registrar pago</p>
      </div>
      <div className="mt-4 mb-4 d-flex justify-content-between">
      <a href="/pago">
        <button className="btn btn-danger">Cancelar</button>
        </a>
        <button className="btn btn-dark">Registrar</button>
        
      </div>
      
    </div>
  </div>
</div>

     );
}
 
export default CrearPago;