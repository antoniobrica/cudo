export interface IMileStoneModel {
  milestoneID: string,
  milestoneTitle: string,

  dueDate: string,
  description: string,
  phaseID: string,
  phaseName: string,
  worktypeID: string,
  worktypeName: string,
  status: string,
  updatedAt: string
  createdAt: string

  updatedBy: string,
  createdBy: string,
  files: [TaskFileModel]
}
export interface TaskFileModel {
  fileID: string
  fileName: string
  fileUrl: string
}

export interface IMileStones {
  MileStones: IMileStoneModel[];
}

export interface MilestoneMutation {
  createMileStone: IMileStoneModel;
}


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
  taskID: string
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

