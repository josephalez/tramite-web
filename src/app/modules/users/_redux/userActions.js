import * as requestFromServer from "./usersCrud";
import { usersSlice, callTypes} from "./usersSlice";

const {actions} = usersSlice;

export const fetchUsers = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findUsers(queryParams)
    .then(response => {
      console.log(response);
      const { totalCount, entities } = response.data;
      dispatch(actions.usersFetched({ totalCount, entities }));
    })
    .catch(error => {
      console.log(error.response?error.response:error);
      error.clientMessage = "No se encontraron usuarios";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const deleteUser = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteUser(id)
    .then(response => {
      console.log(response);
      dispatch(actions.userDeleted({ id }));
    })
    .catch(error => {
      console.log(error.response?error.response:error);
      error.clientMessage = "No se pudo eliminar el usuario";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const fetchUser = user => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return dispatch(actions.userFetched({ userForEdit: user }));
};

export const createUser = (userForCreation,queryParams) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  console.log(userForCreation);
  return requestFromServer
    .createUser(userForCreation)
    .then(response => {
      console.log(response);
      dispatch(fetchUsers(queryParams));
    })
    .catch(error => {
      console.log(error.response?error.response:error);
      error.clientMessage = "No se pudo crear el usuario";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateUser = (user,queryParams) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateUser(user)
    .then(response => {
      console.log('response', response);
      dispatch(fetchUsers(queryParams));
    })
    .catch(error => {
      console.log(error.response?error.response:error);
      error.clientMessage = "No se pudo actualizar el usuario";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};