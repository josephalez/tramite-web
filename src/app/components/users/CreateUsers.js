import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
//import DatePicker from "react-datepicker";
import axios from 'axios';
import { AppSettings } from "../../../app.settings";

export const CreateUser= (props) =>{

    //const [nacimiento,setnacimiento] = useState('');
    const [login,setlogin] = useState('');
    const [password,setpassword] = useState('');
    const [email,setemail] = useState('');
    const [documento,setdocumento] = useState('');
    const [nombres,setnombres] = useState('');
    const [paterno,setpaterno] = useState('');
    const [materno,setmaterno] = useState('');
    const [telefono,settelefono] = useState('');
    const [observacion,setobservacion] = useState('');
    const [iniciales,setiniciales] = useState('');
    const [email2,setemail2] = useState('');
    const [perfil,setperfil] = useState('');

    const [loading, setLoading]= useState(false);


    const newUser=()=>{

      setLoading(true);

      let params = {
          login,password,email,documento,nombres,
          paterno,materno,telefono,observacion,
          iniciales,email2,perfil,
      }
      axios.post(AppSettings.apiUrl+'seg_users', params)
      .then((res)=>{
        console.log(res);

        props.onSuccess(res.data.message);
        props.onClose();

      }).catch((err)=>{
        console.log(err.response?err.response:err);

          props.onErr('Error al crear usuario');
          props.onClose();

      }).finally(()=>{
        setLoading(false);
        setlogin('')
        setpassword('')
        setemail('')
        setdocumento('')
        setnombres('')
        setpaterno('')
        setmaterno('')
        settelefono('')
        setobservacion('')
        setiniciales('')
        setemail2('')
        setperfil('')
      })
    }

    return (
        <Modal show={props.show} onHide={props.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>
                Crear Nuevo Usuario
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group row">
                
                <div className="col-md-6 col-lg-4">
                  <small className="form-text text-muted">
                    <b>Login</b>
                  </small>
                  <input
                  type="text"
                  className="form-control"
                  name="login"
                  
                  value={login}
                  onChange={(e)=>{setlogin(e.target.value)}}
                  />
                </div>

                <div className="col-md-6 col-lg-4">
                  <small className="form-text text-muted">
                    <b>Password</b>
                  </small>
                  <input
                  type="password"
                  className="form-control"
                  name="password"
                  
                  value={password}
                  onChange={(e)=>{setpassword(e.target.value)}}
                  />
                </div>

                <div className="col-md-6 col-lg-4">
                  <small className="form-text text-muted">
                    <b>email</b>
                  </small>
                  <input
                  type="text"
                  className="form-control"
                  name="email"
                  
                  value={email}
                  onChange={(e)=>{setemail(e.target.value)}}
                  />
                </div>

                <div className="col-md-6 col-lg-4">
                  <small className="form-text text-muted">
                    <b>documento</b>
                  </small>
                  <input
                  type="text"
                  className="form-control"
                  name="documento"
                  
                  value={documento}
                  onChange={(e)=>{setdocumento(e.target.value)}}
                  />
                </div>

                <div className="col-md-6 col-lg-4">
                  <small className="form-text text-muted">
                    <b>nombres</b>
                  </small>
                  <input
                  type="text"
                  className="form-control"
                  name="nombres"
                  
                  value={nombres}
                  onChange={(e)=>{setnombres(e.target.value)}}
                  />
                </div>

                <div className="col-md-6 col-lg-4">
                  <small className="form-text text-muted">
                    <b>paterno</b>
                  </small>
                  <input
                  type="text"
                  className="form-control"
                  name="paterno"
                  
                  value={paterno}
                  onChange={(e)=>{setpaterno(e.target.value)}}
                  />
                </div>

                <div className="col-md-6 col-lg-4">
                  <small className="form-text text-muted">
                    <b>materno</b>
                  </small>
                  <input
                  type="text"
                  className="form-control"
                  name="materno"
                  
                  value={materno}
                  onChange={(e)=>{setmaterno(e.target.value)}}
                  />
                </div>

                <div className="col-md-6 col-lg-4">
                  <small className="form-text text-muted">
                    <b>telefono</b>
                  </small>
                  <input
                  type="text"
                  className="form-control"
                  name="telefono"
                  
                  value={telefono}
                  onChange={(e)=>{settelefono(e.target.value)}}
                  />
                </div>

                <div className="col-md-6 col-lg-4">
                  <small className="form-text text-muted">
                    <b>observacion</b>
                  </small>
                  <input
                  type="text"
                  className="form-control"
                  name="observacion"
                  
                  value={observacion}
                  onChange={(e)=>{setobservacion(e.target.value)}}
                  />
                </div>

                <div className="col-md-6 col-lg-4">
                  <small className="form-text text-muted">
                    <b>iniciales</b>
                  </small>
                  <input
                  type="text"
                  className="form-control"
                  name="iniciales"
                  
                  value={iniciales}
                  onChange={(e)=>{setiniciales(e.target.value)}}
                  />
                </div>

                <div className="col-md-6 col-lg-4">
                  <small className="form-text text-muted">
                    <b>email2</b>
                  </small>
                  <input
                  type="text"
                  className="form-control"
                  name="email2"
                  
                  value={email2}
                  onChange={(e)=>{setemail2(e.target.value)}}
                  />
                </div>

                <div className="col-md-6 col-lg-4">
                  <small className="form-text text-muted">
                    <b>perfil</b>
                  </small>
                  <input
                  type="text"
                  className="form-control"
                  name="perfil"
                  
                  value={perfil}
                  onChange={(e)=>{setperfil(e.target.value)}}
                  />
                </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.onClose}>
              Cerrar
            </Button>
            <Button 
              disabled={loading}
              variant="success" 
              onClick={newUser}>
              Crear
              {loading && <span className="mx-4 spinner spinner-white"></span>}              
            </Button>
          </Modal.Footer>
        </Modal>
    );

}
