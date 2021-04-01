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
export interface IBkp {
  bkpID: string
  bkpTitle: string
}

export interface IFileType {
  fileTypeID: string
  fileTypeTitle: string
}

export interface IPhase{
  id: string
  phaseTitle: string
}
export interface Iphases {
  Phase: IPhase[];
}
export interface IBkps {
  Bkp: IBkp[];
}
export interface IFileTypes {
  FileTypes: IFileType[];
}
export interface IUsers {
  users: IUser[];
}
