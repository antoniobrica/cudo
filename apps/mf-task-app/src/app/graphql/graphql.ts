import gql from "graphql-tag";
export const GET_TASKS = gql`
{
  tasks(referenceFilter: {
  projectID: "3"
  companyID: "1"
  referenceType: PROJECTTYPE
  referenceID: "3"
  }){
  taskTitle
  taskID
  status
  createdBy
  startDate
  endDate
  estimatedDays
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
  }
  }
`;


export const ADD_TASK = gql`
mutation CreateTask(
  $taskTitle: String!, 
  $startDate: DateTime!,
  $endDate: DateTime!,
  $estimatedDays: String!,
  $sendNotification: String!,
  $BKPID: String!,
  $saveTaskAsTemplate: String!,
  $phasesID: String!,
  ){ 
    createTask(
      referenceFilter: {
        projectID: "3"
        companyID: "1"
        referenceType: PROJECTTYPE
        referenceID: "3"
        },
      taskDetails: {
      taskBasics:{
      taskTitle: $taskTitle,
      startDate: $startDate, 
      endDate: $endDate,
      estimatedDays: $estimatedDays,
      sendNotification: $sendNotification,
      BKPID: $BKPID,
      saveTaskAsTemplate: $saveTaskAsTemplate,
      phasesID: $phasesID,
      status: INPROGRESS
        }
      assignees:[{userID:"2",userName:"Ashutosh"},{userID:"3",userName:"Ashutosh"}]
      followers:[{userID:"1",userName:"Ashutosh"}]
   }){
    taskTitle
    startDate
    endDate
  }
}`;



export const UPDATE_TASK = gql`
mutation UpdateTask(
  $taskID: String!,      
  ){ 
    updateTask(
      referenceFilter: {
        projectID: "3"
        companyID: "1"
        referenceType: PROJECTTYPE
        referenceID: "3"
        },
        taskDetailsUpdate: {
        taskBasics:{
          taskID: $taskID,
          status: COMPLETED
        }
      assignees:[{userID:"2",userName:"Ashutosh"},{userID:"3",userName:"Ashutosh"}]
      followers:[{userID:"1",userName:"Ashutosh"}]
   }){
    taskID
    status    
  }
}`;
//dummy data


