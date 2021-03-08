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
       
      export interface IBkps {
        Bkp: IBkp[];
      }
    export interface IUsers {
      users: IUser[];
    }
  