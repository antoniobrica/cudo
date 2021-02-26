export interface ITodo {
    id?: string;
    title: string;
    description: string;
  }
  export interface IProject {
    projectId?: string;
    projectName?: string;
    projectNum?: number;
    client?: string;
    buildingType?: string
    printingCom?: string
    workType?: string
    estCost?: number
    adressLine1?: string
    adressLine2?: string
    city?: string
    state?: string
    zip?: string
    country?: string
    description?: string
    }

    export interface IWorkType {
      workTypeID?: string
      name?: string
      createdAt?: string
      updatedAt?: string
    }
    export interface ICompany {
      companyID?: string
      companyName?: string
      companyType?: string
      createdAt?: string
      updatedAt?: string
    }
    export interface IBuildingType {
      buildingTypeID: string
      name: string
      createdAt: string
      updatedAt: string
    }

  export interface ITodos {
    getTodos: ITodo[];
  }
  
  export interface IProjects {
      projects: IProject[];
  }

  export interface IWorkTypes {
    workTypes: IWorkType[];
}

export interface IBuildingTypes {
  buildingTypes: IBuildingType[];
}

  export interface ICompanies {
    company: ICompany[];
   }

  export interface ProjectMutation {
      addProject: IProject;
  }
  export type ITodoMutation = {
    addTodo: ITodo;
  };