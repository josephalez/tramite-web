import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";

import * as actions from "./_redux/organicActions";

import { ListFilter } from "./filter";
import { OrganicsTable } from "./table";
//import { OrganicsGrouping } from "./grouping";
import { useOrganicsUIContext } from "./UIContext";

export function OrganicsCard() {
  const organicsUIContext = useOrganicsUIContext();
  const organicsUIProps = useMemo(() => {
    return {
      queryParams: organicsUIContext.queryParams,
      newOrganicButtonClick: organicsUIContext.newOrganicButtonClick,
    };
  }, [organicsUIContext]);

  const dispatch = useDispatch();

  const onReload = ()=>{
    dispatch(actions.fetchOrganics(organicsUIProps.queryParams));
  }

  return (
    <Card>
      <CardHeader title="Lista de Unidades Orgánicas">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-success"
            onClick={organicsUIProps.newOrganicButtonClick}
          >
            NUEVA UNIDAD
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
        {//organicsUIProps.ids.length > 0 && <OrganicsGrouping />
        }
        <OrganicsTable />
      </CardBody>
    </Card>
  );
}
