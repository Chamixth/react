import { AxiosResponse } from "axios";
import cgaasManifest from "./microServices/cgaas-manifest";
import { Relationship } from "../models/application_model";
import exp from "constants";

const createRelationship = (data:Relationship): Promise<Relationship>=>{
    return cgaasManifest
      .post('Create/relationship',data)
      .then((response:AxiosResponse<Relationship>)=>response.data);
}

const updateRelationship = (data: Relationship): Promise<Relationship>=>{
  console.log(data.appId)
  return cgaasManifest
      .put(`Update/relationship?workspaceId=${data.workspaceId}&relationshipId=${data.relationshipId}`, data)
      .then((response:AxiosResponse<Relationship>)=>response.data);
}

const getAllRelationships = (workspaceId : string, appId :string, userId:string): Promise<Relationship[]>=>{
    return cgaasManifest
      .get('Get/relationship'+'?workspaceId='+workspaceId+'&appId='+appId+'&userId='+userId)
      .then((response:AxiosResponse<Relationship[]>)=>response.data);
  }

const deleteRelationship = (relationship:Relationship): Promise<any>=>{
  return cgaasManifest
    .delete('Delete/relationship?'+"workspaceId="+relationship.workspaceId+"&relationshipId="+relationship.relationshipId+"&userId="+relationship.userId+"&appId="+relationship.appId)
    .then((response:AxiosResponse<any>)=>response.data);
}

export {createRelationship, getAllRelationships, deleteRelationship, updateRelationship}