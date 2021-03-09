import gql from "graphql-tag";
export const GET_COUNTRY = gql`
  {
    countries{
      countryName
      countryCode
      }
  }
`;

export const GET_USERS= gql`
{
  users(userID:"1") {
  userID
  userName
  references {
  referenceID
  referenceType
  }
  }
  }
`;

export const GET_BKP = gql`{
    Bkp(referenceFilter:{referenceType:COMPANY,referenceID:"3"})
   {
    bkpID
    bkpTitle
    }
  
}`

export const GET_PHASE = gql`{
  Phase(referenceFilter:{referenceType:COMPANY,referenceID:"3"})
 {
  id
phaseTitle
  }

}`
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
      referenceFilter:{
        referenceID: "Sftobiz_1234"
        referenceType: "project"
        projectID: "33"
        companyID: "click"
        },
      taskDetails: {
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


