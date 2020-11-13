import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./UIHelpers";

const OrganicsUIContext = createContext();

export function useOrganicsUIContext() {
  return useContext(OrganicsUIContext);
}

export const OrganicsUIConsumer = OrganicsUIContext.Consumer;

export function OrganicsUIProvider({organicsUIEvents, children}) {
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

  const initOrganic = {
    ORGA_IN_CODIGO:0,
    ORGA_VC_NUMERO: "",
    ORGA_VC_NOMBRE: "",
    ORGA_VC_SIGLA: "",
    ORGA_VC_DIRECCION: "",
    ORGA_FG_ESTADO: false,
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initOrganic,
    newOrganicButtonClick: organicsUIEvents.newOrganicButtonClick,
    openEditOrganicDialog: organicsUIEvents.openEditOrganicDialog,
    openDeleteOrganicDialog: organicsUIEvents.openDeleteOrganicDialog,
  };

  return <OrganicsUIContext.Provider value={value}>{children}</OrganicsUIContext.Provider>;
}