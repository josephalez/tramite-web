import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {ModalProgressBar} from "../../../../_metronic/_partials/controls";
import * as actions from "../_redux/organicActions";
import {useOrganicsUIContext} from "../UIContext";

export function OrganicDeleteDialog({ id, show, onHide }) {
  // Organics UI Context
  const organicsUIContext = useOrganicsUIContext();
  const organicsUIProps = useMemo(() => {
    return {
      setIds: organicsUIContext.setIds,
      queryParams: organicsUIContext.queryParams,
    };
  }, [organicsUIContext]);

  // Organics Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.organics.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteOrganic = () => {
    // server request for deleting organic by id
    dispatch(actions.deleteOrganic(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchOrganics(organicsUIProps.queryParams));
      // clear selections list
      organicsUIProps.setIds([]);
      // closing delete modal
      onHide();
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Eliminar Usuario
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Seguro que quiere eliminar este usuario?</span>
        )}
        {isLoading && <span>Eliminando usuario...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancelar
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteOrganic}
            className="btn btn-primary btn-elevate"
          >
            Eliminar
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
