import React, { useMemo, useState } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useAdminsUIContext } from "../UIContext";
import { shallowEqual, useSelector } from "react-redux";

const prepareFilter = (queryParams, values) => {
  const { nombres, type } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  // Filter by type
  filter.type = type !== "" ? +type : undefined;
  // Filter by all fields
  filter.nombres = nombres;
  newQueryParams.filter = filter;
  return newQueryParams;
};

export function ListFilter({ listLoading }) {
  // Admins UI Context
  const adminsUIContext = useAdminsUIContext();
  const adminsUIProps = useMemo(() => {
    return {
      queryParams: adminsUIContext.queryParams,
      setQueryParams: adminsUIContext.setQueryParams,
    };
  }, [adminsUIContext]);

  const [writing, setWriting]= useState(null);

  const docTypes = useSelector(
    state=>state.admins.docTypes,
    shallowEqual,
  )

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(adminsUIProps.queryParams, values);
    if (!isEqual(newQueryParams, adminsUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      adminsUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          nombres:"",
          type:"",
        }}
        onSubmit={(values) => {
          applyFilter(values);
        }}
      >
        {({
          values,
          handleSubmit,
          handleBlur,
          //handleChange,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="form-group row">
              <div className="col-md-6 pb-3">
                <small className="form-text text-muted">
                  <b>Filtrar</b> por tipo de documento
                </small>
                <select
                  className="form-control"
                  placeholder="Filtrar por tipo"
                  name="type"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setFieldValue("type", e.target.value);
                    handleSubmit();
                  }}
                  value={values.type}
                >
                  <option value="">Todos</option>
                  {docTypes&&docTypes.map((doc,index)=>(
                      <option key={index} value={doc.CPM_IN_CODIGO} >{doc.CPM_VC_CODIGO+" - "+doc.CPM_VC_DESCRIPCION}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 pb-3">
                <small className="form-text text-muted">
                  <b>Buscar</b> por nombre
                </small>
                <input
                  type="text"
                  className="form-control"
                  name="nombres"
                  placeholder="Nombres"
                  onBlur={handleBlur}
                  value={values.nombres}
                  onChange={(e) => {
                    if(writing){
                      clearTimeout(writing);
                    }
                    setFieldValue("nombres", e.target.value);
                    setWriting(setTimeout(() => {
                      handleSubmit();
                    }, 1000));
                  }}
                />
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
