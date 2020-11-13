import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";

import * as actions from "./_redux/adminActions";

import { ListFilter } from "./filter";
import { AdminsTable } from "./table";
//import { AdminsGrouping } from "./grouping";
import { useAdminsUIContext } from "./UIContext";

export function AdminsCard() {
  const adminsUIContext = useAdminsUIContext();
  const adminsUIProps = useMemo(() => {
    return {
      queryParams: adminsUIContext.queryParams,
      newAdminButtonClick: adminsUIContext.newAdminButtonClick,
    };
  }, [adminsUIContext]);

  const dispatch = useDispatch();

  const onReload = ()=>{
    dispatch(actions.fetchAdmins(adminsUIProps.queryParams));
  }

  return (
    <Card>
      <CardHeader title="Lista de Administrados">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-success"
            onClick={adminsUIProps.newAdminButtonClick}
          >
            AÑADIR ADMINISTRADO
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
        {//adminsUIProps.ids.length > 0 && <AdminsGrouping />
        }
        <AdminsTable />
      </CardBody>
    </Card>
  );
}
