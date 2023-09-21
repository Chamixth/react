import { AxiosResponse } from "axios";
import { CustomFunction } from "../models/application_model";
import cgaasCbfg from "./microServices/cgaas-cbfg";


const createCustomFunction = (data:CustomFunction): Promise<CustomFunction>=>{
    return cgaasCbfg
      .post('generateFunction',data)
      .then((response:AxiosResponse<CustomFunction>)=>response.data);
}

//const deleteApi = (data:API): Promise<any>=>{
//    return cgaas
//    .delete('Delete/api?'+"workspaceId="+data.workspaceId+"&appId="+data.appId+"&apiId="+data.ApiId)
//      .then((response:AxiosResponse<any>)=>response.data);
//}

// const updateCustomFunction = (data:CustomFunction): Promise<CustomFunction>=>{
//   return cgaasCbfg
//     .post('generateFunction',data)
//     .then((response:AxiosResponse<CustomFunction>)=>response.data);
// }

const getAllCustomFunctionsByAppId = (userId:string, appId?:string, workspaceId?:string ): Promise<CustomFunction[]>=>{
   return cgaasCbfg
     .get('/getAllFunctions/appId'+'?appId='+appId+'&workspaceId='+workspaceId+'&userId='+userId)
     .then((response:AxiosResponse<CustomFunction[]>)=>response.data);
 }

  export {createCustomFunction, getAllCustomFunctionsByAppId}