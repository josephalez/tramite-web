import axios from "axios";
import { ORGANICS_URL } from "../../../../app.settings";

// CREATE =>  POST: add a new organic to the server
export function createOrganic(organic) {

  return fetch('https://api.ipify.org/?format=json')
  .then(res=>res.json())
  .then(response=>{
    return axios.post(`${ORGANICS_URL}_insert`, {
      ...organic,
      AUDI_VC_TERMINAL:response.ip
    });
  });

}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findOrganics(queryParams) {
  let query= "";
  for(let param in queryParams){
    let paramValue=queryParams[param];
    if(param==='filter') paramValue= JSON.stringify(paramValue);
    if(query!="") query+=("&"+param+"="+paramValue);
    else query+=(param+"="+paramValue)
  }
  return axios.get(`${ORGANICS_URL}_findall?${query}`)//, { queryParams }); post
}

// UPDATE => PUT: update the organic on the server
export function updateOrganic(organic) {

  return fetch('https://api.ipify.org/?format=json')
  .then(res=>res.json())
  .then(response=>{
    return axios.put(`${ORGANICS_URL}_update/${organic.ORGA_IN_CODIGO}`, {
      ...organic,
      AUDI_VC_TERMINAL:response.ip
    });
  });

}

// DELETE => delete the organic from the server
export function deleteOrganic(organicId) {
  return axios.delete(`${ORGANICS_URL}/${organicId}`);
}

