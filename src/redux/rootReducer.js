import {all} from "redux-saga/effects";
import {combineReducers} from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import { adminsSlice } from "../app/modules/administrados/_redux/adminsSlice";
import { usersSlice } from "../app/modules/users/_redux/usersSlice";
import { organicsSlice } from "../app/modules/organics/_redux/organicsSlice";
import { chatSlice } from "../app/modules/chat/_redux/slice";
//import {customersSlice} from "../app/modules/ECommerce/_redux/customers/customersSlice";
//import {productsSlice} from "../app/modules/ECommerce/_redux/products/productsSlice";
//import {remarksSlice} from "../app/modules/ECommerce/_redux/remarks/remarksSlice";
//import {specificationsSlice} from "../app/modules/ECommerce/_redux/specifications/specificationsSlice";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  admins: adminsSlice.reducer,
  users: usersSlice.reducer,
  organics: organicsSlice.reducer,
  chat: chatSlice.reducer,
  //products: productsSlice.reducer,
  //remarks: remarksSlice.reducer,
  //specifications: specificationsSlice.reducer
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
