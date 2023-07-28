export interface ITodo {
  id?: string;
  title: string;
  description: string;
}
export interface ITaskUpdate {
  taskID?: string;
  status: string;
}
export interface IPeople {
  userID: string,
  userName: string,
  imageUrl: string
}
export interface IPeoples {
  peoples: IPeoples[];
}
export interface ITask {
  taskID: string
  sequenceNumber: number
  taskTitle: string
  startDate: string
  endDate: string
  estimatedDays: string
  sendNotification: boolean
  saveTaskAsTemplate: string
  BKPID: string
  phaseID: string
  BKPTitle: string
  phaseName: string
  status: string
  description: string
  updatedAt: string
  createdAt: string
  updatedBy: string
  createdBy: string
  fileID: string
  fileName: string
  taskTypeID: string
  taskType: string
  workTypeID: string
  workTypeName: string
  subtasks: ISubTask[]
  // total: number
  // next: string
  // previous: string
  // page_total: string
  // hasNextPage: boolean
}
export interface ITodos {
  getTodos: ITodo[];
}

export interface ITaskResults {
  results: ITask[];
}

export interface ITasks {
  tasks: ITaskResults;
}

export interface TaskMutation {
  addTask: ITask;
}
export interface TaskUpdateMutation {
  addTask: ITaskUpdate;
}


export interface ISubTask {
  subtaskID: string
  subtaskTitle: string
  status: string
  isDeleted: boolean
}
export interface ISubTaskUpdate {
  subtaskID?: string;
  status: string;
}
export interface SubTaskUpdateMutation {
  updateSubTask: ISubTaskUpdate;
}


export interface IUpdateTask {
  updateTask: ITask[];
}