import React, { useState } from "react";
//import { Link } from "react-router-dom";
//import { useFormik } from "formik";
//import * as Yup from "yup";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { login } from "../_redux/authCrud";
import { Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

/*
  INTL (i18n) docs:
  https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage
*/
/*
  Formik+YUP:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
*/

function Login(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
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

  const triggerLogin = (username,password) => {
    setLoading(true);
    login(username, password)
    .then((req) => {
      console.log(req);
      displaySuccess(req.data.message);
      props.login(req.data.token,req.data.user);
    }).catch((error) => {
      console.log(error.response?error.response:error);
      displayError(error.response?error.response.data.message:"Error al iniciar sesión");
    })
    .finally(()=>{
      setLoading(false);
    });
  }

  return (
    <>

    <div className="fxt-content"> 
      <div className="fxt-form">
          <div className="fxt-transformY-50 fxt-transition-delay-1">   
              <h2>Iniciar sesión</h2>
          </div>
          <div className="fxt-transformY-50 fxt-transition-delay-2">     
              <p>Sistema con Documentación Digital</p>
          </div>
          <form>
              <div className="form-group">                                                
                  <div className="fxt-transformY-50 fxt-transition-delay-1">                                          
                    <input
                      placeholder="Nombre de Usuario o Correo"
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
                  <div className="fxt-transformY-50 fxt-transition-delay-3">
                      <button 
                        type="button"
                        className="fxt-btn-fill"            
                        disabled={loading}
                        onClick={()=>triggerLogin(username,password)}                        
                      >
                        <span>Acceder</span>
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

export default injectIntl(connect(null, auth.actions)(Login));
