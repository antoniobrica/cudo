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



export const UPDATE_TASK = gql`
mutation UpdateTask(
  $taskID: String!,    
  $status: TASKSTATUS!,
  $taskTitle: String!,
  $startDate: DateTime!,
  $endDate: DateTime!,
  $estimatedDays: String!,
  $sendNotification: Boolean!,
  $BKPID: String!,
  $BKPTitle: String!,
  $saveTaskAsTemplate: String!,
  $phaseID: String!
  $phaseName: String!
  $description: String!
  $files: [TaskFileParams!]!
  ){ 
    updateTask(
        taskDetailsUpdate: {
        taskBasics:{
          taskID: $taskID,
          status: $status,
          taskTitle: $taskTitle,
          startDate: $startDate, 
          endDate: $endDate,
          estimatedDays: $estimatedDays,
          sendNotification: $sendNotification,
          BKPID: $BKPID,
          BKPTitle: $BKPTitle,
          saveTaskAsTemplate: $saveTaskAsTemplate,
          phaseID: $phaseID,
          phaseName: $phaseName,
          description: $description
        }
      assignees:[{userID:"2",userName:"Ashutosh"},{userID:"3",userName:"Ashutosh"}]
      followers:[{userID:"1",userName:"Ashutosh"}]
      files: $files
      subtasks: []

   }){
    taskID
    status    
  }
}`;
export const DELETE_TASK = gql`
mutation DeleteTask(
  $taskID: String!,    
  ){ 
    deleteTask(taskDeleteInput:
      {
        taskID:$taskID
      }
  ){
      taskID
    }
}`;
//dummy data

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
}
`;


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
