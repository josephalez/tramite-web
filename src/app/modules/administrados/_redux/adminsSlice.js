import {createSlice} from "@reduxjs/toolkit";

const initialAdminsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: [],
  docTypes: [],
  adminForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const adminsSlice = createSlice({
  name: "admininstrados",
  initialState: initialAdminsState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    
    adminFetched: (state, action) => {
      state.actionsLoading = false;
      state.adminForEdit = action.payload.adminForEdit;
      state.error = null;
    },
    
    adminsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.actionsLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },

    docTypesFetched: (state, action) => {
      const { docTypes } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.docTypes = docTypes;
    },
    
    adminCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      //state.entities.push(action.payload.admin);
    },
    
    adminUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.ADMI_IN_CODIGO == action.payload.admin.ADMI_IN_CODIGO) {
          return action.payload.admin;
        }
        return entity;
      });
    },
    
    adminDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
  }
});
