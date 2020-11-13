import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./UIHelpers";

const UsersUIContext = createContext();

export function useUsersUIContext() {
  return useContext(UsersUIContext);
}

export const UsersUIConsumer = UsersUIContext.Consumer;

export function UsersUIProvider({usersUIEvents, children}) {
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

  const initUser = {
    USER_IN_CODIGO: 0,
    USER_VC_LOGIN:"",
    USER_VC_NRODOC:"",
    USER_VC_PASSWORD:"",
    USER_VC_CORREO:"",
    USER_VC_NOMBRE:"",
    USER_VC_PATERNO:"",
    USER_VC_MATERNO:"",
    USER_VC_TELEFONO:"",
    USER_VC_OBSERVACIONES:"",
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initUser,
    newUserButtonClick: usersUIEvents.newUserButtonClick,
    openEditUserDialog: usersUIEvents.openEditUserDialog,
    openDeleteUserDialog: usersUIEvents.openDeleteUserDialog,
  };

  return <UsersUIContext.Provider value={value}>{children}</UsersUIContext.Provider>;
}