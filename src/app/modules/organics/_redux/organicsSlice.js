import {createSlice} from "@reduxjs/toolkit";

const initialOrganicsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: [],
  organicForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const organicsSlice = createSlice({
  name: "organics",
  initialState: initialOrganicsState,
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
    
    organicFetched: (state, action) => {
      state.actionsLoading = false;
      state.organicForEdit = action.payload.organicForEdit;
      state.error = null;
    },
    
    organicsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.actionsLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    
    organicCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      //state.entities.push(action.payload.organic);
    },
    
    organicUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.ORGA_IN_CODIGO == action.payload.organic.ORGA_IN_CODIGO) {
          return action.payload.organic;
        }
        return entity;
      });
    },
    
    organicDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
  }
});
