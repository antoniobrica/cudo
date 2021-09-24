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
    parentFileID
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

export const GET_TASKS_BY_TYPES = gql`
query TasksByTasktypes(
  $referenceID: String!,
  $fileID: String!
){
   tasksByTasktypes(
    referenceFilter:{referenceID: $referenceID ,referenceType:PROJECTTYPE} 
    taskTypeFilter:{fileID: $fileID,taskType:PIN}
  ){ 
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
    fileName   
    files{
     fileID
     fileName
     fileUrl
    }
    assignees{
      userID
      userName
      imageUrl
    }
    followers{
      userID
      userName
      imageUrl
    }
    subtasks{
      subtaskID 
      subtaskTitle 
      status
      isDeleted
    }
  } 
}`;


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
  $parentFileID: String! 
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
          parentFileID : $parentFileID
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
      subtasks{subtaskID, subtaskTitle, status,isDeleted}
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

// Added for Sub task
export const UPDATE_TASK_STATUS = gql`
mutation UpdateTask(
  $taskID: String!,    
  $status: TASKSTATUS!,
){ 
    updateTask(
        taskDetailsUpdate: {
        taskBasics:{
          taskID: $taskID,
          status: $status          
        }      
   }){
    taskID
    status    
  }
}`;


export const UPDATE_SUBTASK_STATUS = gql`
mutation UpdateSubTask(
  $subtaskID: String!,    
  $status: TASKSTATUS!  
  ){ 
  updateSubTask(
    subTaskDetail: {
      status:$status
    }
    subTaskFilter:{
      subtaskID:$subtaskID
     }    
  ) {
    subtaskID
    subtaskTitle
    status
    isDeleted
  }
}`;

export const UPDATE_SUBTASK = gql`
mutation UpdateSubTask(
    $subtaskID: String!,    
    $subtaskTitle: String!  
  ){ 
    updateSubTask(
      subTaskDetail: {
        subtaskTitle:$subtaskTitle
      }
      subTaskFilter:{
        subtaskID:$subtaskID
      }    
    ) {
      subtaskID
      subtaskTitle
      status
      isDeleted
    }
}`;

export const DELETE_SUBTASK = gql`
mutation DeleteSubTask(
  $subtaskID: String!
  ){ 
    deleteSubTask(
      subtaskDeleteInput:{
        subtaskID:$subtaskID
      }    
  ) {
    subtaskID
    subtaskTitle
    status
    isDeleted
  }
}`;
