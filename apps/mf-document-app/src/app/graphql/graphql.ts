import gql from "graphql-tag";
export const GET_TOKEN = gql`
  {
  accountSASToken
  }
`;

export const GET_FILES = gql`
{
  File(referenceFilter: { referenceID: "13", referenceType: PROJECTTYPE }){
    projectFileID
    files{
    fileURL
    fileTitle
    fileType
    fileVersion
    }
    BKPID
    BKPIDTitle
    folderName
    phaseID
    phaseName
    fileTypeID
    fileTypeName
    structureID
    structureTitle
    createdAt
    updatedAt
    updatedBy
    createdBy
    isFolder
    isEveryOneAllowed
    people{
    userID
    userName
    }
    }
  }
`;


export const UPLOAD_FILE = gql`
mutation CreateFile(
  $fileTypeID: String!, 
  $fileTypeName: String!,
  $isFolder: Boolean!,
  $BKPIDTitle: String!,
  $folderName: String!,
  $BKPID: String!,
  $phaseID: String!,
  $phaseName: String!,
  $structureID: String!,
  $structureTitle: String!,
  $isEveryOneAllowed: Boolean!
  $files: [FileParams!]! 
  $people: [PeopleParams!]!
  ){ 
    createFile(
      referenceFilter: { referenceID: "13", referenceType: PROJECTTYPE }
      fileDetails: {
      fileBasics: {
      fileTypeID: $fileTypeID
      fileTypeName: $fileTypeName
      isFolder:$isFolder
      BKPID: $BKPID
      BKPIDTitle:$BKPIDTitle
      folderName: $folderName
      phaseID:$phaseID
      phaseName: $phaseName
      structureID: $structureID
      structureTitle:$structureTitle
      isEveryOneAllowed: $isEveryOneAllowed
      }
      people: $people
      files: $files
      }
      ) {
      BKPID
      files{
      fileURL
      fileTitle
      fileType
      fileVersion
      }
      folderName
      phaseID
      fileTypeID
      fileTypeName
      phaseName
      structureID
      structureTitle
      updatedAt
      createdAt
      projectFileID
      isEveryOneAllowed
      }
}`;


