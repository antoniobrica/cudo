export interface ICompanyWorkType {
  workTypeID: string
  name: string
}

export interface ICompanyWorkTypes {
  workTypes: ICompanyWorkType[];
}

export interface IProjectWorkType {
  projectWorkTypeID: string
  workID: string
  workTypeName: string
  estimatedCost: number
}

export interface IProjectWorkTypes {
  ProjectWorkTypes: IProjectWorkType[];
}