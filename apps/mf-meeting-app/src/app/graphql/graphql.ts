import gql from "graphql-tag";

// 'Sftobiz_1234'
export const GET_SESSIONS = gql`query GET_SESSIONS($projectId:String!)
{
  paginatedSession( 
    referenceFilter: { 
      referenceID: $projectId, 
      referenceType: PROJECTTYPE 
    } 
    options: { limit: 20, page: 0 } 
  ) { 
    results { 
      sessionID 
      sessionTitle 
      worktypeTitle 
      meetingCategoryID
      meetingCategoryTitle 
      admins { 
        adminID 
        adminName 
        image
      } 
      members { 
        memberID 
        memberName 
        image        
      } 
    } 
    total 
    page_total 
  } 
  }
`;

export const GET_SESSION_DETAIL = gql`
query SessionByID(
  $sessionID: String!
){
  SessionByID (
    sessionFilter: { 
      sessionID: $sessionID 
      }
  ) {
      sessionID
      sessionTitle
      worktypeID
      worktypeTitle
      meetingCategoryID
      meetingCategoryTitle
      invitationID
      invitationTitle
      protocolID
      protocolTitle
      admins {
        adminID
        adminName
        image
      }
      members {
        memberID
        memberName
        image
      }
      createdBy
      createdAt
      updatedBy
      updatedAt
      isDeleted
  }
}
`

export const ADD_SESSION = gql`
mutation CreateSession(
  $projectId:String!,
  $sessionTitle: String!, 
  $worktypeID: String!,
  $worktypeTitle: String!,
  $meetingCategoryID: String!,
  $meetingCategoryTitle: String!,
  $protocolID: String!,
  $protocolTitle: String!,
  $invitationID: String!,
  $invitationTitle: String!,
  $admins: [PeopleParams!]!,
  $members: [MemberParams!]!
  ){ 
    createSession( 
      referenceFilter: { referenceID: $projectId, referenceType: PROJECTTYPE } 
      sessionDetails: { 
        sessionBasics: { 
          sessionTitle: $sessionTitle 
          worktypeID: $worktypeID
          worktypeTitle: $worktypeTitle 
          meetingCategoryID: $meetingCategoryID
          meetingCategoryTitle: $meetingCategoryTitle
          protocolID: $protocolID
          protocolTitle: $protocolTitle
          invitationID: $invitationID 
          invitationTitle: $invitationTitle
        },
        admins:  $admins, 
        members:$members 
      } 
  
    ){      
      sessionID 
      sessionTitle 
      worktypeTitle 
      meetingCategoryID
      meetingCategoryTitle 
      admins { 
        adminID 
        adminName 
        image
      } 
      members { 
        memberID 
        memberName 
        image        
      }   
    }
}`;

export const UPDATE_SESSION = gql`
mutation UpdateSession(
  $sessionID: String!, 
  $sessionTitle: String!, 
  $worktypeID: String!,
  $worktypeTitle: String!,
  $meetingCategoryID: String!,
  $meetingCategoryTitle: String!,
  $protocolID: String!,
  $protocolTitle: String!,
  $invitationID: String!,
  $invitationTitle: String!,
  $admins: [PeopleParams!]!,
  $members: [MemberParams!]!
  ){
  updateSession(
    sessionUpdateInput: {
      sessionBasics: {
        sessionID: $sessionID
        sessionTitle: $sessionTitle 
        worktypeID: $worktypeID
        worktypeTitle: $worktypeTitle 
        meetingCategoryID: $meetingCategoryID
        meetingCategoryTitle: $meetingCategoryTitle
        protocolID: $protocolID
        protocolTitle: $protocolTitle
        invitationID: $invitationID 
        invitationTitle: $invitationTitle
      }
      admins: $admins
      members: $members
    }
  ) {
      sessionID
      sessionTitle
      worktypeID
      worktypeTitle
      meetingCategoryID
      meetingCategoryTitle
      invitationID
      invitationTitle
      protocolID
      protocolTitle
      admins {
        adminID
        adminName
        image
      }
      members {
        memberID
        memberName
        image
      }
      createdBy
      createdAt
      updatedBy
      updatedAt
      isDeleted
  }
}`;

export const DELETE_SESSION = gql`
mutation DeleteSession($sessionID:String!){
  deleteSession(
    sessionFilter: { sessionID: $sessionID }
  ) {
    sessionID
    sessionTitle
    worktypeID
    worktypeTitle
    meetingCategoryID
    meetingCategoryTitle
    invitationID
    invitationTitle
    protocolID
    protocolTitle
    admins {
      adminID
      adminName
      image
    }
    members {
      memberID
      memberName
      image
    }
    createdBy
    createdAt
    updatedBy
    updatedAt
    isDeleted
  }
}`;




