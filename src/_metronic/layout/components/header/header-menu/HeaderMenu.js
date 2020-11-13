/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
//import SVG from "react-inlinesvg";
import { 
    //toAbsoluteUrl, 
    checkIsActive } from "../../../../_helpers";

export function HeaderMenu({ layoutProps }) {
    const location = useLocation();
    const getMenuItemActive = (url) => {
        return checkIsActive(location, url) ? "menu-item-active" : "";
    }

    return <div
        id="kt_header_menu"
        className={`header-menu header-menu-mobile ${layoutProps.ktMenuClasses}`}
        {...layoutProps.headerMenuAttributes}
    >
        {/*begin::Header Nav*/}
        <ul className={`menu-nav ${layoutProps.ulClasses}`}>
            {/*begin::1 Level*/}
            <li className={`menu-item menu-item-rel ${getMenuItemActive('/documents')}`}>
                <NavLink className="menu-link" to="/documents">
                    <span className="menu-text">Tram. Interno</span>
                    {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                </NavLink>
            </li>
            <li className={`menu-item menu-item-rel ${getMenuItemActive('/documents-2')}`}>
                <NavLink className="menu-link" to="/documents-2">
                    <span className="menu-text">Tram. Externo</span>
                    {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                </NavLink>
            </li>
            <li className={`menu-item menu-item-rel ${getMenuItemActive('/documents')}`}>
                <NavLink className="menu-link" to="/documents">
                    <span className="menu-text">Busqueda</span>
                    {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                </NavLink>
            </li>
            <li className={`menu-item menu-item-rel ${getMenuItemActive('/home')}`}>
                <NavLink className="menu-link" to="/home">
                    <span className="menu-text">Bandeja</span>
                    {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                </NavLink>
            </li>
            {/*end::1 Level*/}

            {/*Classic submenu*/}
            {/*begin::1 Level*/}
            {/*end::1 Level*/}
        </ul>
        {/*end::Header Nav*/}
    </div>;
}