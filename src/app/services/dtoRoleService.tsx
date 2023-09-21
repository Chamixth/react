import {AxiosResponse} from 'axios'
import {ApplicationModel, Dto, Field} from '../models/application_model'
import cgaasManifest from './microServices/cgaas-manifest'
import { DtoRBAC } from '../models/role_base_access_model'

const createDtoRole = (data: DtoRBAC): Promise<DtoRBAC> => {
  return cgaasManifest
    .post('Create/dtoRbac', data)
    .then((response: AxiosResponse<DtoRBAC>) => response.data)
}

const updateDtoRole = (data: DtoRBAC): Promise<DtoRBAC> => {
  return cgaasManifest
    .put(
      `Update/dtoRbac?workspaceId=${data.workspaceId}&roleId=${data.roleId}&userId=${data.userId}&dtoRoleId=${data.dtoRoleId}`,
      data
    )
    .then((response: AxiosResponse<DtoRBAC>) => response.data)
}

const getAllDtoRoles = (userId: string, workspaceId: string, roleId:string): Promise<DtoRBAC[]> => {
  return cgaasManifest
    .get('GetAll/dtoRbac' + '?workspaceId=' + workspaceId + '&userId=' + userId + '&roleId=' + roleId)
    .then((response: AxiosResponse<DtoRBAC[]>) => response.data)
}

const deleteDtoRole = (role: DtoRBAC): Promise<any> => {
  return cgaasManifest
    .delete(
      'Delete/dtoRbac?' +
        'workspaceId=' +
        role.workspaceId +
        '&userId=' +
        role.userId +
        '&roleId=' +
        role.roleId +
        '&dtoRbacId' +
        role.dtoRoleId
    )
    .then((response: AxiosResponse<any>) => response.data)
}

export {createDtoRole, updateDtoRole, getAllDtoRoles, deleteDtoRole}
