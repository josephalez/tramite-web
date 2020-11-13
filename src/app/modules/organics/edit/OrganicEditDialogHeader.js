import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../_metronic/_partials/controls";

export function OrganicEditDialogHeader({ id }) {
  // Organics Redux state
  const { organicForEdit, actionsLoading } = useSelector(
    (state) => ({
      organicForEdit: state.organics.organicForEdit,
      actionsLoading: state.organics.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "Nueva Unidad Orgánica";
    if (organicForEdit && id) {
      _title = `Editar Unidad Orgánica`//` '${organicForEdit.firstName} ${organicForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [organicForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
