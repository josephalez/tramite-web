import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../_redux/organicActions";
import { OrganicEditDialogHeader } from "./OrganicEditDialogHeader";
import { OrganicEditForm } from "./OrganicEditForm";
import { useOrganicsUIContext } from "../UIContext";

export function OrganicEditDialog({ id, show, onHide }) {
  // Organics UI Context
  const organicsUIContext = useOrganicsUIContext();
  const organicsUIProps = useMemo(() => {
    return {
      initOrganic: organicsUIContext.initOrganic,
      queryParams: organicsUIContext.queryParams,
    };
  }, [organicsUIContext]);
  // Organics Redux state
  const dispatch = useDispatch();

  const { entities } = useSelector(
    (state) => ({
      entities: state.organics.entities,
    }),
    shallowEqual
  );

  useEffect(() => {
    let organic = entities.filter(el=>el.ORGA_IN_CODIGO==id)[0];
    dispatch(actions.fetchOrganic(organic));
  }, [id, dispatch]);

  const { actionsLoading, organicForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.organics.actionsLoading,
      organicForEdit: state.organics.organicForEdit,
    }),
    shallowEqual
  );

  // server request for saving organic
  const saveOrganic = (organic) => {
    if (!id) {
      // server request for creating organic
      dispatch(actions.createOrganic(organic, organicsUIProps.queryParams)).then(() => onHide());
    } else {
      // server request for updating organic
      dispatch(actions.updateOrganic(organic, organicsUIProps.queryParams)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <OrganicEditDialogHeader id={id} />
      <OrganicEditForm
        saveOrganic={saveOrganic}
        actionsLoading={actionsLoading}
        organic={organicForEdit || organicsUIProps.initOrganic}
        onHide={onHide}
      />
    </Modal>
  );
}
