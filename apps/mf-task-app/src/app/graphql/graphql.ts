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
  createdBy
  startDate
  endDate
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
  $status: String!,
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
      status: $status,
        }
      assignees:[{userID:"2",userName:"Ashutosh"},{userID:"3",userName:"Ashutosh"}]
      followers:[{userID:"1",userName:"Ashutosh"}]
   }){
    taskTitle
    startDate
    endDate
  }
}`;



//dummy data


