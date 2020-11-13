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
  //Select,
  //DatePickerField,
} from "../../../../_metronic/_partials/controls";

// Validation schema
const UserEditSchema = Yup.object().shape({
  USER_VC_LOGIN: Yup.string()
    .min(3, "Mínimo 3 Caracteres")
    .max(50, "Máximo 50 Caracteres")
    .required("El teléfono es obligatorio"),
  USER_VC_PASSWORD: Yup.string()
    .min(8, "Mínimo 8 Caracteres")
    .max(64, "Máximo 64 Caracteres")
    .required("La contraseña es obligatoria"),
  USER_VC_NRODOC: Yup.number()
    .integer('Debe ser un documento válido')
    .required("El Número de documento es obligatorio"),
  USER_VC_NOMBRE: Yup.string()
    .min(3, "Mínimo 3 Caracteres")
    .max(50, "Máximo 50 Caracteres")
    .required("El nombre es obligatorio"),
  USER_VC_PATERNO: Yup.string()
    .min(3, "Mínimo 3 Caracteres")
    .max(50, "Máximo 50 Caracteres")
    .required("El apellido paterno es obligatorio"),
  USER_VC_MATERNO: Yup.string()
    .min(3, "Mínimo 3 Caracteres")
    .max(50, "Máximo 50 Caracteres")
    .required("El apellido materno es obligatorio"),
  USER_VC_TELEFONO: Yup.string()
    .min(3, "Mínimo 3 Caracteres")
    .max(50, "Máximo 50 Caracteres")
    .required("El teléfono es obligatorio"),
  USER_VC_OBSERVACIONES: Yup.string()
    .nullable()
    .max(128, "Máximo 128 caracteres"),
  USER_VC_CORREO: Yup.string()
    .nullable()
    .email("Dirección de correo inválida"),
});

export function UserEditForm({
  saveUser,
  user,
  actionsLoading,
  onHide,
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={user}
        validationSchema={UserEditSchema}
        onSubmit={(values) => {
          saveUser(values);
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
                      name="USER_VC_LOGIN"
                      component={Input}
                      placeholder="cristian_ochoa"
                      label="Nombre de Login"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <Field
                      withFeedbackLabel={false}
                      name="USER_VC_PASSWORD"
                      component={Input}
                      type="password"
                      placeholder="********"
                      label="Contraseña"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <Field
                      withFeedbackLabel={false}
                      name="USER_VC_NRODOC"
                      component={Input}
                      placeholder="13245"
                      label="Nro Documento"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <Field
                      withFeedbackLabel={false}
                      name="USER_VC_CORREO"
                      component={Input}
                      placeholder="ejemplo@email.com"
                      label="Correo Electrónico"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <Field
                      withFeedbackLabel={false}
                      name="USER_VC_NOMBRE"
                      component={Input}
                      placeholder="Cristian"
                      label="Nombre"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <Field
                      withFeedbackLabel={false}
                      name="USER_VC_PATERNO"
                      component={Input}
                      placeholder="Ochoa"
                      label="Apellido Paterno"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <Field
                      withFeedbackLabel={false}
                      name="USER_VC_MATERNO"
                      component={Input}
                      placeholder="Perez"
                      label="Apellido Materno"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <Field
                      withFeedbackLabel={false}
                      name="USER_VC_TELEFONO"
                      component={Input}
                      placeholder="+12345"
                      label="Número de Teléfono"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <Field
                      withFeedbackLabel={false}
                      name="USER_VC_OBSERVACIONES"
                      component={Input}
                      placeholder="Observaciones"
                      label="Observaciones"
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
