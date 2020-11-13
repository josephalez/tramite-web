import React, { useMemo, useState } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useOrganicsUIContext } from "../UIContext";

const prepareFilter = (queryParams, values) => {
  const { nombres, type } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  // Filter by type
  // Filter by all fields
  filter.nombres = nombres;
  newQueryParams.filter = filter;
  return newQueryParams;
};

export function ListFilter({ listLoading }) {
  // Organics UI Context
  const organicsUIContext = useOrganicsUIContext();
  const organicsUIProps = useMemo(() => {
    return {
      queryParams: organicsUIContext.queryParams,
      setQueryParams: organicsUIContext.setQueryParams,
    };
  }, [organicsUIContext]);

  const [writing, setWriting]= useState(null);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(organicsUIProps.queryParams, values);
    if (!isEqual(newQueryParams, organicsUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      organicsUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          nombres:"",
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
