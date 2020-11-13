import {createSlice} from "@reduxjs/toolkit";

const initialUsersState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: [],
  userForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const usersSlice = createSlice({
  name: "users",
  initialState: initialUsersState,
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
    
    userFetched: (state, action) => {
      state.actionsLoading = false;
      state.userForEdit = action.payload.userForEdit;
      state.error = null;
    },
    
    usersFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    
    userCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      //state.entities.push(action.payload.user);
    },
    
    userUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.USER_IN_CODIGO == action.payload.user.USER_IN_CODIGO) {
          return action.payload.user;
        }
        return entity;
      });
    },
    
    userDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
  }
});
