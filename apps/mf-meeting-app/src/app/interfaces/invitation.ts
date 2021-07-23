export interface IInvitation {
  companyId: string
  projectTypeId: string
  workTypeId: string
  sessionId: string
  meetingId: string
  meetingTitle: string
  meetingDate: string
  meetingStartTime: string
  meetingEndTime: string
  inviteGuests: string
  meetingDescription: string
  protocolId: string
  protocolTitle: string
  members: IMembers
  meetingFiles: IMeetingFiles
  // createdAt: string
  // createdBy: string
  // updatedAt: string
  // updatedBy: string
  // isDeleted: boolean
  meetingDuration: string
  status: string
}

export interface IMembers {
  memberID: string
  memberName: string
  image: string
}

export interface IMeetingFiles {
  fileId: string
  meetingFileId: string
  meetingFileTitle: string
}

export interface IInvitations {
  invitations: IInvitation[];
  getMeetingList: IInvitationResults;
}

export interface IInvitationResults {
  results: IInvitation[];
}


export interface IInvitationMutation {
  addInvitation: IInvitation;
}

export interface IGetMeetingById {
  getMeetingById:IInvitation
}

