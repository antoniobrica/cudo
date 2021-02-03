export interface ITodo {
    id?: string;
    title: string;
    description: string;
  }
  export interface IProject {
    projectId: String;
    email: String;
    age: Number;
    isSubscribed: Boolean
    }
  export interface ITodos {
    getTodos: ITodo[];
  }
  
  export interface Projects {
      getProjects: IProject[];
  }

  export interface ProjectMutation {
      addProject: IProject;
  }
  export type ITodoMutation = {
    addTodo: ITodo;
  };