import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../_metronic/_partials/controls";

export function AdminEditDialogHeader({ id }) {
  // Admins Redux state
  const { adminForEdit, actionsLoading } = useSelector(
    (state) => ({
      adminForEdit: state.admins.adminForEdit,
      actionsLoading: state.admins.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "Nuevo administrado";
    if (adminForEdit && id) {
      _title = `Editar administrado`//` '${adminForEdit.firstName} ${adminForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [adminForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
