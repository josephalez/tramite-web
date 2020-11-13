import React, { useState } from "react";
//import { useFormik } from "formik";
import { connect } from "react-redux";
//import * as Yup from "yup";
//import { Link } from "react-router-dom";
import { injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { register } from "../_redux/authCrud";
import { Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

function Registration(props) {
  //const { intl } = props;

  const [loading, setLoading] = useState(false);

  const [fullname,setFullname] = useState('');
  const [email,setEmail] = useState('');
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [passwordConfirmation,setPasswordConfirmation] = useState('');
  
  const [error,setError] = useState(false);
  const [errorMessage,setErrorMessage] = useState('');
  const [success,setSuccess] = useState(false);

  const displayError=(message)=>{
    setError(true);
    setErrorMessage(message);
  }

  const displaySuccess = (message)=>{
    setSuccess(true);
  }

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const submitRegister = ()=>{

    if(fullname===''||email===''||username===''||password===''||passwordConfirmation===''){
      displayError('Rellene los campos del formulario');
      return;
    }

    if(passwordConfirmation!==password){
      displayError('Las contraseñas no coinciden');
      return;
    }

    enableLoading();

    register(email,fullname,username, password, passwordConfirmation)
    .then((req) => {
      console.log(req);
      displaySuccess(req.data.message);
      console.log('retrieving user 0')
      props.register(req.data.token);
      console.log('retrieving user 1')
    }).catch((error) => {
      console.log(error.response?error.response:error);
      displayError(error.response?error.response.data.message:"Error al Registrarse");
    })
    .finally(()=>{
      disableLoading();
    });

  }

  return (
    <>

    <div className="fxt-content"> 
      <div className="fxt-form">
          <div className="fxt-transformY-50 fxt-transition-delay-1">   
              <h2>Registro</h2>   
          </div>
          <div className="fxt-transformY-50 fxt-transition-delay-2">     
              <p>Ingrese sus datos para crear una nueva cuenta</p>
          </div>
          <form>
              <div className="form-group">                                                
                  <div className="fxt-transformY-50 fxt-transition-delay-1">                                          
                    <input
                      placeholder="Nombre Completo"
                      type="text"
                      className={`form-control  h-auto py-5 px-6`}
                      name="fullname"
                      onChange={(text)=>{setFullname(text.target.value);}}            
                    />
                    <i className="flaticon2-user h2"></i>
                  </div>
              </div>
              <div className="form-group">                                                
                  <div className="fxt-transformY-50 fxt-transition-delay-1">                                          
                    <input
                      placeholder="Nombre de Usuario"
                      type="text"
                      className={`form-control  h-auto py-5 px-6`}
                      name="username"
                      value={username}            
                      onChange={(text)=>setUsername(text.target.value)}
                    />
                    <i className="flaticon2-user h2"></i>
                  </div>
              </div>
              <div className="form-group">                                                
                  <div className="fxt-transformY-50 fxt-transition-delay-1">                                                
                    <input
                      placeholder="Email"
                      type="email"
                      className={`form-control  h-auto py-5 px-6 `}
                      name="email"
                      value={email}            
                      onChange={(text)=>{setEmail(text.target.value);}}            
                    />
                    <i className="flaticon2-mail h2"></i>
                  </div>
              </div>
              <div className="form-group">                                                
                  <div className="fxt-transformY-50 fxt-transition-delay-2">
                    <input
                      placeholder="Contraseña"
                      type="password"
                      className={`form-control  h-auto py-5 px-6 `}
                      name="password"
                      value={password}            
                      onChange={(text)=>setPassword(text.target.value)}
                    />
                    <i className="flaticon2-lock h2"></i>
                  </div>
              </div>
              <div className="form-group">                                                
                  <div className="fxt-transformY-50 fxt-transition-delay-2">
                    <input
                      placeholder="Confirme Contraseña"
                      type="password"
                      className={`form-control  h-auto py-5 px-6`}
                      name="passwordConfirmation"
                      value={passwordConfirmation}
                      onChange={(text)=>{setPasswordConfirmation(text.target.value);}}            
                    />
                    <i className="flaticon2-lock h2"></i>
                  </div>
              </div>
              <div className="form-group">
                  <div className="fxt-transformY-50 fxt-transition-delay-3">
                      <button 
                        type="button"
                        className="fxt-btn-fill"            
                        disabled={loading}
                        onClick={submitRegister}
                      >
                        <span>Registrarse</span>
                        {loading && <span className="ml-3 spinner spinner-white"></span>}
                      </button>
                  </div>
              </div>
            </form>                            
        </div> 
      </div>
      <Snackbar open={success} autoHideDuration={6000} onClose={()=>{setSuccess(false);}} >
        <MuiAlert elevation={6} variant="filled" severity={"success"}>
          {"Registro exitoso"}
        </MuiAlert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={()=>{setError(false);}} >
        <MuiAlert elevation={6} variant="filled" severity={"error"}>
          {errorMessage}
        </MuiAlert>
      </Snackbar> 
    </>
  );
}

export default injectIntl(connect(null, auth.actions)(Registration));
