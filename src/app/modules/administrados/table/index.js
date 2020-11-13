// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../_redux/adminActions";
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
import { useAdminsUIContext } from "../UIContext";

export function AdminsTable() {
  // Admins UI Context
  const adminsUIContext = useAdminsUIContext();
  const adminsUIProps = useMemo(() => {
    return {
      //ids: adminsUIContext.ids,
      //setIds: adminsUIContext.setIds,
      queryParams: adminsUIContext.queryParams,
      setQueryParams: adminsUIContext.setQueryParams,
      openEditAdminDialog: adminsUIContext.openEditAdminDialog,
      openDeleteAdminDialog: adminsUIContext.openDeleteAdminDialog,
    };
  }, [adminsUIContext]);

  // Getting curret state of admins list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.admins }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Admins Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    //adminsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchAdmins(adminsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "ADMI_IN_CODIGO",
      text: "Código",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      classes: "text-center",
      headerClasses: "text-center",
    },
    /*{
      dataField: "ADMI_VC_NRODOCUMENTO",
      text: "Documento",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },*/
    {
      dataField: "ADMI_VC_NOMBRES",
      text: "Nombre",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "ADMI_VC_PATERNO",
      text: "Paterno",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "ADMI_VC_MATERNO",
      text: "Materno",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "ADMI_VC_DIRECOMPLETA",
      text: "Dirección",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "action",
      text: "Editar",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditAdminDialog: adminsUIProps.openEditAdminDialog,
        openDeleteAdminDialog: adminsUIProps.openDeleteAdminDialog,
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
    showTotal: false,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: adminsUIProps.queryParams.pageSize,
    page: adminsUIProps.queryParams.pageNumber,
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
                keyField="ADMI_IN_CODIGO"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  adminsUIProps.setQueryParams
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
