import { AxiosResponse } from "axios";
import { API } from "../models/application_model";
import cgaasManifest from "./microServices/cgaas-manifest";
import { Gateway } from "../models/gateway_model";
import gatewayManager from "./microServices/gateway-manager";


const createGateway = (data:Gateway): Promise<Gateway>=>{
  return cgaasManifest
    .post('/Create/gateway',data)
    .then((response:AxiosResponse<Gateway>)=>response.data);
}
const registerApis = (workspaceId:any): Promise<any>=>{
  return gatewayManager
    .get('Register/apis'+'?workspaceId='+workspaceId)
    .then((response:AxiosResponse<any>)=>response.data);
}

//const deleteApi = (data:API): Promise<any>=>{
//    return cgaasManifest
//    .delete('Delete/api?'+"workspaceId="+data.workspaceId+"&appId="+data.appId+"&apiId="+data.ApiId)
//      .then((response:AxiosResponse<any>)=>response.data);
//}

const updateGateway = (data: Gateway): Promise<Gateway>=>{
  return cgaasManifest
      .put(`Update/gateway?workspaceId=${data.workspaceId}`, data)
      .then((response:AxiosResponse<Gateway>)=>response.data);
}

//const getAllApiByAppId = (appId?:string): Promise<API[]>=>{
//    return cgaasManifest
//      .get('Get/api/byAppId'+'?appId='+appId)
//      .then((response:AxiosResponse<API[]>)=>response.data);
//  }

  const getGatewayByWorkspaceId = (workspaceId:string, userId:string): Promise<Gateway>=>{
    return cgaasManifest
      .get('Get/gateway/userId'+'?workspaceId='+workspaceId+'&userId='+userId)
      .then((response:AxiosResponse<Gateway>)=>response.data);
  }

  export {getGatewayByWorkspaceId,createGateway,updateGateway,registerApis}