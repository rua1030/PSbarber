import { Route,Routes } from "react-router-dom"
import Cliente from "./pages/cliente/Cliente"
import Login from "./pages/empledo/login"
import Registrarse from "./pages/cliente/registarCliente"
import LanPage from "./pages/lanpage/lanpage"
import CrearCliente from "./pages/cliente/CrearCliente"
import ActualizarCliente from "./pages/cliente/ActualizarCliente"
import Servicio from "./pages/servicio/Servicio"
import CrearServicio from "./pages/servicio/CrearServicio"
import Empleado from "./pages/empledo/Empleado"

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<LanPage/>}/>
      <Route path="/cliente" element={<Cliente/>}/>
      <Route path="/cliente/create" element={<CrearCliente/>}/>
      <Route path="/cliente/update" element={<ActualizarCliente/>}/>
      <Route path="/registrar" element={<Registrarse/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/servicio" element={<Servicio/>}/>
      <Route path="/servicio/create" element={<CrearServicio/>}/>
      <Route path="/empleado" element={<Empleado/>}/>
    </Routes>
    </>
  )
}

export default App