export const GET_INVITATIONS = gql`
query GetMeetingList(
  # $companyId?: String!
  # $projectTypeId?: String!
  # $workTypeId?: String!
  $sessionId: String!
){
  getMeetingList(
    sortFilter: { sortBy: ASC }
    statusFilter: { status: SCHEDULED }
    meetingFilter: {  
      # companyId: $companyId
      # projectTypeId: $projectTypeId
      # workTypeId: $workTypeId
      sessionId: $sessionId
    }
    options: { limit: 10, page: 0 }
  ) {
    results {
      companyId
      projectTypeId
      workTypeId
      sessionId
      meetingId
      meetingTitle
      meetingDate
      meetingStartTime
      meetingEndTime
      inviteGuests
      meetingDescription
      protocolId
      protocolTitle
      members {
        memberID
        memberName
        image
      }
      meetingFiles {
        fileId
        meetingFileId
        meetingFileTitle
      }
      # createdAt
      createdBy
      # updatedAt
      updatedBy
      meetingDuration
      status
    }
    total
    page_total
    # hasNextPage
  }
}`;

export const GET_INVITATION_DETAIL = gql`
query getMeetingById(
  $meetingId: String!
){
  getMeetingById(meetingDetailFilter: { 
   meetingId: $meetingId 
  }) {
    companyId
    projectTypeId
    workTypeId
    sessionId
    meetingId
    meetingTitle
    meetingDate
    meetingStartTime
    meetingEndTime
    inviteGuests
    meetingDescription
    protocolId
    protocolTitle
    members {
      memberID
      memberName
      image
    }
    meetingFiles {
      fileId
      meetingFileId
      meetingFileTitle
    }
    # createdAt
    createdBy
    # updatedAt
    updatedBy
  }
}`;

export const ADD_INVITATION = gql`
mutation CreateMeeting(
  $companyId: String!, 
  $projectTypeId: String!,
  $workTypeId: String!,
  $sessionId: String!,
  $meetingTitle: String!,
  $meetingDate: DateTime!,
  $meetingStartTime: DateTime!,
  $meetingEndTime: DateTime!,
  $inviteGuests: String!,
  $meetingDescription: String!,
  $protocolId: String!,
  $protocolTitle: String!,
  $members: [MemberParams!]!,
  $meetingFiles: [MeetingFilesParams!]!,  
  $meetingDuration: String!,
  $status: String
  ){ 
    createMeeting( 
       meetingDetails: { 
        meetingBasics: { 
          companyId: $companyId               
          projectTypeId: $projectTypeId       
          workTypeId: $workTypeId             
          sessionId: $sessionId               
          meetingTitle: $meetingTitle         
          meetingDate: $meetingDate           
          meetingStartTime: $meetingStartTime 
          meetingEndTime: $meetingEndTime     
          inviteGuests: $inviteGuests         
          meetingDescription: $meetingDescription 
          protocolId: $protocolId             
          protocolTitle: $protocolTitle       
          meetingDuration: $meetingDuration
          status: $status
        },
        members:$members 
        meetingFiles:  $meetingFiles, 
      }  
    ){      
      companyId
      projectTypeId
      workTypeId
      sessionId
      meetingId
      meetingTitle
      meetingDate
      meetingStartTime
      meetingEndTime
      inviteGuests
      protocolId
      protocolTitle
      members{
        memberID
        memberName
        image
      }
      meetingFiles{
        fileId
        meetingFileId
        meetingFileTitle
      }
      # createdAt
      createdBy
      # updatedAt
      updatedBy
      meetingDuration
      status   
    }
}`;

export const UPDATE_INVITATION = gql`
mutation UpdateMeeting(
#   $companyId: String!, 
#   $projectTypeId: String!,
#   $workTypeId: String!,
#   $sessionId: String!,
  $meetingId:String!
  $meetingTitle: String!,
  $meetingDate: DateTime!,
  $meetingStartTime: DateTime!,
  $meetingEndTime: DateTime!,
  $inviteGuests: String!,
  $meetingDescription: String!,
  $protocolId: String!,
  $protocolTitle: String!,
  $members: [MemberParams!]!,
  $meetingFiles: [MeetingFilesParams!]!,  
  $meetingDuration: String!,
  $status: String
){
  updateMeeting(
    meetingUpdateInput: {
      meetingBasics: {
        # companyId: $companyId               
        # projectTypeId: $projectTypeId       
        # workTypeId: $workTypeId              
        # sessionId: $sessionId               
        meetingId: $meetingId
        meetingTitle: $meetingTitle          
        meetingDate: $meetingDate           
        meetingStartTime: $meetingStartTime 
        meetingEndTime: $meetingEndTime      
        inviteGuests: $inviteGuests          
        meetingDescription: $meetingDescription  
        protocolId: $protocolId              
        protocolTitle: $protocolTitle        
        meetingDuration: $meetingDuration
        status: $status
      }
      members: $members 
      meetingFiles: $meetingFiles, 
    }
  ) {
    companyId
    projectTypeId
    workTypeId
    sessionId
    meetingTitle
    meetingDate
    meetingStartTime
    meetingEndTime
    meetingDuration
    meetingDescription
    meetingId
    members {
      memberID
      memberName
      image
    }
    meetingFiles {
      fileId
      meetingFileId
      meetingFileTitle
    }
    createdBy
    createdAt
    updatedBy
    updatedAt
    isDeleted
    status
  }
}`;

