import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest, takeEvery } from "redux-saga/effects";
import { getUserByToken } from "./authCrud";

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API",
  UserFailed: "[Failed User] Auth API",
};

const initialAuthState = {
  user: undefined,
  authToken: undefined
};

export const reducer = persistReducer(
  { storage, key: "v709-demo1-auth", whitelist: ["user", "authToken"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.Login: {
        const { authToken , user } = action.payload;

        return { authToken , user };
      }

      case actionTypes.Register: {
        const { authToken } = action.payload;

        console.log('reg token',authToken);

        return { authToken , user: undefined };
      }

      case actionTypes.Logout: {
        // TODO: Change this code. Actions in reducer aren't allowed.
        return initialAuthState;
      }

      case actionTypes.UserLoaded: {
        const { user } = action.payload;

        console.log('response', user);

        return { ...state , user };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  login: (authToken , user) => ({ type: actionTypes.Login, payload: { authToken , user } }),
  register: authToken => ({
    type: actionTypes.Register,
    payload: { authToken }
  }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: user => ({ type: actionTypes.UserRequested, payload: { user } }),
  fulfillUser: user => ({ type: actionTypes.UserLoaded, payload: { user } }),
  userFail: ()=> ({type:actionTypes.UserFailed, payload:{}}),
};

export function* saga() {
  //yield takeLatest(actionTypes.Login, function* loginSaga() {
  //  //yield put(actions.requestUser());
  //});

  yield takeEvery(actionTypes.Register, function* registerSaga() {

    console.log('retrieving user');
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.UserRequested, function* userRequested() {

    try {
    
      console.log('retrieving user');

      const { data: user } = yield getUserByToken();

      console.log('retrieved user', user);

      yield put(actions.fulfillUser(user));
      
    } catch (err) {

      console.log('error retrieving')
      yield put(actions.userFail());

    }
  });
}
