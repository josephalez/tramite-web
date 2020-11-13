import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {ModalProgressBar} from "../../../../_metronic/_partials/controls";
import * as actions from "../_redux/adminActions";
import {useAdminsUIContext} from "../UIContext";

export function AdminDeleteDialog({ id, show, onHide }) {
  // Admins UI Context
  const adminsUIContext = useAdminsUIContext();
  const adminsUIProps = useMemo(() => {
    return {
      setIds: adminsUIContext.setIds,
      queryParams: adminsUIContext.queryParams
    };
  }, [adminsUIContext]);

  // Admins Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.admins.actionsLoading }),
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

  const deleteAdmin = () => {
    // server request for deleting admin by id
    dispatch(actions.deleteAdmin(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchAdmins(adminsUIProps.queryParams));
      // clear selections list
      adminsUIProps.setIds([]);
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
          Eliminar Admninistrado
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Seguro que quiere eliminar este administrado?</span>
        )}
        {isLoading && <span>Eliminando administrado...</span>}
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
            onClick={deleteAdmin}
            className="btn btn-primary btn-elevate"
          >
            Eliminar
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
