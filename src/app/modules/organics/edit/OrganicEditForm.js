// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  Select,
  //DatePickerField,
} from "../../../../_metronic/_partials/controls";

// Validation schema
const OrganicEditSchema = Yup.object().shape({
  ORGA_VC_NUMERO: Yup.number()
    .integer('Debe ser un documento válido')
    .nullable(),
  ORGA_VC_NOMBRE: Yup.string()
    .min(2, "Mínimo 3 Caracteres")
    .max(64, "Máximo 64 Caracteres")
    .required("El nombre es obligatorio"), 
  ORGA_VC_SIGLA: Yup.string()
    .min(1, "Mínimo 3 Caracteres")
    .max(32, "Máximo 32 Caracteres")
    .required("Las sigas son obligatorias"),
  ORGA_VC_DIRECCION: Yup.string()
    .max(32, "Máximo 32 Caracteres")
    .nullable(),
  ORGA_FG_ESTADO: Yup.boolean(),
});

export function OrganicEditForm({
  saveOrganic,
  organic,
  actionsLoading,
  onHide,
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={organic}
        validationSchema={OrganicEditSchema}
        onSubmit={(values) => {
          saveOrganic(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">
                  <div className="col-md-6 mb-3">
                    <Field
                      withFeedbackLabel={false}
                      name="ORGA_VC_NUMERO"
                      component={Input}
                      placeholder=""
                      label="Número"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <Field
                      withFeedbackLabel={false}
                      name="ORGA_VC_NOMBRE"
                      component={Input}
                      placeholder=""
                      label="Nombre"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <Field
                      withFeedbackLabel={false}
                      name="ORGA_VC_SIGLA"
                      component={Input}
                      placeholder=""
                      label="Siglas"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <Field
                      withFeedbackLabel={false}
                      name="ORGA_VC_DIRECCION"
                      component={Input}
                      placeholder=""
                      label="Dirección"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <Select 
                      withFeedbackLabel={false}
                      name="ORGA_FG_ESTADO"
                      placeholder=""
                      label="Estado"
                    >
                      <option value={0} >Inactivo</option>
                      <option value={1} >Activo</option>
                    </Select>
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                Cancelar
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Guardar
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
