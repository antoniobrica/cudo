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

export const GET_STRUCTURE = gql`{
  structureRoots(referenceFilter: {referenceType:COMPANY,referenceID:"Sftobiz_1234" }) {
    structureID
    referenceID
    referenceType
    structureName
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

export const GET_REFERENCES = gql`
query references(
  $referenceID: String!, 
  $referenceType: ReferenceType!,
  ){ 
    references( 
      referenceFilter: { referenceID: $referenceID, referenceType:$referenceType } 
    ) { 
      users{
      userID
      userName
      imageUrl
      email
    }
    } 
}`;

//dummy data


