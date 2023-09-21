export interface ApplicationModel {
  workspaceId?:string
  appName?:string
  appId?:string
  database?:string
  userId?:string
  isDisabled?:string
  version?:string
  deleted?:string
  created?:string
  lastUpdated?:string
  lastupdatedBy?:string
  databaseUrl?:string
  operation?:string
}

export interface Dao {
  workspaceId?:string
  AppID?:string
  userId?:string
  Dao?:string
  Daoid?:string
  Field?:Field[]
  createCruds?:string
}

 export interface Dto {
  workspaceId?:string
  appId?:string
  userId?:string
  dtoName?:string
  dtoId?:string
  field?:Field[]
  createCruds?:boolean
  appName?:string
}
 export interface Relationship  {
  relationshipId?:string
  workspaceId?:string
  appId?:string
  userId?:string
  baseDto?:string
  secondaryDto?:string
  baseRelationship?:string
  secondaryRelationship?:string
  basepk?:string
  secondarypk?:string
}

export interface Limiter {
  maxRequests?:number
	window?:number
}

export interface GeneratorStruct {
  workspaceId?: string;
  workspaceName?: string;
  userId?: string;
  theme?: string;
  themeColor?: string;
  organization?: string;
  githubAccount?: string;
  dockerhub?: string;
  envServerUrl?: string;
  lastUpdated?: string;
  tag?: string;
  isGateway?: boolean;
  url?:string
}

export interface API {
  organizationId?: string  
  workspaceId?:string
  userId?:string
  appId?:string
  appName?:string
  apiId?:string
  apiName?:string
  crud?:string
  validtors?:Validator[]
  cFunctions?:CFunction[]
  baseDto?:string
  secondaryDto?:string
  relationship?:string
  limiter?:Limiter
  limited?:boolean
  active?:boolean
  blocked?:boolean
  accessRole?:string
  template?:string
}
//export interface CustomFunction  {
//  workspaceId?:string
//  AppID?:string
//  FunctionName?:string
//  BindApi?:string
//  Requirement?:string
//}

export interface CustomFunction{
  appId?: string
  functionId?: string
  functionName?: string
  userId?:string
  imports?: string
  inputs?: string[]
  outputs?: string[]
  code?: string
  pcode?: string
  dtoInputs?: {
    dtoName: string
    dtoId: string
  }
  prompt?: string
  
}

export interface CustomFunctionInput{
  appId?: string
  userId?:string
  functionId?: string
  workspaceId?: string
  Inputs?: {
    dtoName: string
    dtoId: string
  }
  Models?:Dto[]
  Prompt?: string
}
export interface Validator {
  ValidatorId?:string
  ValidatorName?:string
  userId?:string
}
export interface CFunction {
  CFunctionId?:string
  userId?:string
}
export interface Field  {
  name?:string
  userId?:string
  dataType?:string
  inputType?:string
  isEncrypted?:boolean
  isUnique?:boolean
  isRequired?:boolean
}

export interface GenerateApplicationModel {
  appId?:string
  userId?:string
}
