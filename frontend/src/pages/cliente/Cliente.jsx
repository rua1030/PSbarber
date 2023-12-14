import { useCliente } from "../../context/cliente/contexCliente";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Nav from "../../components/Nav"
import ReactDOM from 'react-dom';
import CrearCliente from "./CrearCliente";
// import ActualizarCliente from "./ActualizarCliente";
// import Tooltip from '@mui/material/Tooltip';
import "../../css/pages.css";
// import ClienteInfo from './infoCliente'

function Cliente(){

  const {agregarCliente,listaCliente,searchTerm,setSearchTerm,filtrarDesactivados } =useCliente()

  const [openCreateModal, setOpenCreateModal] = useState(false);
  // const [openCreateModal2, setOpenCreateModal2] = useState(false);

  // const [selecClienteId,setSelecClienteId] = useState(null);

  // const [selectedCliente, setSelectedCliente] = useState(null);
  // const [showInfoModal, setShowInfoModal] = useState(false);

  useEffect(() => {
    listaCliente();
 },[searchTerm]);

  // Abrir modal create 
  const handleOpenModal = () => {
    setOpenCreateModal(true);
  };

  // Manejo envío formulario
  const handleSubmitForm = async (formData) => {
  agregarCliente(formData)
  };

  // Cerrar modal create
  const handleCloseModal = () => {
  setOpenCreateModal(false);
  listaCliente()
  }; 

  //modal de actualizar

  // const handleOpenModal2 = (id_Cliente) => {
  //   setSelecClienteId(id_Cliente)
  //   setOpenCreateModal2(true);
  // };

  // // Cerrar modal update
  // const handleCloseModal2 = () => {
  // setOpenCreateModal2(false);
  // listaCliente()
  // };

  // // Modal de información
  // const handleOpenInfoModal = (ClienteInfo) => {
  // setSelectedCliente(ClienteInfo);
  // setShowInfoModal(true);
  // };

  // const handleCloseInfoModal = () => {
  // setShowInfoModal(false);
  // setSelectedCliente(null);
  // };

return(
    <>
    
    
    
    <Nav/>
    <main id="main" className="main">
    <div className="pagetitle">
      <h1>Lista clientes</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/home">Home</a>
          </li>
          <li className="breadcrumb-item active">
            <a href="/cliente">Listar clientes</a>
          </li>
        </ol>
      </nav>
      </div>
    <div className="container mt-5">
      <div className="card text-center">
        <div className="card-body">
          <h5 className="card-title">Tabla de Clientes</h5>
          <div className="d-flex justify-content-between">
            <div className="d-flex justify-content-between align-items-center mb-3">
             <button type="button" onClick={handleOpenModal} className="btn btn-dark">Agregar cliente</button>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
            <input
                  type="text"
                  placeholder="Buscar..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control"
                />
            </div>
          </div>
          <div>
            <DataGrid
              stickyHeader
              autoHeight
              rows={filtrarDesactivados.map((item) => ({
                ...item,
                id: item.id_Cliente,
                
              }))}
              columns={[
                { field: 'id_Cliente', headerName: 'ID', flex: 0 },
                { field: 'nombre', headerName: 'Nombre', flex: 0 },
                { field: 'apellidos', headerName: 'Apellidos', flex: 0 },
                { field: 'telefono', headerName: 'Telefono', flex: 0 },
                { field: 'tipo_documento', headerName: 'TD', flex: 0 },
                { field: 'documento', headerName: 'Documento', flex: 0 },
                { field: 'email', headerName: 'Email', flex: 1 },
                { field: 'estado', headerName: 'Estado', flex: 0 },
                { field: 'acciones', headerName: 'Acciones', flex: 1,
                  renderCell: (params) =>(
                    <div>
                      <a href="/cliente/update"><button className="btn btn-outline-dark me-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill="currentColor"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></g></svg></button></a>
                      <a href="/cliente/update"><button className="btn btn-outline-dark me-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20"><path fill="currentColor" d="m6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z"/></svg></button></a>
                    </div>
                )}
              ]}
                    pageSize={5}
                    pageSizeOptions={[5, 25, 50, 100]}
                      getRowClassName={(params) => {
                        if (!params.row.estado) {
                          return 'Cliente-desactivado';
                        }
                        return null
                      }}
            />
          </div>
        </div>
      </div>
    </div>
    </main>

{/* modal de crear Cliente */}
{openCreateModal && ReactDOM.createPortal(
    <>
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1049,
    }}
    onClick={handleCloseModal}
    />
    <div className="modal-create" style={{position: 'fixed', top: '50%', left: '50%', transform: 'translateX(-50%)', zIndex: 1050, 
      maxHeight: '25vh', overflowY: 'visible', display: 'flex', alignItems: 'center' }}>
      <div style={{ width: '300%', height: '300%' }}>
        <CrearCliente handleSubmitForm={handleSubmitForm} handleCloseModal={handleCloseModal} />
      </div>
    </div>
  </>,
  document.body
)}
    </>
    )
}

export default Cliente;