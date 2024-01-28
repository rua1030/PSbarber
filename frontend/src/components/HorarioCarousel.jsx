import React from 'react';

const HorarioCarousel = ({ horasDisponibles, horaSeleccionada, handleSeleccionarHora }) => {
  return (
    <div className="horario-carousel">
      {horasDisponibles.map((hora, index) => (
        <div
          key={index}
          className={`hora-item ${hora === horaSeleccionada ? 'hora-seleccionada' : ''}`}
          onClick={() => handleSeleccionarHora(hora)}
        >
          {hora}
        </div>
      ))}
    </div>
  );
};

export default HorarioCarousel;
