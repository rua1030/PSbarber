/* eslint-disable react/prop-types */
import Modal from "@mui/material/Modal";


const ClienteInfo = ({ Cliente, handleCloseModal, open }) => {
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
        <div style={contentStyle} className="cliente-info-modal">
          <div>
            <h3>Info Cliente</h3>
            <p>
              <strong>Nombre:</strong> {Cliente.nombre} {Cliente.apellidos}
            </p>
            <p>
              <strong>Tipo Documento:</strong> {Cliente.tipo_documento}
            </p>
            <p>
              <strong>Documento:</strong> {Cliente.documento}
            </p>
            <p>
              <strong>Teléfono:</strong> {Cliente.telefono}
            </p>
            <p>
              <strong>Email:</strong> {Cliente.email}
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

export default ClienteInfo;