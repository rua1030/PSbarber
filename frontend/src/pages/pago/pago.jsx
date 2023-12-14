import { getListarClientes } from '../../api/rutasApiCliente'
// import { useEffect,useState } from 'react'
import { useEffect,useState } from 'react';
import {DataGrid} from '@mui/x-data-grid';
import Nav from '../../components/Nav';
import '../../css/pages.css'

const Pago = () => {
    const[listar,setListar] = useState([])

    useEffect(()=>{
        async function cargarEmpleados(){
            const response = await getListarClientes()
            setListar(response.data)
        }
        cargarEmpleados()
    },[])
    return (    
        <>
        <Nav/>
                <main id="main" className="main">
    <div className="pagetitle">
      <h1>Lista pago</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/home">Home</a>
          </li>
          <li className="breadcrumb-item active">
            <a href="/pago">Listar pago</a>
          </li>
        </ol>
      </nav>
      </div>
    <div className="container mt-5">
      <div className="card text-center">
        <div className="card-body">
          <h5 className="card-title">Tabla de pago</h5>
          <div className="d-flex justify-content-between">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <a href="/pago/create"><button type="button" className="btn btn-dark">Agregar pago</button></a>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <a href="/pago/create"><button type="button" className="btn btn-dark"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 15.577l-3.538-3.539l.707-.719L11.5 13.65V5h1v8.65l2.33-2.33l.708.718L12 15.577ZM6.615 19q-.69 0-1.152-.462Q5 18.075 5 17.385v-2.423h1v2.423q0 .23.192.423q.193.192.423.192h10.77q.23 0 .423-.192q.192-.193.192-.423v-2.423h1v2.423q0 .69-.462 1.152q-.463.463-1.153.463H6.615Z"/></svg></button></a>
            </div>
          </div>
          <div>
            <DataGrid
              rows={listar.map((item) => ({
                ...item,
                id: item.id_pago,
              }))}
              columns={[
                { field: 'id_pago', headerName: 'ID', flex:0.2},
                { field: 'nombre', headerName: 'Nombre cliente', flex: 0.5 },
                { field: 'documento', headerName: 'Docuemento cliente', flex: 0.5 },
                { field: 'tipo_Pago', headerName: 'Tipo de pago', flex: 0.5 },
                { field: 'fecha_pago', headerName: 'Fecha del pago', flex: 0.4 },
                { field: 'servicio', headerName: 'servicios prestados', flex: 0.9 },
                { field: 'Tipo_pago', headerName: 'Tipo_pago', flex: 0.5 },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
    </main>



        </>
     );
}
 
export default Pago;