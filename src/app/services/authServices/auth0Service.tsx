import { AxiosResponse } from "axios";
import cgaasManifest from "../microServices/cgaas-manifest";
import { Auth0Config } from "../../models/auth_model";

const createAuth0 = (data:Auth0Config): Promise<Auth0Config>=>{
    return cgaasManifest
      .post('/Create/auth0config',data)
      .then((response:AxiosResponse<Auth0Config>)=>response.data);
  }

const updateAuth0 = (data: Auth0Config): Promise<Auth0Config>=>{
  return cgaasManifest
      .put(`/Update/auth0config?workspaceId=${data.workspaceId}&auth0Id=${data.auth0Id}`, data)
      .then((response:AxiosResponse<Auth0Config>)=>response.data);
}

const getAuth0ByWorkspaceId = (workspaceId:string, userId:string): Promise<Auth0Config>=>{
return cgaasManifest
    .get(`/Get/auth0config?workspaceId=${workspaceId}&userId=${userId}`)
    .then((response:AxiosResponse<Auth0Config>)=>response.data);
}

const deleteAuth0 = (data:Auth0Config): Promise<any>=>{
  return cgaasManifest
  .delete(`/Delete/auth0config?workspaceId=${data.workspaceId}&auth0Id=${data.auth0Id}`)
    .then((response:AxiosResponse<any>)=>response.data);
}

export {createAuth0, updateAuth0, getAuth0ByWorkspaceId, deleteAuth0}