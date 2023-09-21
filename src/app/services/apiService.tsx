import { AxiosResponse } from "axios";
import { API } from "../models/application_model";
import cgaasManifest from "./microServices/cgaas-manifest";

const createApi = (data:API): Promise<API>=>{
    return cgaasManifest
      .post('Create/api',data)
      .then((response:AxiosResponse<API>)=>response.data);
}

const deleteApi = (data:API): Promise<any>=>{
    return cgaasManifest
    .delete('Delete/api?'+"workspaceId="+data.workspaceId+"&appId="+data.appId+"&apiId="+data.apiId)
      .then((response:AxiosResponse<any>)=>response.data);
}

const updateApi = (data: API): Promise<API>=>{
  return cgaasManifest
      .put(`Update/api?workspaceId=${data.workspaceId}&appId=${data.appId}&apiId=${data.apiId}`, data)
      .then((response:AxiosResponse<API>)=>response.data);
}

const getAllApiByAppId = (userId:string, appId?:string): Promise<API[]>=>{
    return cgaasManifest
      .get('Get/api/byUserId'+'?appId='+appId+'&userId='+userId)
      .then((response:AxiosResponse<API[]>)=>response.data);
  }

  export {createApi,deleteApi, updateApi, getAllApiByAppId}