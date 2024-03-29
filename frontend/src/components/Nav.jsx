import{ useState, useEffect } from 'react';
import '../css/Navbar.css';

const Nav = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const showNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  useEffect(() => {
    // Esta función se ejecutará cuando el componente se monte
    const linkColor = document.querySelectorAll('.nav_link');

    const colorLink = () => {
      if (linkColor) {
        linkColor.forEach((l) => l.classList.remove('active'));
        this.classList.add('active');
      }
    };

    linkColor.forEach((l) => l.addEventListener('click', colorLink));

    // Esta función se ejecutará cuando el componente se desmonte
    return () => {
      linkColor.forEach((l) => l.removeEventListener('click', colorLink));
    };
  }, []); // El segundo argumento [] significa que esta función de efecto se ejecuta solo una vez, equivalente a componentDidMount

  return (
    <>
      <header className="header" id="header">
        <div className="header_toggle" onClick={showNavbar}>
            <span className="nav_logo-name2">PS_barberㅤ</span>
          <svg className='treslineas' xmlns="http://www.w3.org/2000/svg" id="header-toggle" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
          </svg>
        </div>
      </header>
      <div className={`l-navbar ${isNavbarOpen ? 'show' : ''}`} id="nav-bar">
        <nav className="nav">
          <div>
            
            <a href="/home" className="nav_logo">
            <img src="../public/img/1687297823359 (1).png" width={"29"} height={"29"} alt="" />
              <span className="nav_logo-name">PS_barber</span>
            </a>
            <div className="nav_list">
              <a href="/dashboard" className="nav_link active">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM9 9H5V5h4v4zm5 2h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zm1-6h4v4h-4V5zM3 20a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6zm2-5h4v4H5v-4zm8 5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6zm2-5h4v4h-4v-4z"/></svg>
                <span className="nav_name">Dashboard</span>
              </a>
              <a href="/empleado" className="nav_link">
                
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a5 5 0 1 0 5 5a5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3a3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"/></svg>
                <span className="nav_name">Empleados</span>
              </a>
              <a href="/pago" className="nav_link">
                
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16 2H8C4.691 2 2 4.691 2 8v13a1 1 0 0 0 1 1h13c3.309 0 6-2.691 6-6V8c0-3.309-2.691-6-6-6zm4 14c0 2.206-1.794 4-4 4H4V8c0-2.206 1.794-4 4-4h8c2.206 0 4 1.794 4 4v8z"/><path fill="currentColor" d="M7 9h10v2H7zm0 4h7v2H7z"/></svg>
                <span className="nav_name">Pagos</span>
              </a>
              <a href="/servicio" className="nav_link"aria-disabled="true" >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M18 2H6c-1.103 0-2 .897-2 2v18l8-4.572L20 22V4c0-1.103-.897-2-2-2zm0 16.553l-6-3.428l-6 3.428V4h12v14.553z"/></svg>
                <span className="nav_name">Agenda</span>
              </a>
              <a href="/rol" className="nav_link">
                
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M13 9h-2v3H8v2h3v3h2v-3h3v-2h-3z"/><path fill="currentColor" d="M20 5h-8.586L9.707 3.293A.996.996 0 0 0 9 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zM4 19V7h16l.002 12H4z"/></svg>
                <span className="nav_name">Roles</span>
              </a>
              <a href="/cliente" className="nav_link">
                
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20 7h-4V4c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H4c-1.103 0-2 .897-2 2v9a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V9c0-1.103-.897-2-2-2zM4 11h4v8H4v-8zm6-1V4h4v15h-4v-9zm10 9h-4V9h4v10z"/></svg>
                <span className="nav_name">Clientes</span>
              </a>
            </div>
          </div>
          <a href="/login" className="nav_link">
            
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16 13v-2H7V8l-5 4l5 4v-3z"/><path fill="currentColor" d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"/></svg>
            <span className="nav_name">SignOut</span>
          </a>
        </nav>
      </div>
    </>
    );
}
 
export default Nav;