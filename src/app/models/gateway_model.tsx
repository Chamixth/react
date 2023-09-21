export interface Gateway{
  workspaceId?:string
  userId?:string
  gateway?:string
  gatewayType?:string
  gatewayUrl?:string
  webUrl?:string
  authorization?:string
  routes?:APIRoute[]
  config?:APIGatewayConfig
}

export interface APIRoute  {
  Path?:string
  Method?:string
  Auth?:boolean
  Authenticator?:boolean
  Cacheable?:boolean
  RateLimit?:number
  Timeout?:number
  Handler?:string
  Middleware?:string[]
}

export interface APIGatewayConfig{
  MaxConnections?:number
  SSL?:boolean
  CertPath?:string
  KeyPath?:string
}
