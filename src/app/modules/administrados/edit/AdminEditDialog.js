import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../_redux/adminActions";
import { AdminEditDialogHeader } from "./AdminEditDialogHeader";
import { AdminEditForm } from "./AdminEditForm";
import { useAdminsUIContext } from "../UIContext";

export function AdminEditDialog({ id, show, onHide }) {
  // Admins UI Context
  const adminsUIContext = useAdminsUIContext();
  const adminsUIProps = useMemo(() => {
    return {
      initAdmin: adminsUIContext.initAdmin,
      queryParams: adminsUIContext.queryParams,
    };
  }, [adminsUIContext]);
  // Admins Redux state
  const dispatch = useDispatch();

  const { entities } = useSelector(
    (state) => ({
      entities: state.admins.entities,
    }),
    shallowEqual
  );

  useEffect(() => {
    let admin = entities.filter(el=>el.ADMI_IN_CODIGO==id)[0];
    dispatch(actions.fetchAdmin(admin));
  }, [id, dispatch]);

  const { actionsLoading, adminForEdit, docTypes } = useSelector(
    (state) => ({
      actionsLoading: state.admins.actionsLoading,
      adminForEdit: state.admins.adminForEdit,
      docTypes: state.admins.docTypes,
    }),
    shallowEqual
  );

  // server request for saving admin
  const saveAdmin = (admin) => {
    if (!id) {
      // server request for creating admin
      dispatch(actions.createAdmin(admin, adminsUIProps.queryParams)).then(() => onHide());
    } else {
      // server request for updating admin
      dispatch(actions.updateAdmin(admin, adminsUIProps.queryParams)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <AdminEditDialogHeader id={id} />
      <AdminEditForm
        saveAdmin={saveAdmin}
        actionsLoading={actionsLoading}
        docs={docTypes || []}
        admin={adminForEdit || adminsUIProps.initAdmin}
        onHide={onHide}
      />
    </Modal>
  );
}
