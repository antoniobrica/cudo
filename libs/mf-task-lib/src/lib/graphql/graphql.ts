import gql from "graphql-tag";
export const GET_MILESTONES = gql`{

  MileStones(referenceFilter: {  
    referenceType: PROJECTTYPE, referenceID: "d3f04920-a18e-11eb-bd3b-7597bc3ab7d7" 
        }){ 
         milestoneID 
        milestoneTitle 
        phaseName
        dueDate
        status
        worktypeID
        worktypeName
        description
        files{fileID,fileName,fileUrl} 
      } 
    
}`

export const DELETE_MILESTONE = gql`
mutation  Delete($milestoneID: String!){ 
  deleteMileStone(milestoneFilter: { milestoneID: $milestoneID }) { 
    milestoneID 
    milestoneTitle 
  } 

} 
`
export const GET_MILESTONES_BY_ID = gql`
query MileStone($milestoneID: String!) {
  
  MileStoneByID( 
    milestoneFilter: { milestoneID: $milestoneID } 
  ) { 

    milestoneID 

    milestoneTitle 

    description 
    phaseName
    dueDate
    status
    worktypeID
    worktypeName
    files { 

      fileID 

    } 

  } 

    
}`
export const ADD_MILESTONE = gql`
mutation CreateMileStone(
  $milestoneTitle: String!, 
  $dueDate: DateTime!,
  $description: String!,
  $phaseID: String!,
  $phaseName: String!,
  $worktypeName: String!,
  $worktypeID: String!
  ){ 
    createMileStone(
      referenceFilter: { referenceType: PROJECTTYPE, referenceID: "d3f04920-a18e-11eb-bd3b-7597bc3ab7d7" }
      mileStoneDetails: {
        milestoneBasics: {
          milestoneTitle: $milestoneTitle
          dueDate: $dueDate
          description: $description
          phaseID: $phaseID
          phaseName: $phaseName
          worktypeID: $worktypeID
          worktypeName: $worktypeName
          status: INPROGRESS,
        }
        files: [
          {  fileID: "swsd", fileUrl: "Pull.comm", fileName: "requeest" }
        ]
        
      }
    ) {
      milestoneID
      description
      phaseID
      phaseName
      status
      worktypeID
      worktypeName
      files {
        fileUrl
      }
    }
}`;

export const UPDATE_MILESTONE = gql`
mutation UpdateMileStone(
  $milestoneID: String!,
  $milestoneTitle: String!, 
  $dueDate: DateTime!,
  $description: String!,
  $phaseName: String!,
  $status: TASKSTATUS!,
  $worktypeName: String!,
  $worktypeID: String!
  ){ 
    updateMileStone(
      milestoneDetailsUpdate: {
        milestoneBasics: {
          milestoneTitle: $milestoneTitle
          milestoneID: $milestoneID
          dueDate: $dueDate
          description: $description
          phaseName: $phaseName
          worktypeID: $worktypeID
          worktypeName: $worktypeName
          status: $status
        }
        files: [
          { fileID: "swsd", fileUrl: "Pull.comm", fileName: "requeest" }
        ]
      }
    ) {
      milestoneID
      description
      phaseID
      phaseName
      status
      files {
        fileUrl
      }
    }
}`;

export const GET_TASKS = gql`
query Tasks($referenceID: String!) 
{
  tasks(referenceFilter: {
    referenceType: PROJECTTYPE
    referenceID: $referenceID
  }){
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
    reference{
      referenceID
    }
    assignees{
      userID
      userName
    }
    followers{
      userID
      userName
    }
    subtasks{subtaskID, subtaskTitle, status}
  }
}
`;


export const ADD_TASK = gql`
mutation CreateTask(
  $taskTitle: String!, 
  $startDate: DateTime,
  $endDate: DateTime,
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
  $taskTypeID: String!
  $taskType: TASKTYPE!
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
          taskType: $taskType
          workTypeID: $workTypeID
          workTypeName:$workTypeName
        }
        assignees: $assignees
        followers: $followers
        files: $files,
        subtasks: $subtasks
      }
    ){
    taskTitle
    startDate
    endDate
  }
}`;


export const UPDATE_TASK = gql`
mutation UpdateTask(
  $taskID: String!,    
  $status: TASKSTATUS!,
  $taskTitle: String!,
  $startDate: DateTime,
  $endDate: DateTime,
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
          description: $description
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
