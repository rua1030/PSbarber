import { useEmpleado } from "../../context/empleado/empleadoContex";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Nav from "../../components/Nav"
import ReactDOM from 'react-dom';
import CrearEmpleado from "./CrearEmpleado";
import ActualizarEmpleado from "./ActualizarEmpleado";
import Tooltip from '@mui/material/Tooltip';
import "../../css/pages.css";
import ClienteInfo from './infoEmpleado'



function Empleado() {

  const {destroyEmpleado,agregarEmpleado,listaEmpleado, filtrarDesactivados, searchTerm,setSearchTerm, activarEmpleado, desactivarEmpleado,} =useEmpleado()

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openCreateModal2, setOpenCreateModal2] = useState(false);

  const [selecEmpleadoId,setSelecEmpleadoId] = useState(null);

  const [selectedEmpleado, setSelectedEmpleado] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);

  useEffect(() => {
    listaEmpleado();
 },[searchTerm]);
 

      // Abrir modal create 
      const handleOpenModal = () => {
        setOpenCreateModal(true);
      };

      // Manejo envío formulario
      const handleSubmitForm = async (formData) => {
      agregarEmpleado(formData)
      };

      // Cerrar modal create
      const handleCloseModal = () => {
      setOpenCreateModal(false);
      listaEmpleado()
      }; 

      //modal de actualizar

      const handleOpenModal2 = (id_Empleado) => {
        setSelecEmpleadoId(id_Empleado)
        setOpenCreateModal2(true);
      };

      // Cerrar modal update
      const handleCloseModal2 = () => {
      setOpenCreateModal2(false);
      listaEmpleado()
      };

      // Modal de información
      const handleOpenInfoModal = (EmpleadoInfo) => {
      setSelectedEmpleado(EmpleadoInfo);
      setShowInfoModal(true);
      };

      const handleCloseInfoModal = () => {
      setShowInfoModal(false);
      setSelectedEmpleado(null);
      };


  return (
    <>
      <Nav/>
      <main id="main" className="main">
        <div className="">
          <h1>Gestion de Empleados</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/home">Home</a>
              </li>
              <li className="breadcrumb-item active">
                <a href="/empleado">Gestion de Empleados</a>
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
                  
                  <button type="button" className="btn btn-dark" onClick={handleOpenModal}>
                  Agregar Empleado
                  </button>
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
                    id: item.id_Empleado,
                    rol: item.rol.nombre,
                    tipo_empleado: item.tipo_empleado.nombre,
                  }))}
                  columns={[
                    // ... (columnas anteriores)
                    {
                      field: "documento",
                      headerName: "Documento",
                      flex: 0.4,
                      headerClassName: "encabezado-negro",
                    },
                    {
                      field: "nombre",
                      headerName: "Nombre",
                      flex: 0.4 ,
                      headerClassName: "encabezado-negro",
                    },
                    {
                      field: "apellidos",
                      headerName: "Apellidos",
                      flex: 0.4,
                      headerClassName: "encabezado-negro",
                    },{
                      field: "email",
                      headerName: "Email",
                      flex:1,
                      headerClassName: "encabezado-negro",
                    },
                    {
                      field: "telefono",
                      headerName: "Telefono",
                      flex: 0.9,
                      headerClassName: "encabezado-negro",
                    },
                    {
                      field: "estado",
                      headerName: "Estado",
                      flex: 0,
                      headerClassName: "encabezado-negro",
                      renderCell: (params) => ( 
                        <Tooltip
                          title={params.row.estado ? 'Inhabilitar' : 'Habilitar'}
                          arrow
                        >
                        <div className="switch-button">
                           <input
                             type="checkbox"
                              id={`switch-label-${params.row.id_Empleado}`}
                              checked={params.row.estado}
                              onChange={(e) => {  
                              e.preventDefault(); // Evitar la navegación por defecto
                          if (params.row.estado) {
                            desactivarEmpleado(params.row.id_Empleado);
                        } else {
                            activarEmpleado(params.row.id_Empleado);
                      }
                    }}
                      className="switch-button__checkbox"
                    />
                        <label
                          htmlFor={`switch-label-${params.row.id_Empleado}`}
                          className="switch-button__label"
                        ></label>
                        </div>
                        </Tooltip>
                      ),
                    },
                    {
                      field: "info",
                      headerName:"Info",
                      flex:0.1,
                      headerClassName:"encabezado-negro",
                      renderCell: (params)=>(
                        <div>
                          <Tooltip title="Información" arrow>
                              <span>
                              <button
                                className="btn btn-outline-dark me-1"
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  padding: '0.9px',
                                  borderRadius: '50%',
                                }}
                                  onClick={() => handleOpenInfoModal(params.row)}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" 
                                  fill="gray" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                                </svg>
                              </button>
                              </span>
                            </Tooltip>
                        </div>
                      )
                    },
                    {
                      field: "acciones",
                      headerName: "Acciones",
                      flex: 0.4,
                      headerClassName: "encabezado-negro",
                      renderCell: (params) => (
                        <div>
                           <Tooltip title="Actualizar" arrow>
                            <span>
                              <button className="btn btn-outline-dark me-1"
                              onClick={() => {
                              handleOpenModal2(params.row.id_Empleado);
                            }}
                            disabled={!params.row.estado}
                            data-id={`edit-button-${params.row.id_Empleado}`}
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
                            onClick={() => destroyEmpleado(params.row.id_Empleado)}
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
                      ),
                    },
                  ]}
                    pageSize={5}
                    pageSizeOptions={[5, 25, 50, 100]}
                      getRowClassName={(params) => {
                        if (!params.row.estado) {
                          return 'Empleado-desactivado';
                        }
                        return null
                      }}
                />
              </div>
            </div>
          </div>
        </div>
{/* modal de crear empleado */}
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
        <CrearEmpleado handleSubmitForm={handleSubmitForm} handleCloseModal={handleCloseModal} />
      </div>
    </div>
  </>,
  document.body
)}
{/* fin de modal cliente */}

{/* modal actualizar  */}
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
        <ActualizarEmpleado  handleCloseModal2={handleCloseModal2} empleadoId={selecEmpleadoId} />
      </div>
    </div>
  </>,
  document.body
)}

          {showInfoModal && selectedEmpleado && ReactDOM.createPortal(
            <ClienteInfo
              Empleado={selectedEmpleado}
              handleCloseModal={handleCloseInfoModal}
              open={showInfoModal}
            />,
            document.body
            )}           
      </main>
    </>
  );
}

export default Empleado;
