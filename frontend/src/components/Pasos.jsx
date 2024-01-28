
import '../css/landingpage.css'

const Pasos = ({ pasoActual }) => {
  return (
    <div className="pasos-container">
      <div className={`paso ${pasoActual >= 1 ? 'activo' : ''}`}>
        <span>Paso 1</span>
      </div>
      <div className={`paso ${pasoActual >= 2 ? 'activo' : ''}`}>
        <span>Paso 2</span>
      </div>
      <div className={`paso ${pasoActual >= 3 ? 'activo' : ''}`}>
        <span>Paso 3</span>
      </div>
    </div>
  );
};

export default Pasos;
