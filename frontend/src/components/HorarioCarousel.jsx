const HorarioCarousel = ({ horasDisponibles, horaSeleccionada, handleSeleccionarHora }) => {
  return (
    <div className="horario-carousel">
      {horasDisponibles.map((hora, index) => (
        <div
          key={index}
          className={`hora-item ${hora === horaSeleccionada ? 'hora-seleccionada' : ''}`}
          onClick={() => {
            console.log('Hora seleccionada:', hora);
            handleSeleccionarHora(hora);
          }}
        >
          {hora}
        </div>
      ))}
    </div>
  );
};
export default HorarioCarousel;