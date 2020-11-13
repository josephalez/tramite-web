import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
//import DatePicker from "react-datepicker";
import axios from 'axios';
import { AppSettings } from "../../../app.settings";

export const UserDetails= (props) =>{

    const [email, setemail] = useState('');
    const [nombres, setnombres] = useState('');
    const [paterno, setpaterno] = useState('');
    const [materno, setmaterno] = useState('');
    const [telefono, settelefono] = useState('');
    const [observacion, setobservacion] = useState('');
    //const [perfil, setperfil] = useState('');
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [loadingEdit, setLoadingEdit] = useState(false);

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(()=>{
        if(props.user){
            setemail(props.user.USER_VC_CORREO?props.user.USER_VC_CORREO:'');
            setnombres(props.user.USER_VC_NOMBRE?props.user.USER_VC_NOMBRE:'');
            setpaterno(props.user.USER_VC_PATERNO?props.user.USER_VC_PATERNO:'');
            setmaterno(props.user.USER_VC_MATERNO?props.user.USER_VC_MATERNO:'');
            settelefono(props.user.USER_VC_TELEFONO?props.user.USER_VC_TELEFONO:'');
            setobservacion(props.user.USER_VC_OBSERVACIONES?props.user.USER_VC_OBSERVACIONES:'');
            //setperfil(user.PERF_IN_CODIGO);
            if(props.user.USER_VC_NOMBRE==='ADMIN'&&props.user.USER_VC_NOMBRE==="ADMIN") setIsAdmin(true);
            else setIsAdmin(false);
        }
    },[props.user])

    const userEdit=()=>{

        setLoadingEdit(true);
  
        let params = {
            email,
            nombres,
            paterno,
            materno,
            telefono,
            observacion,
        }
        axios.put(AppSettings.apiUrl+'seg_users/'+props.user.USER_IN_CODIGO, params)
        .then((res)=>{
          console.log(res);
  
          props.onSuccess(res.data.message);
          props.onClose();
  
        }).catch((err)=>{
          console.log(err.response?err.response:err);
  
            props.onErr('Error al editar usuario');
            props.onClose();
  
        }).finally(()=>{
          setLoadingEdit(false);
        })
      }

      const userDelete=()=>{

        setLoadingDelete(true);

        console.log('deleting user',props.user.USER_IN_CODIGO)

        axios.delete(AppSettings.apiUrl+'seg_users/'+props.user.USER_IN_CODIGO)
        .then((res)=>{

          console.log('response from server')
          console.log(res);
  
          props.onSuccess(res.data.message);
          props.onClose();
  
        }).catch((err)=>{

          console.log('error from server')
          console.log(err.response?err.response:err);
  
            props.onErr('Error al editar usuario');
            props.onClose();
  
        }).finally(()=>{
            setLoadingDelete(false);
        })
      }

    return (
        <Modal show={props.show} onHide={props.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>
                Detalles del usuario {props.user?props.user.USER_VC_NOMBRE:''}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group row">
                <div className="row col-12">
                    <label className="col-xl-4 col-lg-3 col-form-label">Correo Electrónico</label>
                    <div className="col-lg-9 col-xl-8">
                        <input 
                            className="form-control form-control-lg form-control-solid" 
                            type="text" 
                            disabled={loadingDelete||loadingEdit||isAdmin}
                            value={email}
                            onChange={(e)=>setemail(e.target.value)}
                            />
                    </div>
                </div>
                <div className="row col-12">
                    <label className="col-xl-4 col-lg-3 col-form-label">Nombres</label>
                    <div className="col-lg-9 col-xl-8">
                        <input 
                            className="form-control form-control-lg form-control-solid" 
                            type="text" 
                            disabled={loadingDelete||loadingEdit||isAdmin}
                            value={nombres}
                            onChange={(e)=>setnombres(e.target.value)}
                            />
                    </div>
                </div>
                <div className="row col-12">
                    <label className="col-xl-4 col-lg-3 col-form-label">Apellido Paterno</label>
                    <div className="col-lg-9 col-xl-8">
                        <input 
                            className="form-control form-control-lg form-control-solid" 
                            type="text" 
                            disabled={loadingDelete||loadingEdit||isAdmin}
                            value={paterno}
                            onChange={(e)=>setpaterno(e.target.value)}
                            />
                    </div>
                </div>
                <div className="row col-12">
                    <label className="col-xl-4 col-lg-3 col-form-label">Apellido Materno</label>
                    <div className="col-lg-9 col-xl-8">
                        <input 
                            className="form-control form-control-lg form-control-solid" 
                            type="text" 
                            disabled={loadingDelete||loadingEdit||isAdmin}
                            value={materno}
                            onChange={(e)=>setmaterno(e.target.value)}
                            />
                    </div>
                </div>
                <div className="row col-12">
                    <label className="col-xl-4 col-lg-3 col-form-label">Teléfono</label>
                    <div className="col-lg-9 col-xl-8">
                        <input 
                            className="form-control form-control-lg form-control-solid" 
                            type="text" 
                            disabled={loadingDelete||loadingEdit||isAdmin}
                            value={telefono}
                            onChange={(e)=>settelefono(e.target.value)}
                            />
                    </div>
                </div>
                <div className="row col-12">
                    <label className="col-xl-4 col-lg-3 col-form-label">Observaciones</label>
                    <div className="col-lg-9 col-xl-8">
                        <input 
                            className="form-control form-control-lg form-control-solid" 
                            type="text" 
                            disabled={loadingDelete||loadingEdit||isAdmin}
                            value={observacion}
                            onChange={(e)=>setobservacion(e.target.value)}
                            />
                    </div>
                </div>
                {/*
                <div className="row col-12">
                    <label className="col-xl-4 col-lg-3 col-form-label">Perfil</label>
                    <div className="col-lg-9 col-xl-8">
                        <input 
                            className="form-control form-control-lg form-control-solid" 
                            type="text" 
                            disabled={loadingDelete||loadingEdit||isAdmin}
                            value={perfil}
                            onChange={(e)=>setperfil(e.target.value)}
                        />
                    </div>
                </div>

                */}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={props.onClose}>
              Cerrar
            </Button>
            <Button variant="danger" onClick={userDelete} disabled={loadingDelete||loadingEdit} >
                <i className="fa fa-trash"></i> Eliminar
                {loadingDelete && <span className="mx-4 spinner spinner-white"></span>}                              
            </Button>
            <Button variant="info" onClick={userEdit} disabled={loadingDelete||loadingEdit} >
                <i className="fa fa-edit"></i> Actualizar
                {loadingEdit && <span className="mx-4 spinner spinner-white"></span>}                              
            </Button>
          </Modal.Footer>
        </Modal>
    );

}
