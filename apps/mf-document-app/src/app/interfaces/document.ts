export interface IToken {
  accountSASToken: string
}
export interface IFile {
  isFolder: boolean
  projectFileID: string
  BKPID: string
  BKPIDTitle: string
  folderName: string
  phaseID: string
  phaseName: string
  fileTypeID: string
  fileTypeName: string
  structureID: string
  structureTitle: string
  updatedAt: string
  createdAt: string
  updatedBy: string
  createdBy: string
  isEveryOneAllowed: Boolean
  files: [IFileParam]
  people: [IPeople]
}
export interface IFileParam {
  fileURL: string
  fileTitle: string
  fileType: string
  fileVersion: string
}
export interface IPeople {
  userID: string
  userName: string
}
export interface IPeoples {
  people:IPeople[]
}
export interface IFiles {
  File: IFile[];
}

export interface FileMutation {
  createFile: IFile;
}