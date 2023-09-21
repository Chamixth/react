import { AxiosResponse } from "axios";
import { ApplicationModel, GenerateApplicationModel } from "../models/application_model";
import cgaasManifest from "./microServices/cgaas-manifest";
import cgaas from "./microServices/cgaas";


  
const createApplication = (data:ApplicationModel): Promise<ApplicationModel>=>{
    return cgaasManifest
      .post('Create/application',data)
      .then((response:AxiosResponse<ApplicationModel>)=>response.data);
}

const updateApplication = (data: ApplicationModel): Promise<ApplicationModel>=>{
  console.log(data.appId)
  return cgaasManifest
      .put(`Update/application?workspaceId=${data.workspaceId}&appId=${data.appId}`, data)
      .then((response:AxiosResponse<ApplicationModel>)=>response.data);
}
  
const deleteApplication = (application:ApplicationModel): Promise<any>=>{
  return cgaasManifest
    .delete('Delete/application?'+"workspaceId="+application.workspaceId+"&appId="+application.appId+"&userId="+application.userId)
    .then((response:AxiosResponse<any>)=>response.data);
}

const getAllApplicationsByWorkspaceId = (workspaceId:string, userId:string): Promise<ApplicationModel[]>=>{
  return cgaasManifest
    .get('GetAll/applications/userId'+'?workspaceId='+workspaceId+'&userId='+userId)
    .then((response:AxiosResponse<ApplicationModel[]>)=>response.data);
}

const getApplicationByWorkspaceIdApplicationId = (workspaceId:string,appId:string): Promise<ApplicationModel>=>{
  return cgaasManifest
    .get('Get/application/ByWorkspaceIdAppId'+'?workspaceId='+workspaceId+'&appId='+appId)
    .then((response:AxiosResponse<any>)=>response.data);
}

const generateApplication = (data:GenerateApplicationModel): Promise<ApplicationModel>=>{
  return cgaas
    .post('Generate/application',data)
    .then((response:AxiosResponse<ApplicationModel>)=>response.data);
}

export {createApplication, getAllApplicationsByWorkspaceId, deleteApplication, updateApplication,getApplicationByWorkspaceIdApplicationId,generateApplication}