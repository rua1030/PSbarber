import React, { useState } from 'react';

const FechaCarousel = ({ fechas, seleccionarFecha }) => {
  const [indiceFecha, setIndiceFecha] = useState(0);

  const handleClick = (index) => {
    setIndiceFecha(index);
    seleccionarFecha(fechas[index]);
  };

  const handlePrev = () => {
    if (indiceFecha > 0) {
      setIndiceFecha(indiceFecha - 1);
      seleccionarFecha(fechas[indiceFecha - 1]);
    }
  };

  const handleNext = () => {
    if (indiceFecha < fechas.length - 1) {
      setIndiceFecha(indiceFecha + 1);
      seleccionarFecha(fechas[indiceFecha + 1]);
    }
  };

  return (
    <div>
      <button onClick={handlePrev}>&lt;</button>
      <ul>
        {fechas.map((fecha, index) => (
          <li
            key={index}
            className={index === indiceFecha ? 'selected' : ''}
            onClick={() => handleClick(index)}
          >
            {fecha}
          </li>
        ))}
      </ul>
      <button onClick={handleNext}>&gt;</button>
    </div>
  );
};

export default FechaCarousel;
