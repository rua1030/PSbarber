import { getListarServicios } from "../../api/rutasApi";
import { useEffect,useState } from "react";
import { Modal } from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import Nav from "../../components/Nav";
import '../../css/pages.css'

function Servicio () {

  // Estado para almacenar la lista de roles
    const[listar,setListar] = useState([])

    useEffect(()=>{
        async function cargarServicios(){
            const response = await getListarServicios()
            setListar(response.data)
        }
        cargarServicios()
    },[])


    // Estado para controlar la visibilidad de la ventana modal
    const [openModal, setOpenModal] = useState(false);
// Función para abrir la ventana modal
const handleOpenModal = () => {
  setOpenModal(true);
};

// Función para cerrar la ventana modal
const handleCloseModal = () => {
  setOpenModal(false);
};

// Función para manejar la lógica de envío del formulario
const handleSubmitForm = (formData) => {
  // Maneja la lógica de envío del formulario aquí
  console.log(formData);
  // Cierra la ventana modal después de enviar el formulario
  handleCloseModal();
};


    return(
        <>
        <Nav/>
    <main id="main" className="main">
    <div className="pagetitle">
      <h1>Lista Servicios</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/home">Home</a>
          </li>
          <li className="breadcrumb-item active">
            <a href="/servicio">Listar servicios</a>
          </li>
        </ol>
      </nav>
      </div>
    <div className="container mt-5">
      <div className="card text-center">
        <div className="card-body">
          <h5 className="card-title">Tabla de Servicios</h5>
          <div className="d-flex justify-content-between">
            <div className="d-flex justify-content-between align-items-center mb-3">
            <button type="button" className="btn btn-dark" onClick={handleOpenModal}>Agregar servicio</button>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <a href="/servicio/create"><button type="button" className="btn btn-dark"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 15.577l-3.538-3.539l.707-.719L11.5 13.65V5h1v8.65l2.33-2.33l.708.718L12 15.577ZM6.615 19q-.69 0-1.152-.462Q5 18.075 5 17.385v-2.423h1v2.423q0 .23.192.423q.193.192.423.192h10.77q.23 0 .423-.192q.192-.193.192-.423v-2.423h1v2.423q0 .69-.462 1.152q-.463.463-1.153.463H6.615Z"/></svg></button></a>
            </div>
          </div>
          <div>
            <DataGrid
              rows={listar.map((item) => ({
                ...item,
                id: item.id_Servicio,
              }))}
              columns={[
                { field: 'id_Servicio', headerName: 'ID', flex: 0 },
                { field: 'nombre', headerName: 'Nombre', flex: 1 },
                { field: 'precio', headerName: 'Precio', flex: 1 },
                { field: 'estado', headerName: 'Estado', flex: 1 },
                { field: 'acciones', headerName: 'Acciones', flex: 1,
                  renderCell: (params) =>(
                    <div>
                      <button type="button" onClick={handleOpenModal} className="btn btn-outline-dark me-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill="currentColor"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></g></svg></button>
                      <button type="button" className="btn btn-outline-dark me-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20"><path fill="currentColor" d="m6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z"/></svg></button>
                    </div>
                )}
              ]}
            />
          </div>
        </div>
      </div>
    </div>
    <Modal open={openModal} onClose={handleCloseModal}>
                    <div className="modal-content" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '400px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
                        {/* Formulario dentro de la ventana modal */}
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmitForm();
                        }}>
                            <div className="mb-3">
                                <label htmlFor="nombreServicio" className="form-label">Nombre del Servicio</label>
                                <input type="text" className="form-control" id="nombreServicio"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="precioServicio" className="form-label">Precio del Servicio</label>
                                <input type="text" className="form-control" id="precioServicio"/>
                            </div>
                            <button type="submit" className="btn btn-dark">Agregar Cliente</button>
                        </form>
                    </div>
                </Modal>
    </main>
        </>
    )
}

export default Servicio;