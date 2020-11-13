import axios from "axios";
import { AppSettings } from "../../../../app.settings";

export const LOGIN_URL = "users/login";
export const REGISTER_URL = "users";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

export const ME_URL = "users/me";

export function login(username, password) {
  return axios.post(AppSettings.apiUrl+LOGIN_URL, { username, password });
}

export function register(email, fullname, username, password, passwordConfirmation) {
  return axios.post(AppSettings.apiUrl+REGISTER_URL, { email, fullname, username, password, passwordConfirmation });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(AppSettings.apiUrl+ME_URL);
}
