// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../_redux/organicActions";
import {
  //getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../_metronic/_helpers";
import * as uiHelpers from "../UIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../_metronic/_partials/controls";
import { useOrganicsUIContext } from "../UIContext";

export function OrganicsTable() {
  // Organics UI Context
  const organicsUIContext = useOrganicsUIContext();
  const organicsUIProps = useMemo(() => {
    return {
      //ids: organicsUIContext.ids,
      //setIds: organicsUIContext.setIds,
      queryParams: organicsUIContext.queryParams,
      setQueryParams: organicsUIContext.setQueryParams,
      openEditOrganicDialog: organicsUIContext.openEditOrganicDialog,
      openDeleteOrganicDialog: organicsUIContext.openDeleteOrganicDialog,
    };
  }, [organicsUIContext]);

  // Getting curret state of organics list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.organics }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Organics Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    //organicsUIProps.setIds([]);
    // server call by queryParams
    console.log(organicsUIProps.queryParams);
    dispatch(actions.fetchOrganics(organicsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organicsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField:"ORGA_IN_CODIGO",
      text: "Código",
      sort:true,
      sortCaret: sortCaret,
      headerSortingClasses,
      classes: "text-center",
      headerClasses: "text-center",
    },
    {
      dataField:"ORGA_VC_NUMERO",
      text: "Número",
      sort:true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField:"ORGA_VC_NOMBRE",
      text: "Nombre",
      sort:true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField:"ORGA_VC_SIGLA",
      text: "Siglas",
      sort:true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField:"ORGA_VC_DIRECCION",
      text: "Dirección",
      sort:true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField:"ORGA_FG_ESTADO",
      text: "Estado",
      sort:true,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: columnFormatters.StatusColumnFormatter,
    },
    {
      dataField: "action",
      text: "Editar",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditOrganicDialog: organicsUIProps.openEditOrganicDialog,
        openDeleteOrganicDialog: organicsUIProps.openDeleteOrganicDialog,
      },
      classes: "text-right pr-3",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    showTotal: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: organicsUIProps.queryParams.pageSize,
    page: organicsUIProps.queryParams.pageNumber,
  };

  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                remote
                keyField="ORGA_IN_CODIGO"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  organicsUIProps.setQueryParams
                )}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
