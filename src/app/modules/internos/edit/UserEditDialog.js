import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../_redux/userActions";
import { UserEditDialogHeader } from "./UserEditDialogHeader";
import { UserEditForm } from "./UserEditForm";
import { useUsersUIContext } from "../UIContext";

export function UserEditDialog({ id, show, onHide }) {
  // Users UI Context
  const usersUIContext = useUsersUIContext();
  const usersUIProps = useMemo(() => {
    return {
      initUser: usersUIContext.initUser,
      queryParams: usersUIContext.queryParams,
    };
  }, [usersUIContext]);
  // Users Redux state
  const dispatch = useDispatch();

  const { entities } = useSelector(
    (state) => ({
      entities: state.users.entities,
    }),
    shallowEqual
  );

  useEffect(() => {
    let user = entities.filter(el=>el.USER_IN_CODIGO==id)[0];
    dispatch(actions.fetchUser(user));
  }, [id, dispatch]);

  const { actionsLoading, userForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.users.actionsLoading,
      userForEdit: state.users.userForEdit,
    }),
    shallowEqual
  );

  // server request for saving user
  const saveUser = (user) => {
    if (!id) {
      // server request for creating user
      dispatch(actions.createUser(user, usersUIProps.queryParams)).then(() => onHide());
    } else {
      // server request for updating user
      dispatch(actions.updateUser(user, usersUIProps.queryParams)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <UserEditDialogHeader id={id} />
      <UserEditForm
        saveUser={saveUser}
        actionsLoading={actionsLoading}
        user={userForEdit || usersUIProps.initUser}
        onHide={onHide}
      />
    </Modal>
  );
}
