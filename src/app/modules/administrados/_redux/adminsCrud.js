import axios from "axios";
import { ADMINS_URL, DOC_TYPES_URL } from "../../../../app.settings";

// CREATE =>  POST: add a new admin to the server
export function createAdmin(admin) {
  return fetch('https://api.ipify.org/?format=json')
  .then(res=>res.json())
  .then(response=>{
    return axios.post(ADMINS_URL+"_insert", {
      ...admin ,
      AUDI_VC_TERMINAL:response.ip
    });
  });
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findAdmins(queryParams) {

  let query= "";
  for(let param in queryParams){
    let paramValue=queryParams[param];
    if(param==='filter') paramValue= JSON.stringify(paramValue);
    if(query!="") query+=("&"+param+"="+paramValue);
    else query+=(param+"="+paramValue)
  }

  return axios.get(ADMINS_URL+"_findall?"+query)
  
}

export function findDocTypes(){
  return axios.get(DOC_TYPES_URL+"?CPM_VC_CLAVE=TIPO_DOC_USER");
}

// UPDATE => PUT: update the admin on the server
export function updateAdmin(admin) {
  return fetch('https://api.ipify.org/?format=json')
  .then(res=>res.json())
  .then(response=>{
    return axios.put(`${ADMINS_URL+'_update'}/${admin.ADMI_IN_CODIGO}`, {
      ...admin,
      AUDI_VC_TERMINAL:response.ip
    });
  });
}

// DELETE => delete the admin from the server
export function deleteAdmin(adminId) {
  return axios.delete(`${ADMINS_URL}/${adminId}`);
}

