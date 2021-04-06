export interface ITodo {
    id?: string;
    title: string;
    description: string;
  }
  export interface ITaskUpdate {
    taskID?: string;
    status: string;
   }
  export interface ITask {
    taskTitle: string
    startDate: string
    endDate: string
    estimatedDays: string
    sendNotification: string
    saveTaskAsTemplate: string
    BKPID: string
    phasesID: string
    status: string
    updatedAt: string
    createdAt: string
    updatedBy: string
    createdBy: string 
  }
  export interface ITodos {
    getTodos: ITodo[];
  }
  
  export interface ITasks {
    tasks: ITask[];
  }

  export interface TaskMutation {
      addTask: ITask;
  }
  export interface TaskUpdateMutation {
    addTask: ITaskUpdate;
}

 