import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";

import * as actions from "./_redux/userActions";

import { ListFilter } from "./filter";
import { UsersTable } from "./table";
//import { UsersGrouping } from "./grouping";
import { useUsersUIContext } from "./UIContext";

export function UsersCard() {
  const usersUIContext = useUsersUIContext();
  const usersUIProps = useMemo(() => {
    return {
      queryParams: usersUIContext.queryParams,
      newUserButtonClick: usersUIContext.newUserButtonClick,
    };
  }, [usersUIContext]);

  const dispatch = useDispatch();

  const onReload = ()=>{
    dispatch(actions.fetchUsers(usersUIProps.queryParams));
  }

  return (
    <Card>
      <CardHeader title="Lista de Usarios">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-success"
            onClick={usersUIProps.newUserButtonClick}
          >
            NUEVO USUARIO
          </button>
          <button
            type="button"
            onClick={onReload}
            className="btn btn-icon btn-light-primary btn-hover-primary btn-sm mx-3"
          >
            <span className="svg-icon svg-icon-md svg-icon-light-primary">
              <i className="fas fa-sync-alt" ></i>
            </span>
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ListFilter />
        {//usersUIProps.ids.length > 0 && <UsersGrouping />
        }
        <UsersTable />
      </CardBody>
    </Card>
  );
}
