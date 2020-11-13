import * as requestFromServer from "./adminsCrud";
import { adminsSlice, callTypes} from "./adminsSlice";

const {actions} = adminsSlice;

export const fetchAdmins = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findAdmins(queryParams)
    .then(response => {
      console.log(response);
      const { totalCount, entities } = response.data;
      dispatch(actions.adminsFetched({ totalCount, entities }));
      dispatch(fetchDocTypes());
    })
    .catch(error => {
      console.log(error.response?error.response:error);
      error.clientMessage = "No se encontraron administrados";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchDocTypes = () => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findDocTypes()
    .then(response => {
      //console.log(response);
      let{data}= response;
      dispatch(actions.docTypesFetched({ docTypes:data }));
    })
    .catch(error => {
      console.log(error.response?error.response:error);
      error.clientMessage = "No se encontraron los tipos de documento solicitados";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const deleteAdmin = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteAdmin(id)
    .then(response => {
      console.log(response);
      dispatch(actions.adminDeleted({ id }));
    })
    .catch(error => {
      console.log(error.response?error.response:error);
      error.clientMessage = "No se pudo eliminar el administrado";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const fetchAdmin = admin => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return dispatch(actions.adminFetched({ adminForEdit: admin }));
};

export const createAdmin = (adminForCreation,queryParams) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  console.log(adminForCreation);
  return requestFromServer
    .createAdmin(adminForCreation)
    .then(response => {
      console.log(response);
      dispatch(fetchAdmins(queryParams));
    })
    .catch(error => {
      console.log(error.response?error.response:error);
      error.clientMessage = "No se pudo crear el administrado";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateAdmin = (admin,queryParams) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateAdmin(admin)
    .then(response => {
      console.log('response', response);
      //dispatch(actions.adminUpdated({ admin }));
      dispatch(fetchAdmins(queryParams));
    })
    .catch(error => {
      console.log(error.response?error.response:error);
      error.clientMessage = "No se pudo actualizar el administrado";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};