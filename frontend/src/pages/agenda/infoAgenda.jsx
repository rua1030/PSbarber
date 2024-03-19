/* eslint-disable react/prop-types */
import Modal from "@mui/material/Modal";
import tel from "../../../public/img/mobilephone_79875.svg";
import cor from "../../../public/img/google_mail_gmail_logo_icon_159346.svg";
import agen from "../../../public/img/1st_icon-icons.com_68921.svg";
import hora from "../../../public/img/clock_icon-icons.com_54407.svg";
import nom from "../../../public/img/account_username_people_avatar_profile_person_user_icon_258905.svg";

const AgendaInfo = ({ Agenda, handleCloseModal, open }) => {
  const modalStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const contentStyle = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    marginTop: "8%",
  };

  const rowStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  };

  const labelStyle = {
    width: "120px",
    marginRight: "20px",
  };

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <div style={modalStyle}>
        <div style={contentStyle} className="cliente-info-modal">
          <div className="card text-center">
            <h5 className="p-1 text-aling-center">Informacion de la cita</h5>
          </div>
          <div className="pt-2">
            <div className="card">
              <div style={rowStyle}>
                <div style={labelStyle}>
                  <strong>
                    <img src={nom} alt="" />
                  </strong>{" "}
                  Nombre:
                </div>
                {Agenda.nombre}
              </div>
              <div style={rowStyle}>
                <div style={labelStyle}>
                  <strong>
                    <img src={cor} alt="" />
                  </strong>{" "}
                  Correo:
                </div>
                {Agenda.correo}
              </div>
              <div style={rowStyle}>
                <div style={labelStyle}>
                  <strong>
                    <img src={tel} alt="" />
                  </strong>{" "}
                  Teléfono:
                </div>
                {Agenda.telefono}
              </div>
              <div style={rowStyle}>
                <div style={labelStyle}>
                  <strong>
                    <img src={agen} alt="" />
                  </strong>{" "}
                  Fecha:
                </div>
                {Agenda.fecha}
              </div>
              <div style={rowStyle}>
                <div style={labelStyle}>
                  <strong>
                    <img src={hora} alt="" />
                  </strong>{" "}
                  Hora:
                </div>
                {Agenda.hora}
              </div>
              {/* Otras propiedades de Agenda */}
            </div>
          </div>
          <div className="pt-2">
            <button className=" btn btn-outline-dark me-1" onClick={handleCloseModal}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AgendaInfo;
