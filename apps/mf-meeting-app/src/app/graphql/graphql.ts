import gql from "graphql-tag";
export const GET_SESSIONS = gql`
{
  paginatedSession( 
    referenceFilter: { referenceID: "Sftobiz_1234", referenceType: PROJECTTYPE } 
    options: { limit: 10, page: 0 } 
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
      sessionID: $sessionID # "06963320-de0d-11eb-9098-778d331f71cd" 
      }
  ) {
    sessionID
    sessionTitle
    worktypeID
    worktypeTitle
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
}
`

export const ADD_SESSION = gql`
mutation CreateSession(
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
      referenceFilter: { referenceID: "Sftobiz_1234", referenceType: PROJECTTYPE } 
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
mutation {
  updateSession(
    sessionUpdateInput: {
      sessionBasics: {
        sessionID: "06963320-de0d-11eb-9098-778d331f71cd"
        sessionTitle: "Test session update"
        # worktypeID: "96b3b610-b6c3-11eb-a720-7feeb9ce9ad0"
        # worktypeTitle: "WorkType8"
        # meetingCategoryID: "eeb1b5a0-b6e2-11eb-a9bc-d140afe4ba5e"
        # meetingCategoryTitle: "Test4"
        # invitationID: "25f5dab0-aca6-11eb-afc2-ed1fc0cfaa43"
        # invitationTitle: "Invitation One"
        # protocolID: "a0651e90-d4b6-11eb-8f15-fb86beaf9d47"
        # protocolTitle: "Protocol A"
      }
      admins: [
        {
          adminID: "ashutosh.mishra@softobiz.com"
          adminName: "Ashutosh Mishra12"
          image: "image12.com"
        }
        {
          adminID: "vipin11july1995@gmail.com"
          adminName: "Vipin Kumar"
          image: "image123.com"
        }
      ]
      members: [
        {
          memberID: "vipin11july1995@gmail.com"
          memberName: "Vipin Kumar"
          image: "image123.com"
        }
        {
          memberID: "Mukut.Kandar@softobiz.com"
          memberName: "Mukut Kandar"
          image: "image of SK"
        }
      ]
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
mutation {
  deleteSession(
    sessionFilter: { sessionID: "35177970-de21-11eb-8f91-c79e422f8e29" }
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
      # companyId: "company_1"
      # projectTypeId: "projectType_1"
      # workTypeId: "workType_1"
      # sessionId: "06963320-de0d-11eb-9098-778d331f71cd"

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
// "7bf4bf20-e39d-11eb-b6f1-b9564249267a" 
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
          companyId: $companyId               # "Sftobiz_123"
          projectTypeId: $projectTypeId       # "88807ca0-b6e5-11eb-a720-7feeb9ce9ad0"
          workTypeId: $workTypeId             # "96b3b610-b6c3-11eb-a720-7feeb9ce9ad0"
          sessionId: $sessionId               # "session_1"
          meetingTitle: $meetingTitle         # "Test meeting another"
          meetingDate: $meetingDate           # "2021-07-14"
          meetingStartTime: $meetingStartTime # "2021-07-12 10:00:00"
          meetingEndTime: $meetingEndTime     # "2021-07-12 10:30:00"
          inviteGuests: $inviteGuests         # "testa@mail.com,testc@mail.com"
          meetingDescription: $meetingDescription # "test meeting description another"
          protocolId: $protocolId             #"a0651e90-d4b6-11eb-8f15-fb86beaf9d47"
          protocolTitle: $protocolTitle       # "Test Protocol Title another"
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

export const DELETE_INVITATION = gql`mutation {
  deleteMeeting(
    meetingDeleteInput: { meetingId: "7bf4bf20-e39d-11eb-b6f1-b9564249267a" }
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