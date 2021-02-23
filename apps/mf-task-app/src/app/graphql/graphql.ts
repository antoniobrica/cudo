import gql from "graphql-tag";



export const GET_TASKS = gql`
  {
    getTasks {
      taskTitle
      endDate
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
  $status: String!,
  ){ 
    createTask(taskDetails: {
      taskTitle: $taskTitle,
      startDate: $startDate, 
      endDate: $endDate,
      estimatedDays: $estimatedDays,
      sendNotification: $sendNotification,
      BKPID: $BKPID,
      saveTaskAsTemplate: $saveTaskAsTemplate,
      phasesID: $phasesID,
      status: $status,
   }){
    taskTitle
  }
}`;



//dummy data


