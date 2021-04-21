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
