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
      admins{adminID,adminName,image} 
      members{memberID,memberName,image} 
  
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


