export interface ISession {
  sessionID: string
  sessionTitle: string
  worktypeID: string
  worktypeTitle: string
  meetingCategoryID: string
  meetingCategoryTitle: string
  invitationID: string
  invitationTitle: string
  protocolID: string
  protocolTitle: string
  updatedAt: string
  createdAt: string
  updatedBy: string
  createdBy: string
  admins: IAdmin
  members: IMembers
}

export interface IAdmin {
  adminID: string
  adminName: string
  image: string
}
export interface IMembers {
  memberID: string
  memberName: string
  image: string
}
export interface ISessions {
  sessions: ISession[];
}



