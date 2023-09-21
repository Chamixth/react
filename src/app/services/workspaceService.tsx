import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../_metronic/helpers'
import { WorkspaceModel } from '../models/workspace_model';
import cgaasManifest from './microServices/cgaas-manifest';
import { API,  ApplicationModel } from "../models/application_model";
import { compose } from "redux";
import { date } from "yup";
import { OrganizationModel } from "../models/organization_model";
import { UserModel } from "../models/user_model";


const getAllWorkspacesByUserId = (userId:string): Promise<WorkspaceModel[]> => {
  return cgaasManifest
    .get(`GetAll/workspace/userId?userId=${userId}`)
    .then((response: AxiosResponse<WorkspaceModel[]>) => response.data);
};
const createWorkspace = (data:WorkspaceModel): Promise<WorkspaceModel> => {
  return cgaasManifest
  .post('Create/workspace', data)
  .then((response: AxiosResponse<WorkspaceModel>) => response.data);
};
const updateWorkspace = (data:WorkspaceModel): Promise<WorkspaceModel> => {
  return cgaasManifest
  .put(`Update/workspace/workspaceId?workspaceId=${data.workspaceId}`, data)
  .then((response: AxiosResponse<WorkspaceModel>) => response.data);
};
const deleteWorkspace = (workspace:WorkspaceModel): Promise<any>=>{
  return cgaasManifest
    .delete(`Delete/workspace?workspaceId=${workspace.workspaceId}&userId=${workspace.userId}`)
    .then((response:AxiosResponse<any>)=>response.data);
}
const createApplication = (data:ApplicationModel): Promise<ApplicationModel>=>{
  return cgaasManifest
    .post('/application',data)
    .then((response:AxiosResponse<ApplicationModel>)=>response.data);
}

const createOrganization = (data:OrganizationModel): Promise<OrganizationModel>=>{
  return cgaasManifest
    .post('/organization',data)
    .then((response:AxiosResponse<OrganizationModel>)=>response.data);
}

const createUser = (data:UserModel):Promise<UserModel>=>{
  return cgaasManifest
    .post('/user')
    .then((response:AxiosResponse<UserModel>)=>response.data);
}


const addApiToApplication = (data: API): Promise<API> => {
  return cgaasManifest
    .post('/application/http/:application', data)
    .then((response: AxiosResponse<API>) => response.data);
};

//const createUser = (user: User): Promise<User | undefined> => {
//  return axios
//    .put(USER_URL, user)
//    .then((response: AxiosResponse<Response<User>>) => response.data)
//    .then((response: Response<User>) => response.data)
//}

//const updateUser = (user: User): Promise<User | undefined> => {
//  return axios
//    .post(`${USER_URL}/${user.id}`, user)
//    .then((response: AxiosResponse<Response<User>>) => response.data)
//    .then((response: Response<User>) => response.data)
//}

//const deleteUser = (userId: ID): Promise<void> => {
//  return axios.delete(`${USER_URL}/${userId}`).then(() => {})
//}

//const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
//  const requests = userIds.map((id) => axios.delete(`${USER_URL}/${id}`))
//  return axios.all(requests).then(() => {})
//}

export {getAllWorkspacesByUserId,createWorkspace,updateWorkspace,deleteWorkspace}
