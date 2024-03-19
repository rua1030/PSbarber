/* eslint-disable react/prop-types */
import Modal from "@mui/material/Modal";


const EmpleadoInfo = ({ Empleado, handleCloseModal, open }) => {
  const modalStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const contentStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    marginTop: "8%",
  };


  return (
    <Modal open={open} onClose={handleCloseModal}>
      <div style={modalStyle}>
        <div style={contentStyle} className="Empleado-info-modal">
          <div>
            <h3 >Info Empleado</h3>
            <p>
              <strong>ID Empleado:</strong> {Empleado.id_Empleado}
            </p>
            <p>
              <strong>Nombre:</strong> {Empleado.nombre} {Empleado.apellidos}
            </p>
            <p>
              <strong>Tipo Documento:</strong> {Empleado.tipo_documento}
            </p>
            <p>
              <strong>Documento:</strong> {Empleado.documento}
            </p>
            <p>
              <strong>Teléfono:</strong> {Empleado.telefono}
            </p>
            <p>
              <strong>Email:</strong> {Empleado.email}
            </p>
            <p>
            <strong>tipo de empleado: </strong>{Empleado.tipo_empleado}
            </p>
          </div>
          <button className="btn btn-outline-dark me-1" onClick={handleCloseModal}>
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EmpleadoInfo;