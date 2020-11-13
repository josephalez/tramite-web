import React, {useMemo} from "react";
//import {AsideMenuList} from "./AsideMenuList";
import {useHtmlClassService} from "../../../_core/MetronicLayout";

import {NavLink}  from "react-router-dom";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl, checkIsActive} from "../../../../_helpers";
import {useLocation} from "react-router";


export function AsideMenu({disableScroll}) {

  const location = useLocation();

  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
        ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open `
        : "";
  };


  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      layoutConfig: uiService.config,
      asideMenuAttr: uiService.getAttributes("aside_menu"),
      ulClasses: uiService.getClasses("aside_menu_nav", true),
      asideClassesFromConfig: uiService.getClasses("aside_menu", true)
    };
  }, [uiService]);

  return (
    <>
      {/* begin::Menu Container */}
      <div
        id="kt_aside_menu"
        data-menu-vertical="1"
        className={`aside-menu my-4 ${layoutProps.asideClassesFromConfig}`}
        {...layoutProps.asideMenuAttr}
      >
        <ul className="menu-nav">
          <li
                className={`menu-item ${getMenuItemActive("/home", false)}`}
                aria-haspopup="true"
                >
              <NavLink className="menu-link" to="/home">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Home.svg")}/>              
                </span>
                <span className="menu-text">Inicio</span>    
              </NavLink>
          </li>
          <li
                className={`menu-item ${getMenuItemActive("/documents", false)}`}
                aria-haspopup="true"
                >
              <NavLink className="menu-link" to="/documents">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}/>              
              </span>
                <span className="menu-text">Documentos</span>    
              </NavLink>
          </li>
          <li
                className={`menu-item ${getMenuItemActive("/documents-2", false)}`}
                aria-haspopup="true"
                >
              <NavLink className="menu-link" to="/internos">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/Navigation/Plus.svg")}/>
              </span>
                <span className="menu-text">Nuevo trámite</span>
              </NavLink>
          </li>
          <li
                className={`menu-item ${getMenuItemActive("/users", false)}`}
                aria-haspopup="true"
                >
              <NavLink className="menu-link" to="/users">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/General/User.svg")}/>
              </span>
                <span className="menu-text">Usuarios</span>
              </NavLink>
          </li>
          <li
                className={`menu-item ${getMenuItemActive("/administrados", false)}`}
                aria-haspopup="true"
                >
              <NavLink className="menu-link" to="/administrados">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Address-card.svg")}/>
              </span>
                <span className="menu-text">Administrados</span>
              </NavLink>
          </li>
          <li
                className={`menu-item ${getMenuItemActive("/chat", false)}`}
                aria-haspopup="true"
                >
              <NavLink className="menu-link" to="/chat">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Chat6.svg")}/>
              </span>
                <span className="menu-text">Mensajes</span>
              </NavLink>
          </li>
          <li
                className={`menu-item ${getMenuItemActive("/organics", false)}`}
                aria-haspopup="true"
                >
              <NavLink className="menu-link" to="/organics">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/Files/File.svg")}/>
              </span>
                <span className="menu-text">Unidades Orgánicas</span>
              </NavLink>
          </li>
          <li
                className={`menu-item`}
                aria-haspopup="true"
                >
              <NavLink className="menu-link" to="/logout">                
                <span className="svg-icon menu-icon">
                  <SVG src={toAbsoluteUrl("/media/svg/icons/Navigation/Sign-out.svg")}/>
                </span>
                <span className="menu-text">Cerrar sesión</span>
              </NavLink>              
          </li>
        </ul>
      </div>
      {/* end::Menu Container */}
    </>
  );
}