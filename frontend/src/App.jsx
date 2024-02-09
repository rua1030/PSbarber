import { Route,Routes } from "react-router-dom"
import { EmpleadoContextProvider } from "./context/empleado/empleadoContex"
import { RolContextProvider } from "./context/rol/RolContex"
import { ClienteContextProvider }from"./context/cliente/contexCliente"
import { ServicioContextProvider } from "./context/servicio/contexServicio"
import { AgendaContextProvider } from "./context/Agenda/contexAgenda"

import Cliente from "./pages/cliente/Cliente"

import Login from "./pages/empleado/login"
import Empleado from "./pages/empleado/empleado"
import CrearEmpleado from "./pages/empleado/CrearEmpleado"
import ActualizarEmpleado from "./pages/empleado/ActualizarEmpleado"
import EnviarEmail from "./pages/empleado/enviarEmail"
import Pago from "./pages/pago/pago"
import CrearPago from "./pages/pago/CrearPago"
import Rol from "./pages/rol/Rol"
import Servicio from "./pages/servicio/servicio"
import Landingpage from "./pages/agenda/crearCita"
import Agenda from "./pages/agenda/Agenda"
import Dashboard from "./pages/dashboard/dashboard"

function App() {


  return (
    <>
    <div className="w-full h-full bg-zinc-900 font-nunito relative">
    <AgendaContextProvider>
    <EmpleadoContextProvider>
    <RolContextProvider>
    <ClienteContextProvider>
    <ServicioContextProvider>
    

    <Routes>
      <Route path="/agenda" element={<Agenda/>}/>   
      <Route path="/servicio" element={<Servicio/>}/>
      {/* <Route path="/servicio/create" element={<CrearServicio/>}/>
      <Route   path="/servicio/update" element={<ActualizarServicio/>}/> */}
      <Route path="/home" element={<Dashboard/>}/>
      <Route path="/" element={<Landingpage/>}/>
      <Route path="/cliente" element={<Cliente/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/enviarEmail" element={<EnviarEmail/>}/>
      <Route path="/empleado" element={<Empleado/>}/>
      <Route path="/empleado/create" element={<CrearEmpleado/>}/>
      <Route path="/empleado/update" element={<ActualizarEmpleado/>}/>

      <Route path="/pago" element={<Pago/>}/>
      <Route path="/pago/create" element={<CrearPago/>}/>
      
      <Route path="/rol" element={<Rol/>}/>
      <Route path="/rol/create" element={<Rol/>}/>
      <Route path="/rol/update" element={<Rol/>}/>

    </Routes>

    </ServicioContextProvider>
    </ClienteContextProvider>
    </RolContextProvider>
    </EmpleadoContextProvider>
    </AgendaContextProvider>
    </div>
    </>
  )
}

export default App
