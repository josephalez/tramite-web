import * as requestFromServer from "./organicsCrud";
import { organicsSlice, callTypes} from "./organicsSlice";

const {actions} = organicsSlice;

export const fetchOrganics = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findOrganics(queryParams)
    .then(response => {
      console.log(response);
      const { totalCount, entities } = response.data;
      dispatch(actions.organicsFetched({ totalCount, entities }));
    })
    .catch(error => {
      console.log(error.response?error.response:error);
      error.clientMessage = "No se encontraron usuarios";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const deleteOrganic = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteOrganic(id)
    .then(response => {
      console.log(response);
      dispatch(actions.organicDeleted({ id }));
    })
    .catch(error => {
      console.log(error.response?error.response:error);
      error.clientMessage = "No se pudo eliminar el usuario";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const fetchOrganic = organic => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return dispatch(actions.organicFetched({ organicForEdit: organic }));
};

export const createOrganic = (organicForCreation,queryParams) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  console.log(organicForCreation);
  return requestFromServer
    .createOrganic(organicForCreation)
    .then(response => {
      console.log(response);
      dispatch(fetchOrganics(queryParams));
    })
    .catch(error => {
      console.log(error.response?error.response:error);
      error.clientMessage = "No se pudo crear el usuario";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateOrganic = (organic,queryParams) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateOrganic(organic)
    .then(response => {
      console.log('response', response);
      dispatch(fetchOrganics(queryParams));
    })
    .catch(error => {
      console.log(error.response?error.response:error);
      error.clientMessage = "No se pudo actualizar el usuario";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};