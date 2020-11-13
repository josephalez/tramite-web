import {createSlice} from "@reduxjs/toolkit";

const initialChatsState = {
  messages:[],
  users: [],
  keyword: '',
  selectedName:"",
  selectedUser:null,
  error: null,
  listLoading: false,
  actionsLoading: false,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const chatSlice = createSlice({
  name: "chat",
  initialState: initialChatsState,
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
    
    messagesFetched: (state, action) => {
      const { messages } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.messages = messages;
    },

    usersFetched: (state, action) => {
      const { users } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.users = users;
    },
    
    newMessage: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.messages.push(action.payload.message);
    },

    selectUser: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.selectedUser = action.payload.user;
      state.selectedName = action.payload.selectedName;
    },

    keywordFetched: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.keyword = action.payload.keyword;
    }
    
  },
});
