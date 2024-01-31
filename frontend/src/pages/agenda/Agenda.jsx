import { useAgenda} from "../../context/Agenda/contexAgenda";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Nav from "../../components/Nav"
import ReactDOM from 'react-dom';
import Tooltip from '@mui/material/Tooltip';


import "../../css/pages.css";
import AgendaInfo from './infoAgenda'
import iconpay from "../../../public/img/check_payment_pay_icon_143297.svg"

function Agenda(){

  const {activarAgenda,desactivarAgenda,listaAgenda,searchTerm,setSearchTerm,filtrarDesactivados } =useAgenda()


  const [selectedAgenda, setSelectedAgenda] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);

  useEffect(() => {
    listaAgenda();
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[searchTerm]);


  // // Modal de información
  const handleOpenInfoModal = (AgendaInfo) => {
  setSelectedAgenda(AgendaInfo);
  setShowInfoModal(true);
  };

  const handleCloseInfoModal = () => {
  // setShowInfoModal(false);
  setSelectedAgenda(null);
  };

return(
    <>
    
    
    
    <Nav/>
    <main id="main" className="main">
    <div className="pagetitle">
      <h1>Lista Agendas</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/home">Home</a>
          </li>
          <li className="breadcrumb-item active">
            <a href="/Agenda">Listar Agendas</a>
          </li>
        </ol>
      </nav>
      </div>
    <div className="container mt-5">
      <div className="card text-center">
        <div className="card-body">
          <h5 className="card-title">Gestion de Cita</h5>
          <div className="d-flex justify-content-between">
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
                id: item.id_agenda,
              }))}
              columns={[
                { field: 'id_agenda', headerName: 'ID', flex: 0.4 ,headerClassName: "encabezado-negro", },
                { field: 'nombre', headerName: 'Nombre', flex: 0.4,headerClassName: "encabezado-negro", },
                { field: 'fecha', headerName: 'Fecha', flex: 0.4,headerClassName: "encabezado-negro", },
                { field: 'hora', headerName: 'Hora', flex: 0.4, headerClassName: "encabezado-negro",},
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
                            id={`switch-label-${params.row.id_agenda}`}
                            checked={params.row.estado}
                            onChange={(e) => {  
                            e.preventDefault(); // Evitar la navegación por defecto
                        if (params.row.estado) {
                          desactivarAgenda(params.row.id_agenda);
                      } else {
                          activarAgenda(params.row.id_agenda);
                    }
                  }}
                    className="switch-button__checkbox"
                  />
                      <label
                        htmlFor={`switch-label-${params.row.id_agenda}`}
                        className="switch-button__label"
                      ></label>
                      </div>
                      </Tooltip>
                    ),
                  },
                {
                  field: "info",
                  headerName:"Info",
                  flex:1,
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
                              disabled={!params.row.estado}
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
                },{
                  field: "pagar",
                  headerName:"pagar",
                  flex:1,
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
                              disabled={!params.row.estado}
                          >
                          <img src={iconpay}/>
                          </button>
                          </span>
                        </Tooltip>
                    </div>
                  )
                },
                
                
              ]}
                    pageSize={5}
                    pageSizeOptions={[5, 25, 50, 100]}
                      getRowClassName={(params) => {
                        if (!params.row.estado) {
                          return 'Agenda-desactivado';
                        }
                        return null
                      }}
            />
          </div>
        </div>
      </div>
    </div>
    </main>


      {showInfoModal && selectedAgenda && ReactDOM.createPortal(
            <AgendaInfo
              Agenda={selectedAgenda}
              handleCloseModal={handleCloseInfoModal}
              open={showInfoModal}
            />,
            document.body
            )}    
    </>
    )
}

export default Agenda;