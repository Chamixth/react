import { AxiosResponse } from "axios";
import { ApplicationModel, Dto, Field } from "../models/application_model";
import cgaasManifest from "./microServices/cgaas-manifest";

  
const createDto = (data:Dto): Promise<Dto>=>{
    return cgaasManifest
      .post('Create/dto',data)
      .then((response:AxiosResponse<Dto>)=>response.data);
}

const updateDto = (data: Dto): Promise<Dto>=>{
  return cgaasManifest
      .put(`Update/dto?workspaceId=${data.workspaceId}&appId=${data.appId}&dtoId=${data.dtoId}`, data)
      .then((response:AxiosResponse<Dto>)=>response.data);
}

const getAllDtos = (data?:ApplicationModel): Promise<Dto[]>=>{
    return cgaasManifest
      .get('Get/Dto/userId'+'?workspaceId='+data?.workspaceId+'&appId='+data?.appId+'&userId='+data?.userId)
      .then((response:AxiosResponse<Dto[]>)=>response.data);
  }

const getAllDtosByWorkspaceId = (workspaceId: string, userId: string): Promise<Dto[]>=>{
    return cgaasManifest
      .get('Get/dto/byWorkspaceId'+'?workspaceId='+workspaceId+'&userId='+userId)
      .then((response:AxiosResponse<Dto[]>)=>response.data);
  }

  const deleteDto = (dto:Dto): Promise<any>=>{
    return cgaasManifest
      .delete('Delete/dto?'+"workspaceId="+dto.workspaceId+"&appId="+dto.appId+"&dtoId="+dto.dtoId+"&userId="+dto.userId)
      .then((response:AxiosResponse<any>)=>response.data);
  }

const updateDtoField = (data?:Field[], workspaceId?:string, appId?:string, dtoId?:string): Promise<Field[]>=>{
  return cgaasManifest
    .put('/Update/dtoFields'+'?workspaceId='+workspaceId+'&appId='+appId+'&dtoId='+dtoId,data)
    .then((response:AxiosResponse<Field[]>)=>response.data);
}

export {createDto,updateDto, getAllDtos, getAllDtosByWorkspaceId, updateDtoField, deleteDto}