export const DELETE_INVITATION = gql`mutation DeleteMeeting(
  $meetingId:String!
  ){
    deleteMeeting(
      meetingDeleteInput: { meetingId: $meetingId }
    ) {
      companyId
      projectTypeId
      workTypeId
      sessionId
      meetingTitle
      meetingDate
      meetingStartTime
      meetingEndTime
      meetingDuration
      meetingDescription
      meetingId
      members {
        memberID
        memberName
        image
      }
      meetingFiles {
        meetingFileId
        meetingFileTitle
      }
      isDeleted
    }
}`;

export const ADD_PROTOCOL = gql`
mutation CreateProtocol(
  $companyId: String!, 
  $projectTypeId: String!,
  $workTypeId: String!,
  $sessionId: String!,
  $protocolTitle: String!,
  $protocolDate: DateTime!,
  $protocolStartTime: DateTime!,
  $protocolEndTime: DateTime!,
  $protocolDescription: String!,
  $protocolFiles: [ProtocolFilesParam!]!,
  $meetings: [MeetingDetailsInput!],  
  $protocolDuration: String!,
  $status: String
  ){ 
    createProtocol( 
       protocolDetails: { 
        protocolBasics: { 
          companyId: $companyId               
          projectTypeId: $projectTypeId       
          workTypeId: $workTypeId             
          sessionId: $sessionId               
          protocolTitle: $protocolTitle         
          protocolDate: $protocolDate           
          protocolStartTime: $protocolStartTime 
          protocolEndTime: $protocolEndTime     
          protocolDescription: $protocolDescription             
          protocolDuration: $protocolDuration
          status: $status
        },
        meetings: $meetings,
        protocolFiles:  $protocolFiles, 
      }  
    ){      
      companyId
      projectTypeId
      workTypeId
      sessionId
      protocolTitle
      protocolDate
      protocolStartTime
      protocolEndTime
      protocolId
      meetings{
        meetingTitle
        meetingId
      }
      protocolFiles{
        fileId
        protocolFileId
        protocolFileTitle
      }
      # createdAt
      createdBy
      # updatedAt
      updatedBy
      protocolDuration
      status   
    }
}`;

export const GET_PROTOCOLS = gql`
query GetProtocolList(
  # $companyId?: String!
  # $projectTypeId?: String!
  # $workTypeId?: String!
  $sessionId: String!
){
  getProtocolList(
    sortFilter: { sortBy: ASC }
    statusFilter: { status: SCHEDULED }
    protocolFilter: {  
      # companyId: $companyId
      # projectTypeId: $projectTypeId
      # workTypeId: $workTypeId
      sessionId: $sessionId
    }
    options: { limit: 100, page: 0 }
  ) {
    results {
      companyId
      projectTypeId
      workTypeId
      sessionId
      protocolId
      protocolTitle
      protocolDate
      protocolStartTime
      protocolEndTime
      protocolDescription
      protocolFiles {
        fileId
        protocolFileId
        protocolFileTitle
      }
      # createdAt
      createdBy
      # updatedAt
      updatedBy
      protocolDuration
      status
    }
    total
    page_total
    # hasNextPage
  }
}`;

export const UPDATE_PROTOCOL = gql`
mutation UpdateProtcol(
  #   $companyId: String!, 
  #   $projectTypeId: String!,
  #   $workTypeId: String!,
  #   $sessionId: String!,
    $protocolId:String!,
    $protocolTitle:String!,
    $protocolStartTime: DateTime!,
    $protocolEndTime: DateTime!,
    $protocolDate: DateTime!,
    $protocolFiles: [ProtocolFilesParam!]!,
    $protocolDuration:String!,
    $status:String,
    $protocolDescription:String!
){
  updateProtocol(
    protocolUpdateInput:{
      protocolBasics:{
        # $companyId: String!
        # $projectTypeId: String!
        # $workTypeId: String!
        # $sessionId: String!
        protocolId:$protocolId
        protocolTitle:$protocolTitle
        protocolDescription:$protocolDescription
        protocolStartTime: $protocolStartTime
        protocolEndTime: $protocolEndTime
        protocolDate: $protocolDate
        protocolDuration:$protocolDuration
        status:$status

      }
      protocolFiles: $protocolFiles
    }
  ){
    protocolTitle
    protocolId
    protocolDate
    protocolDuration
    sessionId
    companyId
    updatedBy
    protocolDescription
    createdBy
    # createdAt
    updatedBy
    updatedAt
    isDeleted
    status
    meetings{
      meetingTitle
    }
    protocolFiles{
      fileId
      protocolFileTitle
    }
  }
}

`