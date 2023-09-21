import {AxiosResponse} from 'axios'
import {GeneratorStruct} from '../models/application_model'
import cgaasFrontEndGen from './microServices/cgaas-frontend-gen'

const createFrontEnd = (data: GeneratorStruct): Promise<any> => {
  return cgaasFrontEndGen
    .post('Create/uiapplication', data)
    .then((response: AxiosResponse<any>) => response.data)
}

const getFrontendByWorkspaceId = (workspaceId: string, userId: string): Promise<GeneratorStruct> => {
  return cgaasFrontEndGen
    .get('Get/UIapplication/userId' + '?workspaceId=' + workspaceId + '&userId=' + userId)
    .then((response: AxiosResponse<GeneratorStruct>) => response.data)
}

const generateFrontEnd = (data: GeneratorStruct): Promise<any> => {
  return cgaasFrontEndGen
    .post('Generate/UIapplication', data)
    .then((response: AxiosResponse<any>) => response.data)
}

const updateFrontEnd = (data: GeneratorStruct): Promise<GeneratorStruct> => {
  return cgaasFrontEndGen
    .put(`Update/UIapplication?workspaceId=${data.workspaceId}`, data)
    .then((response: AxiosResponse<GeneratorStruct>) => response.data)
}

const uploadImage = (data: FormData): Promise<any> => {

  return cgaasFrontEndGen
    .post(`/imageUploader`, data,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
  })
    .then((response: AxiosResponse<any>) => response.data);
};

export {createFrontEnd, getFrontendByWorkspaceId, updateFrontEnd, generateFrontEnd, uploadImage}
