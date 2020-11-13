import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
//import DatePicker from "react-datepicker";
import axios from 'axios';
import { AppSettings } from "../../../app.settings";

export const CreateDocument= (props) =>{

    //const [registro, setRegistro] = useState(null);
    const [nro_tramite,setNro_tramite] = useState('');
    const [estado,setEstado] = useState('');
    const [asunto,setAsunto] = useState('');
    const [tipo,setTipo] = useState('');
    const [destino,setDestino] = useState('');
    const [folios,setFolios] = useState('');
    const [administrado,setAdministrado] = useState('');

    const [loading, setLoading]= useState(false);


    const newDocument=()=>{

      setLoading(true);

      if( nro_tramite==='' || estado==='' || asunto==='' || tipo==='' 
      || destino==='' || folios==='' || administrado===''){
        return;
      }

      let params = {
        nro_tramite,estado,asunto,tipo,destino,folios,administrado,
      }
      axios.post(AppSettings.apiUrl+'documents', params)
      .then((res)=>{
        console.log(res);

        props.onSuccess(res.data.message);
        props.onClose();

      }).catch((err)=>{
        console.log(err.response?err.response:err);

          props.onErr('Error al crear documento');
          props.onClose();

      }).finally(()=>{
        setLoading(false);
        setNro_tramite('');
        setEstado('');
        setAsunto('');
        setTipo('');
        setDestino('');
        setFolios('');
        setAdministrado('');
      })
    }

    return (
        <Modal show={props.show} onHide={props.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>
                Crear Nuevo Documento
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group row">
              <div className="col-md-6 col-lg-4">
                  <small className="form-text text-muted">
                    <b>Nro Trámite</b>
                  </small>
                  <input
                  type="text"
                  className="form-control"
                  name="nro_tramite"
                  placeholder="12345"
                  value={nro_tramite}
                  onChange={(e)=>{setNro_tramite(e.target.value)}}
                  />
              </div>
              <div className="col-md-6 col-lg-4">
                  <small className="form-text text-muted">
                    <b>Estado</b>
                  </small>
                  <input
                  type="text"
                  className="form-control"
                  name="estado"
                  placeholder="REMITIDO"
                  value={estado}
                  onChange={(e)=>{setEstado(e.target.value)}}
                  />
              </div>
              <div className="col-md-6 col-lg-4">
                  <small className="form-text text-muted">
                    <b>Asunto</b>
                  </small>
                  <input
                  type="text"
                  className="form-control"
                  name="asunto"
                  value={asunto}
                  onChange={(e)=>{setAsunto(e.target.value)}}
                  />
              </div>
              <div className="col-md-6 col-lg-4">
                  <small className="form-text text-muted">
                    <b>Tipo</b>
                  </small>
                  <input
                  type="text"
                  className="form-control"
                  name="tipo"
                  value={tipo}
                  onChange={(e)=>{setTipo(e.target.value)}}
                  />
              </div>
              <div className="col-md-6 col-lg-4">
                  <small className="form-text text-muted">
                    <b>Destino</b>
                  </small>
                  <input
                  type="text"
                  className="form-control"
                  name="destino"
                  value={destino}
                  onChange={(e)=>{setDestino(e.target.value)}}
                  />
              </div>
              <div className="col-md-6 col-lg-4">
                  <small className="form-text text-muted">
                    <b>Folios</b>
                  </small>
                  <input
                  type="text"
                  className="form-control"
                  name="folios"
                  value={folios}
                  onChange={(e)=>{setFolios(e.target.value)}}
                  />
              </div>
              <div className="col-md-6 col-lg-4">
                  <small className="form-text text-muted">
                    <b>Administrado</b>
                  </small>
                  <input
                  type="text"
                  className="form-control"
                  name="administrado"
                  value={administrado}
                  onChange={(e)=>{setAdministrado(e.target.value)}}
                  />
              </div>
              {/*<div className="col-md-6 col-lg-4">
                  <small className="form-text text-muted">
                    <b>Fecha de Registro</b>
                  </small>
                  <DatePicker 
                    className="form-control"
                    selected={registro}
                    onSelect={(date)=>{console.log("date",date);setRegistro(date)}}
                    placeholderText="Seleccione una fecha"
                    isClearable
                    locale="es-Es"
                  >
                  </DatePicker>
              </div>*/}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="info" onClick={props.onClose}>
              Cerrar
            </Button>
            <Button 
              disabled={loading}
              variant="success" 
              onClick={newDocument}>
              Crear
              {loading && <span className="mx-4 spinner spinner-white"></span>}              
            </Button>
          </Modal.Footer>
        </Modal>
    );

}
