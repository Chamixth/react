export interface RBAC{
    role?:string
    roleId?:string
    userId?:string
    workspaceId?:string
    access?:string[]
}

export interface DtoRBAC{
    dtoRoleId?:string
    dtoId?:string
    dtoName?:String
    roleId?:string
    userId?:string
    workspaceId?:string
    access?:string[]
}