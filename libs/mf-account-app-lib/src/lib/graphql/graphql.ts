import gql from "graphql-tag";
export const GET_COUNTRY = gql`
  {
    countries{
      countryName
      countryCode
      }
  }
`;

export const GET_USERS = gql`
{
  userByEmail( 
    email:"vipin11july1995@gmail.com",
  ) { 
     userID
     userName
     email
  } 
  }
`;

export const GET_BKP = gql`{
    Bkp(referenceFilter:{referenceType:COMPANY,referenceID:"dapr"})
   {
    bkpID
    bkpTitle
    }
  
}`

export const GET_FOLDER = gql`{
  Folders(referenceFilter: { referenceID: "dapr", referenceType: COMPANY }) { 
    folderTitle 
    folderID 
  } 

}`

export const GET_FILE_TYPE = gql`{
    FileTypes(referenceFilter: { referenceType: COMPANY, referenceID: "dapr" }
  ){
      fileTypeID                      
      fileTypeTitle
      
    }
}`
export const GET_FILE_STRUCTURE = gql`{
  FileStructure(referenceFilter: { referenceType: COMPANY, referenceID: "dapr" }
  ){
      fileStructureID
      fileStructureTitle
      
    }
}`

export const GET_PHASE = gql`{
  Phase(referenceFilter:{referenceType:COMPANY,referenceID:"dapr"})
 {
  id
phaseTitle
  }

}`

export const GET_CATAGORIES = gql`{
  MeetingCatagories( 
    referenceFilter: { referenceID: "dapr", referenceType: COMPANY } 
  ) { 
    meetingCatagoryID 
    meetingCatagoryTitle 
  } 
}`

export const GET_PROTOCOL = gql`{
  ProtocoleTemplates( 
    referenceFilter: { referenceID: "dapr", referenceType: COMPANY } 
  ) { 
    protocolTemplateID 
    protocolTemplateTitle 

  } 
}`

export const GET_INVITATION = gql`{
  invitationTemplates( 
    referenceFilter: { referenceID: "dapr", referenceType: COMPANY } 
  ) { 
    invitationTemplateID 
    invitationTemplateTitle 

  } 
}`



export const ADD_FOLDER = gql`
mutation CreateFolder(
  $folderTitle: String!, 
  ){ 
    createFolder( 
      referenceFilter: { referenceID: "dapr", referenceType: COMPANY } 
      folderDetails: { folderID: "4", folderTitle:  $folderTitle } 
    ) { 
      folderID 
      folderTitle 
    } 
}`;


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


