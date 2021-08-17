export interface IToken {
  accountSASToken: string
}
export interface IFile {
  isFolder: boolean
  uploadedFileID: string
  directory: string
  parentUploadedFileID: string
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
  isEveryOneAllowed: boolean
  fileURL: string
  fileTitle: string
  fileType: string
  fileVersion: number
  people: [IPeople]
  children: [IFileParam]
}
export interface IFileParam {
  parentUploadedFileID: string,
  fileURL: string,
  fileTitle: string,
  fileType: string,
  fileTypeID: string,
  fileVersion: number,
  fileTypeName: string,
  isEveryOneAllowed: boolean
  uploadedFileID: string,
  BKPID: string,
  BKPIDTitle: string,
  phaseID: string,
  phaseName: string
  structureID: string
  directory: string
  structureTitle: string
  versionCount: number
}

export interface IPeople {
  userID: string
  userName: string
}
export interface IPeoples {
  people: IPeople[]
}
export interface IFiles {
  uploadedFiles: IFile[];
}

export interface FileMutation {
  createFile: IFile;
}

export interface IFileVersion {
  uploadedFileID: string
  parentUploadedFileID: string
  directory: string
  structureID: string
  structureTitle: string
  BKPID: string
  BKPIDTitle: string
  phaseID: string
  phaseName: string
  generateFileName: string
  fileTypeID: string
  fileTypeName: string
  isEveryOneAllowed: boolean
  fileURL: string
  fileTitle: string
  fileType: string
  fileVersion: number
  updatedAt: string
  createdAt: string
  updatedBy: string
  createdBy: string
  referenceID: string
  referenceTitle: string
  referenceType: string
  people: [IPeople]
  children: [IFileParam]
}
