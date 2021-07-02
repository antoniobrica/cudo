import gql from "graphql-tag";
export const GET_TASKS = gql`
query Tasks($referenceID: String!) 
{
  tasks(referenceFilter: {
    referenceType: PROJECTTYPE
    referenceID: $referenceID
  }){
    results{
      taskID
    taskTitle
    startDate
    endDate
    estimatedDays
    sendNotification
    saveTaskAsTemplate
    BKPID
    BKPTitle
    phaseID
    description
    phaseName
    status
    updatedAt
    createdAt
    updatedBy
    createdBy
    taskTypeID
    fileID
    taskType
    workTypeID
    workTypeName
    sequenceNumber
  reference{
  referenceID
  }
  assignees{
  userID
  userName
  }
  files{fileID,fileName,fileUrl} 
  followers{
  userID
  userName
  }
  subtasks{subtaskID, subtaskTitle, status}
  }
    } 
  }
`;

export const ADD_TASK = gql`
mutation CreateTask(
  $taskTitle: String!, 
  $startDate: DateTime!,
  $endDate: DateTime!,
  $estimatedDays: String!,
  $sendNotification: Boolean!,
  $BKPID: String!,
  $BKPTitle: String!
  $saveTaskAsTemplate: String!,
  $phaseID: String!,
  $phaseName: String!,
  $referenceID: String!,
  $description: String!,
  $fileID: String! 
  $fileName: String!
  $taskTypeID: String!,
  $workTypeID: String!
  $workTypeName: String!
  $files: [TaskFileParams!]!
  $subtasks: [SubTaskParams!]!
  $assignees: [PeopleParams!]!
  $followers: [PeopleParams!]!
  ){ 
    createTask(
      referenceFilter: {
        referenceType: PROJECTTYPE
        referenceID: $referenceID
        },
      taskDetails: {
      taskBasics:{
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
      status: INPROGRESS,
      description: $description
     fileID : $fileID
     fileName:$fileName
     taskTypeID:$taskTypeID
     taskType:PROTOCOL
     workTypeID: $workTypeID
     workTypeName:$workTypeName
        }
      assignees: $assignees
      followers: $followers
      files: $files,
      subtasks: $subtasks
   }){
    taskTitle
    startDate
    endDate
    workTypeID
workTypeName
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
  $workTypeID: String!
  $workTypeName: String!
  $files: [TaskFileParams!]!
  $subtasks: [SubTaskParams!]!
  $assignees: [PeopleParams!]!
  $followers: [PeopleParams!]!
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
          description: $description,
          workTypeID: $workTypeID
          workTypeName:$workTypeName
        }
      assignees: $assignees
      followers: $followers
      files: $files
      subtasks: $subtasks

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


