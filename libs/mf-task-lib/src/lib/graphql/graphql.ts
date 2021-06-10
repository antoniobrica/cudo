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
mutation CreateTask(
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
          status: INPROGRESS
        }
        files: [
          { fileID: "milestone1", fileUrl: "Pull.comm", fileName: "requeest" }
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
        fileID
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
  ){ 
    updateMileStone(
      milestoneDetailsUpdate: {
        milestoneBasics: {
          milestoneTitle: $milestoneTitle
          milestoneID: $milestoneID
          dueDate: $dueDate
          description: $description
          phaseName: $phaseName
          worktypeName: "Whateever"
          status: INPROGRESS
        }
        files: [
          { fileID: "milestone1", fileUrl: "Pull.comm", fileName: "requeest" }
        ]
      }
    ) {
      milestoneID
      description
      phaseID
      phaseName
      status
      files {
        fileID
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
  reference{
  referenceID
  }
  assignees{
  userID
  userName
  }
  followers{
  userID
  }
  subtasks{subtaskID, subtaskTitle, status}
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
  $taskTypeID: String!
  $taskType: TASKTYPE!
  $files: [TaskFileParams!]!
  $subtasks: [SubTaskParams!]!
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
        }
      assignees:[{userID:"2",userName:"Ashutosh"},{userID:"3",userName:"Ashutosh"}]
      followers:[{userID:"1",userName:"Ashutosh"}]
      files: $files,
      subtasks: $subtasks
   }){
    taskTitle
    startDate
    endDate
  }
}`;


