/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from "react";
import {Switch, Redirect} from "react-router-dom";
//import {checkIsActive} from "../../../../_metronic/_helpers";
import {ContentRoute} from "../../../../_metronic/layout"
import Login from "./Login";
import Registration from "./Registration";
import $ from "jquery";
import "../../../libs/vegas/vegas";
import {toAbsoluteUrl} from "../../../../_metronic/_helpers";

//import ForgotPassword from "./ForgotPassword";
import "../../../../_metronic/_assets/sass/pages/login/classic/login-1.scss";
import { matchPath } from "react-router/cjs/react-router.min";

export function AuthPage() {

  useEffect(() => {
    $(function() {

        $('.mtr-vegas-slides').vegas({
            //delay:10000,
            delay:5000,
            timer:false,
            animation:"kenburns", 
            transition:"fade",
            //transition:"swirlLeft",
            slides:[
                {
                    src: process.env.PUBLIC_URL+"/img/bg-1.png"
                },
                {
                    src: process.env.PUBLIC_URL+"/img/bg-2.png"
                },
                {
                    src: process.env.PUBLIC_URL+"/img/bg-3.png"
                },
            ]
        });
        
    });
  }, []);

  const getVegasItemActive = (url) => {

        console.log(window.location.pathname)

        if(url==='/auth/login'){
            return matchPath(window.location.pathname, '/auth/registration')
            ? ""
            : "active";    
        }

        return matchPath(window.location.pathname, url)
        ? "active"
        : "";
    };

  return (
      <>
      <section className="fxt-template-animation fxt-template-layout29 d-flex flex-column flex-root">
        <div className="container-fluid px-0">
            <div className="row col-12 mx-0 px-0">
                <div className="mtr-vegas-slides vegas-container col-md-8 col-12 fxt-bg-img" >
                    <div
                        className="login-aside d-flex flex-row-auto bgi-size-cover bgi-no-repeat p-0"
                    >
                        <div className="d-flex flex-row-fluid flex-column justify-content-between">
                            {/* start:: Aside header */}
                            <a to="/" className="text-sm-right text-md-left flex-column-auto mt-4">
                            <img
                                alt="Logo"
                                className="max-h-70px"
                                src={toAbsoluteUrl("/media/logos/logo-letter-6.png")}
                            />
                            </a>
                        </div>
                    </div>

                    <div className="fxt-page-switcher">
                        <a href="/auth/login" className={`switcher-text1 ${getVegasItemActive('/auth/login')} `}>
                            Login
                        </a>
                        <a href="/auth/registration" className={`switcher-text1 ${getVegasItemActive('/auth/registration')} `}>
                            Registro
                        </a>
                    </div>
                </div>
                <div className="col-md-4 col-12 fxt-bg-color">
                    <div className="ftx-content text-center">
                        <div className="fxt-header">
                            <span className="fxt-logo"><img src={process.env.PUBLIC_URL+"/img/logo-29.png"} alt="Logo"/></span>
                        </div>
                        <Switch>
                            <ContentRoute path="/auth/login" component={Login}/>
                            <ContentRoute path="/auth/registration" component={Registration}/>
                            <Redirect from="/auth" exact={true} to="/auth/login"/>
                            <Redirect to="/auth/login"/>
                        </Switch>
                    </div>
                </div>                
            </div>
        </div> 
      </section>
      </>
  );
}
