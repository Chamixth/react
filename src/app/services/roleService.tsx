import {AxiosResponse} from 'axios'
import {ApplicationModel, Dto, Field} from '../models/application_model'
import cgaasManifest from './microServices/cgaas-manifest'
import {RBAC} from '../models/role_base_access_model'

const createRole = (data: RBAC): Promise<RBAC> => {
  return cgaasManifest
    .post('Create/rbac', data)
    .then((response: AxiosResponse<RBAC>) => response.data)
}

const getAllRoles = (userId: string, workspaceId: string): Promise<RBAC[]> => {
  return cgaasManifest
    .get('GetAll/rbac' + '?workspaceId=' + workspaceId + '&userId=' + userId)
    .then((response: AxiosResponse<RBAC[]>) => response.data)
}

const updateRole = (data: RBAC): Promise<RBAC> => {
  return cgaasManifest
    .put(
      `Update/rbac?workspaceId=${data.workspaceId}&roleId=${data.roleId}&userId=${data.userId}`,
      data
    )
    .then((response: AxiosResponse<RBAC>) => response.data)
}

const getRole = (userId: string, workspaceId: string, roleId:string): Promise<RBAC> => {
  return cgaasManifest
    .get('Get/rbac' + '?workspaceId=' + workspaceId + '&userId=' + userId+'&roleId=' + roleId )
    .then((response: AxiosResponse<RBAC>) => response.data)
}

const deleteRole = (role: RBAC): Promise<any> => {
  return cgaasManifest
    .delete(
      'Delete/rbac?' +
        'workspaceId=' +
        role.workspaceId +
        '&userId=' +
        role.userId +
        '&roleId=' +
        role.roleId
    )
    .then((response: AxiosResponse<any>) => response.data)
}

export {createRole, updateRole, getAllRoles, deleteRole, getRole}
