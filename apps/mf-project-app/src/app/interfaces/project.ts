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
    zip?: Number
    country?: string
    }
  export interface ITodos {
    getTodos: ITodo[];
  }
  
  export interface IProjects {
      getProjects: IProject[];
  }

  export interface ProjectMutation {
      addProject: IProject;
  }
  export type ITodoMutation = {
    addTodo: ITodo;
  };