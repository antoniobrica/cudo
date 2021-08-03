export interface IProtocol {
    companyId: string
  projectTypeId: string
  workTypeId: string
  sessionId: string
  protocolId: string
  protocolTitle: string
  protocolDate: string
  protocolStartTime: string
  protocolEndTime: string
  protocolDescription: string
  // createdAt: string
  // createdBy: string
  // updatedAt: string
  // updatedBy: string
  // isDeleted: boolean
  protocolDuration: string
}

export interface IProtocolResults {
    results: IProtocol[];
  }

export interface IProtocols {
    invitations: IProtocol[];
    getProtocolList: IProtocolResults;
  }