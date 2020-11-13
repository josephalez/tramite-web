import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./UIHelpers";

const AdminsUIContext = createContext();

export function useAdminsUIContext() {
  return useContext(AdminsUIContext);
}

export const AdminsUIConsumer = AdminsUIContext.Consumer;

export function AdminsUIProvider({adminsUIEvents, children}) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback(nextQueryParams => {
    setQueryParamsBase(prevQueryParams => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const initAdmin = {
    ADMI_IN_CODIGO:0,
    CPM_VC_TIPO:0,
    ADMI_VC_NRODOCUMENTO:0,
    ADMI_VC_NOMBRES:"",
    ADMI_VC_PATERNO:"",
    ADMI_VC_MATERNO:"",
    ADMI_VC_DIRECOMPLETA:"",
    ADMI_VC_TELEFONO:"",
    ADMI_VC_CORREO:"",
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initAdmin,
    newAdminButtonClick: adminsUIEvents.newAdminButtonClick,
    openEditAdminDialog: adminsUIEvents.openEditAdminDialog,
    openDeleteAdminDialog: adminsUIEvents.openDeleteAdminDialog,
  };

  return <AdminsUIContext.Provider value={value}>{children}</AdminsUIContext.Provider>;
}