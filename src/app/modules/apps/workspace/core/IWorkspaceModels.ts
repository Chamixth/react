import { toAbsoluteUrl } from "../../../../../_metronic/helpers"
import { WorkspaceModel } from "../../../../models/workspace_model"

export type TAppFramework = 'HTML5' | 'ReactJS' | 'Angular' | 'Vue'

export interface IAppDatabase {
  databaseName: string
  databaseSolution: 'MySQL' | 'Firebase' | 'DynamoDB'
}

export type TAppStorage = 'Basic Server' | 'AWS' | 'Google'

export type StepProps = {
  data: WorkspaceModel
  updateData: (fieldsToUpdate: Partial<WorkspaceModel>) => void
  hasError: boolean
}

export interface IconModel {
  name: string
  avatar?: string
  color?: string
  initials?: string
}

export const techstackIconList: Array<IconModel> = [
  {name: 'Angular', avatar: '/media/db/angular-icon.png', color: '#ffe3e3'},
  {name: 'MongoDB', avatar: '/media/db/mongodb-icon.png', color: '#aae5e0'},
  {name: 'MySQL', avatar: '/media/db/mysql-icon.png', color: '#fff9db'},
  {name: 'Auth0', avatar: '/media/db/auth0-icon.png', color: '#fff4e6'},
  {name: 'React', avatar: '/media/db/react-icon.png', color: '#e7f5ff'},
  {name: 'PostgreSQL', avatar: '/media/db/postgresql-icon.png', color: '#e0f7fa'},
  {name: 'Firebase', avatar: '/media/db/firebase-icon.png', color: '#fff2cd'},
]



export const getImageUrl = (gatewayType: string) => {
  switch (gatewayType) {
    case 'TYK':
      return toAbsoluteUrl('/media/stock/gateways/Tyk.png')
    case 'WSO2':
      return toAbsoluteUrl('/media/stock/gateways/WSO2.png')
    case 'KONG':
      return toAbsoluteUrl('/media/stock/gateways/Kong.png')
    case 'EVOGATE':
      return toAbsoluteUrl('/media/stock/gateways/Evogate.png')
    default:
      return toAbsoluteUrl('/media/db/anyType.png')
  }
}

export const getGatewayBgColor = (gatewayType: string) => {
  switch (gatewayType) {
    case 'TYK':
      return 'bg-light-primary'
    case 'WSO2':
      return 'bg-light-danger'
    case 'KONG':
      return 'bg-light-success'
    case 'EVOGATE':
      return 'bg-light-warning'
    default:
      return 'bg-light-info'
  }
}