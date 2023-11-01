
export interface IServiceCard{
  value: number | string,
  sub?: number | string,
  subTitle?: number | string,
  title: string,
  color:string ,
  classname?: number | string,
  show?:boolean
  isString?:boolean,
  path?:string
}

export interface IGovernaceStructure {
  structure: string,
  functionality: string,
  no_of_session: number,
}
export interface IGovernaceStructure2 {
  structure: string,
  actual: number,
  percentage: number,
}

export interface IBHCPFSystem {
  service_type: string,
  q1: number,
  q2: number
}
export interface IStates {
  label: string,
  id: number,
}
