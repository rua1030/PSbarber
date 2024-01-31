/* eslint-disable react/prop-types */
import Modal from "@mui/material/Modal";
import tel from "../../../public/img/mobilephone_79875.svg"
import cor from "../../../public/img/google_mail_gmail_logo_icon_159346.svg"
import agen from "../../../public/img/1st_icon-icons.com_68921.svg"
import hora from "../../../public/img/clock_icon-icons.com_54407.svg"
import nom from "../../../public/img/account_username_people_avatar_profile_person_user_icon_258905.svg"

const AgendaInfo = ({ Agenda, handleCloseModal, open }) => {
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
            <div className="card text-center">
            <h5 className="p-1 text-aling-center">Informacion de la cita</h5>
            </div>
            <div className="pt-2">
            <div className="card">
            <div className="row ">
              <div className='col-md-1'>
              <svg width="22" height="22" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="sc-aXZVg juZfmz undefined "><path d="M13.463 11.516a3.07 3.07 0 00-1.012-1.1c-.44-.3-1.112-.604-2.06-.924-.88-.3-1.508-.62-1.86-.944C8.2 8.24 8.04 7.82 8.04 7.256c0-.584.18-1.036.544-1.38.368-.344.896-.52 1.568-.52.668 0 1.18.212 1.56.64.376.428.568 1.02.576 1.756v.28c0 .192.156.344.344.344h.744c.188 0 .34-.148.344-.336v-.28l-.004-.016c-.008-1.072-.28-1.94-.812-2.58-.484-.58-1.144-.94-1.972-1.076-.064-.012-.176-.068-.176-.132V2.848a.597.597 0 00-.596-.596.597.597 0 00-.596.596V3.96c-.004.064-.088.116-.152.124-.8.124-1.456.436-1.952.94-.568.576-.856 1.336-.856 2.252 0 .872.264 1.596.78 2.152.512.548 1.36 1 2.588 1.388.912.316 1.552.648 1.9.992.332.324.492.732.492 1.248 0 .568-.2 1.012-.616 1.364-.424.36-.968.536-1.656.536-.784 0-1.396-.212-1.82-.624-.432-.416-.64-.988-.64-1.74v-.272a.344.344 0 00-.344-.344H6.54a.344.344 0 00-.344.344v.272c0 1.092.316 1.972.932 2.612.552.568 1.308.916 2.252 1.036.064.008.212.064.212.128v.796c0 .328.268.596.596.596a.597.597 0 00.596-.596v-.808c0-.064.048-.116.116-.128.832-.12 1.512-.432 2.02-.932.584-.572.88-1.332.88-2.252.004-.592-.112-1.104-.336-1.528z" fill="#181B32"></path></svg>
              </div>
              <div className="col-md-9 ">
                <p>
                <strong className="">total:</strong> $40.000
                </p>
              </div>
            </div>
            </div>
            </div>
            <div className="pt-1">
            <div className="card">
            <div className="text-center">
            <h6>Resumen de la cita</h6>
            </div>
            <div className="p-2">
            <p>
              
              <strong><img src={nom} /></strong> {Agenda.nombre}
            </p>
            <p>
              <strong><img src={cor} /></strong> {Agenda.correo}
            </p>
            <p>
              <strong><img src={tel} /></strong> {Agenda.telefono}
            </p>
            <p>
              <strong><img src={agen}/></strong> {Agenda.fecha}
            </p>
            <p>
              <strong><img src={hora} alt="" /></strong> {Agenda.hora}
            </p>
            </div>
            </div>
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