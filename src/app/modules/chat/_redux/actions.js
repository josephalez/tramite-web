import { callTypes, chatSlice } from "./slice";


const {actions} = chatSlice;

export const fetchUser = (user,selectedName) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return dispatch(actions.selectUser({ user, selectedName }));
};
