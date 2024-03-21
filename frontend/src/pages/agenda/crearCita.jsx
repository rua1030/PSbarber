import { useState } from 'react';
import '../../css/LandingPage.css';
import FormularioC from "../../components/formularioC"
import CrearAgenda from "../../components/crearAgendacs"
import Footer from '../../components/footer';


// En tu archivo CSS principal o donde manejes los estilos
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


// Importa las imágenes
import image1 from '../../../public/img/Picsart_24-01-26_16-00-54-217.jpg';
import image2 from '../../../public/img/Captura de pantalla 2024-01-26 162857.png';

const LandingPage = () => {
  const [mostrarHorario, setMostrarHorario] = useState(false);
  const toggleMostrarHorario = () => {
    setMostrarHorario(!mostrarHorario);
  };

  return (
    <div className="container mt-5 px-5">
      {/* Carrusel */}
      <div className='row pt-5'>
        <div className="col-md-8">
          <div> 
            <img src={image1} alt="Image 1" className="carousel-image carousel-image1" />
          </div>
          <div className="row pt-5">
        <div className="col-md-12">
          <h3>Sobre Nosotros</h3>
          <p>
            Somos PS Barber, una barbería dedicada a brindar servicios de calidad para el cuidado y estilo de tu cabello
            y barba. Nuestro equipo de barberos altamente capacitados está comprometido a ofrecerte una experiencia única y
            satisfactoria en cada visita.
          </p>
        </div>
      </div>
      <div className="row pt-5">   
      <h3>Agenda con nosotros</h3>
      <p>¡Anímate a agendar con nosotros rápido!</p>
        <div className='col-md-12'>  
          
            <CrearAgenda/>
        </div>
        <h3 className='pt-5'>Registrate  como cliente</h3>
      <p>¡Registrate como cliente para solo una vez y rápido!</p> 
        <div className='col-md-12'>  
            <FormularioC/>
        </div>
      </div>
          
        </div>

        <div className="col-md-4">
          <div className='card'>
            <a href="https://www.bing.com/search?pglt=41&q=ubicacion&cvid=08ccf4af80024ce29ca6d1e35bf78640&gs_lcrp=EgZjaHJvbWUqBggAEAAYQDIGCAAQABhAMgYIARAAGEAyBggCEAAYQDIGCAMQABhAMgYIBBAAGEAyBggFEAAYQDIGCAYQABhAMgYIBxAAGEAyBggIEAAYQDIHCAkQRRj8VdIBCDI0OTBqMGoxqAIAsAIA&FORM=ANNAB1&PC=ASTS">
              <img src={image2} alt="Image 1" className="carousel-image" />
            </a>
            <div className="row  pt-4">
              <div className='col-md-1'>
              <svg width="22" height="22" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="sc-aXZVg juZfmz icon "><path d="M10 18.078a.667.667 0 0 1-.523-.254C8.93 17.117 4.12 10.82 4.12 7.801A5.877 5.877 0 0 1 10 1.92a5.877 5.877 0 0 1 5.879 5.88c0 3.02-4.8 9.316-5.356 10.023a.667.667 0 0 1-.523.254Zm0-14.836a4.56 4.56 0 0 0-4.555 4.559c0 1.941 2.922 6.308 4.555 8.515 1.633-2.207 4.555-6.574 4.555-8.515A4.56 4.56 0 0 0 10 3.242Zm0 0" fill="rgba(26, 26, 26, .8)"></path><path d="M10.086 10.82a3.07 3.07 0 0 1-3.07-3.066 3.07 3.07 0 0 1 3.07-3.07 3.07 3.07 0 0 1 0 6.137Zm0-4.8a1.75 1.75 0 0 0-1.617 1.074 1.746 1.746 0 0 0 2.281 2.281 1.75 1.75 0 0 0 1.074-1.613A1.738 1.738 0 0 0 10.086 6Zm0 0" fill="rgba(26, 26, 26, .8)"></path></svg>
              </div>
              <div className="col-md-10">
                <p className="">Av 32c #42g - 15 Bello, Antioquia</p>
              </div>
            </div>
            <div className="row">
              <div className='col-md-1'>
              <svg className="sc-aXZVg juZfmz icon " width="22" height="22" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none"><path d="M13.091 2.656H6.66a2.058 2.058 0 00-2.056 2.056v10.576c0 1.136.924 2.056 2.056 2.056h6.428a2.058 2.058 0 002.056-2.056V4.712a2.052 2.052 0 00-2.053-2.056zM6.66 3.832h6.428c.484 0 .88.396.88.88v7.792H5.78V4.712a.88.88 0 01.88-.88zm6.431 12.336H6.66a.883.883 0 01-.88-.88v-1.612h8.192v1.612a.88.88 0 01-.88.88z" fill="rgba(26, 26, 26, .8)"></path><path d="M9.874 15.42a.716.716 0 100-1.432.716.716 0 000 1.432z" fill="rgba(26, 26, 26, .8)"></path></svg>
              </div>
              <div className="col-md-10">
                <p className="">324 2493255 - 302 4547498</p>
              </div>
            </div>
            <div className="row">
              <div className='col-md-1'>
              <svg width="22" height="22" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="sc-aXZVg juZfmz undefined "><path  d="M11.6 12.808c1.136.272 1.616-.34 1.796-.82.112-.296 0-.636-.296-.772l-.772-.388c-.272-.112-.568-.068-.752.16l-.16.184c-.16.184-.432.272-.66.184-1-.364-1.548-1.092-1.796-1.504a.677.677 0 01.024-.684l.16-.204c.112-.184.16-.432.068-.636l-.432-.956c-.16-.296-.524-.456-.82-.34-.524.252-1.136.752-.636 2.048.82 2.04 2.436 3.248 4.276 3.728z" fill="#181B32"></path><path d="M10.136 16.284a6.226 6.226 0 01-3.456-1.036l-2.384.448a.443.443 0 01-.424-.144.447.447 0 01-.1-.436l.696-2.412a6.289 6.289 0 015.676-8.988c3.464 0 6.276 2.82 6.276 6.284a6.29 6.29 0 01-6.284 6.284zM6.784 14.3c.096 0 .188.028.264.084A5.365 5.365 0 0015.496 10c0-2.956-2.4-5.36-5.36-5.36a5.363 5.363 0 00-4.768 7.808.475.475 0 01.032.34l-.536 1.868 1.836-.344a.304.304 0 01.084-.012z" fill="#181B32"></path></svg>              </div>
              <div className="col-md-10">
                <p className="">!Contactanos por whatsapp¡</p>
              </div>
            </div>
            <div className="row">
              <div className='col-md-1'>
              <svg className="sc-aXZVg juZfmz icon " width="22" height="22" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none"><path d="M9.875 2.564C5.775 2.564 2.44 5.9 2.44 10s3.336 7.436 7.436 7.436S17.311 14.1 17.311 10s-3.335-7.436-7.436-7.436zm0 13.72c-3.464 0-6.28-2.82-6.28-6.284s2.82-6.28 6.28-6.28a6.29 6.29 0 016.28 6.28c0 3.46-2.816 6.284-6.28 6.284z" fill="rgba(26, 26, 26, .8)"></path><path d="M12.74 10.228H9.828V7.696a.576.576 0 00-1.152 0v3.108c0 .32.26.576.576.576.008 0 .012-.004.02-.004s.012.004.02.004h3.448a.576.576 0 000-1.152z" fill="rgba(26, 26, 26, .8)"></path></svg>              </div>
              <div className="col-md-10">
                <p className="" onClick={toggleMostrarHorario}>
                  Ver horario
                </p>
                {mostrarHorario && (
                  <div className="horario">
                    {/* Agrega aquí tu contenido de horario */}
                    <p style={{ opacity: 0.5 }}>Lunes: cerrado</p>
                    <p>Martes: 7:00 am - 7:00 pm</p>
                    <p>Miercoles: 7:00 am - 7:00 pm</p>
                    <p>Jueves: 7:00 am - 7:00 pm</p>
                    <p>Viernes: 7:00 am - 7:00 pm</p>
                    <p>Sabado: 7:00 am - 7:00 pm</p>
                    <p>Domingo: 7:00 am - 7:00 pm</p>
                    {/* ... Agrega los demás días y horarios */}
                  </div>
                )}
              </div>
            </div>
          </div>
          
        </div>
        
      </div>

      {/* Resto del contenido de la Landing Page */}
      <header className="header" id="header">
        <div className="header-left">
          <img src="../public/img/1687297823359 (1).png" width="50" height="50" alt="" />
          <span className="nav_logo-name">PS_barber</span>
        </div>
        <div className="header-right">
            <a href="/login">
                <button className="btn-login">Iniciar Sesión</button>
            </a>
        </div>
      </header>
      <Footer/>
    </div>
  );
};

export default LandingPage;
