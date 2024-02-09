import { useServicio } from "../../context/servicio/contexServicio";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Nav from "../../components/Nav"
import ReactDOM from 'react-dom';
import CrearServicio from "./CrearServicio";
import Tooltip from '@mui/material/Tooltip';

import ActualizarServicio from "./ActualizarServicio";
import "../../css/pages.css";

function Servicio(){

  const {destroyServicio,activarServicio,desactivarServicio,agregarServicio,listaServicio,searchTerm,setSearchTerm,filtrarDesactivados } =useServicio()

  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [openCreateModal2, setOpenCreateModal2] = useState(false);
  const [selecServicioId,setSelecServicioId] = useState(null);

  

  useEffect(() => {
    listaServicio();
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[searchTerm]);

  // Abrir modal create 
  const handleOpenModal = () => {
    setOpenCreateModal(true);
  };

  // Manejo envío formulario
  const handleSubmitForm = async (formData) => {
  agregarServicio(formData)
  };

  // Cerrar modal create
  const handleCloseModal = () => {
  setOpenCreateModal(false);
  listaServicio()
  }; 

//   // modal de actualizar

  const handleOpenModal2 = (id_Servicio) => {
    setSelecServicioId(id_Servicio)
    setOpenCreateModal2(true);
  };


  // Cerrar modal update
  const handleCloseModal2 = () => {
  setOpenCreateModal2(false);
  listaServicio()
  };


return(
    <>
    
    
    
    <Nav/>
    <main id="main" className="main">
    <div className="pagetitle">
      <h1>Gestion de Servicios</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/home">Home</a>
          </li>
          <li className="breadcrumb-item active">
            <a href="/Servicio">Gestion de Servicios</a>
          </li>
        </ol>
      </nav>
      </div>
    <div className="container mt-5">
      <div className="card text-center">
        <div className="card-body">
          <h5 className="card-title"></h5>
          <div className="d-flex justify-content-between">
            <div className="d-flex justify-content-between align-items-center mb-3">
             <button type="button" 
             onClick={handleOpenModal} 
             className="btn btn-dark">Agregar Servicio</button>
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
                id: item.id_Servicio,
                
              }))}
              columns={[
                { field: 'id_Servicio', headerName: 'ID', flex: 0.5 ,headerClassName: "encabezado-negro", },
                { field: 'nombre', headerName: 'Nombre', flex: 0.9, headerClassName: "encabezado-negro",},
                { field: 'precio', headerName: 'Precio', flex: 0.5,headerClassName: "encabezado-negro", },
                {
                  field: "estado",
                  headerName: "Estado",
                  flex: 0.5,
                  headerClassName: "encabezado-negro",
                  renderCell: (params) => ( 
                    <Tooltip
                      title={params.row.estado ? 'Inhabilitar' : 'Habilitar'}
                      arrow
                    >
                    <div className="switch-button">
                       <input
                         type="checkbox"
                          id={`switch-label-${params.row.id_Servicio}`}
                          checked={params.row.estado}
                          onChange={(e) => {  
                          e.preventDefault(); // Evitar la navegación por defecto
                      if (params.row.estado) {
                        desactivarServicio(params.row.id_Servicio);
                    } else {
                        activarServicio(params.row.id_Servicio);
                  }
                }}
                  className="switch-button__checkbox"
                />
                    <label
                      htmlFor={`switch-label-${params.row.id_Servicio}`}
                      className="switch-button__label"
                    ></label>
                    </div>
                    </Tooltip>
                  ),
                },
                { field: 'acciones', headerName: 'Acciones', flex: 1,headerClassName: "encabezado-negro",
                renderCell: (params) => (
                  <div>
                     <Tooltip title="Actualizar" arrow>
                      <span>
                        <button className="btn btn-outline-dark me-1"
                        onClick={() => {
                        handleOpenModal2(params.row.id_Servicio);
                      }}
                      disabled={!params.row.estado}
                      data-id={`edit-button-${params.row.id_Servicio}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                        >
                          <g fill="currentColor">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path
                              fillRule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                            />
                          </g>
                        </svg>
                        </button>
                      </span>
                      </Tooltip>
                      <Tooltip title="Eliminar" arrow>
                      <button className="btn btn-outline-dark me-1"
                      onClick={() => destroyServicio(params.row.id_Servicio)}
                      disabled={!params.row.estado}
                      >

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill="currentColor"
                            d="m6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z"
                          />
                        </svg>
                      </button>
                      </Tooltip>
                  </div>
                ),}
              ]}
                    pageSize={5}
                    pageSizeOptions={[5, 25, 50, 100]}
                      getRowClassName={(params) => {
                        if (!params.row.estado) {
                          return 'Servicio-desactivado';
                        }
                        return null
                      }}
            />
          </div>
        </div>
      </div>
    </div>
    </main>

{/* modal de crear Servicio */}
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
      <div style={{ width: '10%', height: '10%' }}>
        <CrearServicio handleSubmitForm={handleSubmitForm} handleCloseModal={handleCloseModal} />
      </div>
    </div>
  </>,
  document.body
)}

{/* //modal actualizar Servicio */}
{openCreateModal2 && ReactDOM.createPortal(
  <>
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1049,
    }}
    onClick={handleCloseModal2}
    />
    <div className="modal-create" style={{position: 'fixed', top: '50%', left: '50%', transform: 'translateX(-50%)', zIndex: 1050, 
      maxHeight: '25vh', overflowY: 'visible', display: 'flex', alignItems: 'center' }}>
      <div style={{ width: '300%', height: '300%' }}>
        <ActualizarServicio  handleCloseModal2={handleCloseModal2} ServicioId={selecServicioId} />
      </div>
    </div>
  </>,
  document.body
)}  
    </>
    )
}

export default Servicio;