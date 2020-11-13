import axios from "axios";
import { USERS_URL } from "../../../../app.settings";

// CREATE =>  POST: add a new user to the server
export function createUser(user) {
  return axios.post(USERS_URL, user );
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findUsers(queryParams) {
  let query= "";
  for(let param in queryParams){
    let paramValue=queryParams[param];
    if(param==='filter') paramValue= JSON.stringify(paramValue);
    if(query!="") query+=("&"+param+"="+paramValue);
    else query+=(param+"="+paramValue)
  }
  return axios.get(USERS_URL+"?"+query)//, { queryParams }); post
}

// UPDATE => PUT: update the user on the server
export function updateUser(user) {
  return axios.put(`${USERS_URL}/${user.USER_IN_CODIGO}`, user);
}

// DELETE => delete the user from the server
export function deleteUser(userId) {
  return axios.delete(`${USERS_URL}/${userId}`);
}

