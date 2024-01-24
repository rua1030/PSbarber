import { Route,Routes } from "react-router-dom"
import { EmpleadoContextProvider } from "./context/empleado/empleadoContex"
import { RolContextProvider } from "./context/rol/RolContex"
import { ClienteContextProvider }from"./context/cliente/contexCliente"

import Cliente from "./pages/cliente/Cliente"


import Login from "./pages/empleado/login"
import Empleado from "./pages/empleado/empleado"
import CrearEmpleado from "./pages/empleado/CrearEmpleado"
import ActualizarEmpleado from "./pages/empleado/ActualizarEmpleado"
import EnviarEmail from "./pages/empleado/enviarEmail"
import Pago from "./pages/pago/pago"
import CrearPago from "./pages/pago/CrearPago"

import Rol from "./pages/rol/Rol"





function App() {


  return (
    <>
    <div className="w-full h-full bg-zinc-900 font-nunito relative">
    <EmpleadoContextProvider>
    <RolContextProvider>
    <ClienteContextProvider>
    <Routes>
  
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
    
    </ClienteContextProvider>
    </RolContextProvider>
    </EmpleadoContextProvider>
    </div>
    </>
  )
}

export default App
