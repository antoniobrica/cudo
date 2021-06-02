export interface ICountry {
  countryName: string
  countryCode: string
}

export interface ICountries {
  countries: ICountry[];
}

export interface IUser {
  userID: string
  userName: string
}

export interface ICatagory {
  meetingCatagoryID: string
  meetingCatagoryTitle: string
}

export interface ICatagories {
  MeetingCatagories: ICatagory[];
}

export interface IPotocol {
  protocolTemplateID: string
  protocolTemplateTitle: string
}

export interface IProtocols {
  ProtocoleTemplates: IPotocol[];
}

export interface IInvitation {
  invitationTemplateID: string
  invitationTemplateTitle: string
}

export interface IInvitations {
  invitationTemplates: IInvitation[];
}

export interface IBkp {
  bkpID: string
  bkpTitle: string
}

export interface IFolder {
  folderTitle: string
  folderID: string
}

export interface IFileType {
  fileTypeID: string
  fileTypeTitle: string
}

export interface IFileStructure {
  fileStructureID: string
  fileStructureTitle: string
}

export interface IStructure {
  structureID: string
  referenceID: string
  referenceType: string
  structureName: string
}

export interface IPhase {
  id: string
  phaseTitle: string
}
export interface Iphases {
  Phase: IPhase[];
}
export interface IBkps {
  Bkp: IBkp[];
}
export interface IFolders {
  Folders: IFolder[];
}
export interface IFolderMutation {
  createFolder: IFolder;
}
export interface IFileTypes {
  FileTypes: IFileType[];
}
export interface IFileStructures {
  FileStructure: IFileStructure[];
}
export interface IStructures {
  structureRoots: IStructure[];
}
export interface IUsers {
  userByEmail: IUser[];
}
