export interface IToken {
  accountSASToken: string
}
export interface ICost {
  BKPID: string,
  bkpCostID: string,
  BKPTitle: string,
  description: string,
  itemQuantity: number,
  structureID: string,
  structureName: string,
  itemPrice: number,
  files: [files]

}

export interface files {
  uploadedFileID: string,
  uploadedFileTitle: string
}
export interface ICosts {
  costs: ICost[];
}