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
const AdminEditSchema = Yup.object().shape({
  CPM_VC_TIPO: Yup.number()
  .min(1, 'Debe ser un tipo válido')
  .integer('Debe ser un tipo válido')
  .required("El Tipo de documento es obligatorio"),
  ADMI_VC_NRODOCUMENTO: Yup.number()
    .integer('Debe ser un documento válido')
    .required("El Número de documento es obligatorio"),
  ADMI_VC_NOMBRES: Yup.string()
    .min(3, "Mínimo 3 Caracteres")
    .max(50, "Máximo 50 Caracteres")
    .required("El nombre es obligatorio"),
  ADMI_VC_PATERNO: Yup.string()
    .min(3, "Mínimo 3 Caracteres")
    .max(50, "Máximo 50 Caracteres")
    .required("El apellido paterno es obligatorio"),
  ADMI_VC_MATERNO: Yup.string()
    .min(3, "Mínimo 3 Caracteres")
    .max(50, "Máximo 50 Caracteres")
    .required("El apellido materno es obligatorio"),
  ADMI_VC_DIRECOMPLETA: Yup.string()
    .min(3, "Mínimo 3 Caracteres")
    .max(50, "Máximo 50 Caracteres")
    .required("La dirección completa es obligatoria"),
  ADMI_VC_TELEFONO: Yup.string()
    .min(3, "Mínimo 3 Caracteres")
    .max(50, "Máximo 50 Caracteres")
    .required("El teléfono es obligatorio"),
  ADMI_VC_CORREO: Yup.string()
    .email("Dirección de correo inválida")
});

export function AdminEditForm({
  saveAdmin,
  admin,
  actionsLoading,
  onHide,
  docs
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={admin}
        validationSchema={AdminEditSchema}
        onSubmit={(values) => {
          saveAdmin(values);
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
                    <Select 
                      name="CPM_VC_TIPO" 
                      label="Tipo de documento" 
                      placeholder="Seleccione el tipo de documento"
                      withFeedbackLabel={false}
                      defaultValue="0"
                    >
                      <option value="0" hidden>Seleccionar</option>
                      {
                        docs.map((docType, index)=>(
                          <option key={index} value={docType.CPM_IN_CODIGO} >{docType.CPM_VC_CODIGO+" - "+docType.CPM_VC_DESCRIPCION}</option>
                        ))
                      }
                    </Select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <Field
                      withFeedbackLabel={false}
                      name="ADMI_VC_NRODOCUMENTO"
                      component={Input}
                      placeholder=""
                      label="Número de documento"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <Field
                      withFeedbackLabel={false}
                      name="ADMI_VC_NOMBRES"
                      component={Input}
                      placeholder=""
                      label="Nombres"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <Field
                      withFeedbackLabel={false}
                      name="ADMI_VC_PATERNO"
                      component={Input}
                      placeholder=""
                      label="Apellido Paterno"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <Field
                      withFeedbackLabel={false}
                      name="ADMI_VC_MATERNO"
                      component={Input}
                      placeholder=""
                      label="Apellido Materno"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <Field
                      withFeedbackLabel={false}
                      name="ADMI_VC_DIRECOMPLETA"
                      component={Input}
                      placeholder="Dirección completa"
                      label="Dirección"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <Field
                      withFeedbackLabel={false}
                      name="ADMI_VC_TELEFONO"
                      component={Input}
                      placeholder=""
                      label="Teléfono"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <Field
                      withFeedbackLabel={false}
                      name="ADMI_VC_CORREO"
                      component={Input}
                      placeholder=""
                      label="Correo Electrónico"
                    />
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
