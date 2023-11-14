import { getListarEmpleados } from "../../api/rutasApi";
import { useState,useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Nav from "../../components/Nav";
import '../../css/pages.css'

function Empleado(){
    const[listar,setListar] = useState([])

    useEffect(()=>{
        async function cargarEmpleados(){
            const response = await getListarEmpleados()
            setListar(response.data)
        }
        cargarEmpleados()
    },[])

    return(
        <>
         <Nav/>
    <main id="main" className="main">
    <div className="pagetitle">
      <h1>Lista Empleados</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/home">Home</a>
          </li>
          <li className="breadcrumb-item active">
            <a href="/empleado">Listar Empleados</a>
          </li>
        </ol>
      </nav>
      </div>
    <div className="container mt-5">
      <div className="card text-center">
        <div className="card-body">
          <h5 className="card-title">Tabla de Empleados</h5>
          <div className="d-flex justify-content-between">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <a href="/empleado/create"><button type="button" className="btn btn-dark">Agregar Empleado</button></a>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <a href="/empleado/create"><button type="button" className="btn btn-dark"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 15.577l-3.538-3.539l.707-.719L11.5 13.65V5h1v8.65l2.33-2.33l.708.718L12 15.577ZM6.615 19q-.69 0-1.152-.462Q5 18.075 5 17.385v-2.423h1v2.423q0 .23.192.423q.193.192.423.192h10.77q.23 0 .423-.192q.192-.193.192-.423v-2.423h1v2.423q0 .69-.462 1.152q-.463.463-1.153.463H6.615Z"/></svg></button></a>
            </div>
          </div>
          <div>
            <DataGrid
              rows={listar.map((item) => ({
                ...item,
                id: item.id_Empleado,
              }))}
              columns={[
                { field: 'id_Empleado', headerName: 'ID', flex: 0 },
                { field: 'nombre', headerName: 'Nombre', flex: 0 },
                { field: 'apellidos', headerName: 'Apellidos', flex: 0 },
                { field: 'telefono', headerName: 'Telefono', flex: 0 },
                { field: 'tipo_documento', headerName: 'TD', flex: 0 },
                { field: 'documento', headerName: 'Documento', flex: 0 },
                { field: 'email', headerName: 'Email', flex: 1 },
                { field: 'Tipo_empleado', headerName: 'Tipo_empleado', flex: 1 },
                { field: 'estado', headerName: 'Estado', flex: 0 },
                { field: 'acciones', headerName: 'Acciones', flex: 1,
                  renderCell: (params) =>(
                    <div>
                      <a href="/empleado/update"><button className="btn btn-outline-dark me-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill="currentColor"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></g></svg></button></a>
                      <a href="/empleado/delete"><button className="btn btn-outline-dark me-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20"><path fill="currentColor" d="m6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z"/></svg></button></a>
                    </div>
                )}
              ]}
            />
          </div>
        </div>
      </div>
    </div>
    </main>
        </>
    )
}

export default Empleado;