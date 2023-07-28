import gql from "graphql-tag";
export const GET_TOKEN = gql`
  {
  accountSASToken
  }
`;

export const GET_FILES = gql`
{
  uploadedFiles(referenceFilter: { referenceID: "13", referenceType:PROJECTTYPE }) { 
    uploadedFileID 
    parentUploadedFileID
    fileURL 
    fileTitle 
    fileType 
    BKPID 
    BKPIDTitle 
    phaseID 
    phaseName 
    fileTypeID 
    fileTypeName 
    structureID 
    directory
    structureTitle 
    updatedBy 
    createdBy 
    isEveryOneAllowed 
    children{
      fileURL
      fileTitle
      fileType
      fileTypeID
      fileVersion
      fileTypeName
      isEveryOneAllowed
      uploadedFileID
      
    }
    people { 
      userID 
      userName 
    } 
  } 
  }
`;


export const UPLOAD_FILE = gql`
mutation SaveUploadedFile(
  $directory: String!,
  $fileTypeID: String!, 
  $fileTypeName: String!,
  $BKPIDTitle: String!,
  $BKPID: String!,
  $phaseID: String!,
  $phaseName: String!,
  $structureID: String!,
  $structureTitle: String!,
  $isEveryOneAllowed: Boolean!
  $fileURL: String!,
  $fileTitle: String!,
  $fileType: FileTypeEnum!,
  $fileVersion:Float!
  $people: [PeopleParams!]!

  ){ 
    saveUploadedFile(
      referenceFilter:{ 
      referenceType:PROJECTTYPE
      referenceID:"13"
      referenceTitle:"gamesoft"
      }
      uploadedFileInfo:{
      directory:$directory
      structureID: $structureID
      structureTitle:$structureTitle
      BKPID:$BKPID
      BKPIDTitle: $BKPIDTitle
      phaseID:$phaseID
      phaseName: $phaseName
      generateFileName:true
      fileTypeID: $fileTypeID
      fileTypeName: $fileTypeName
      isEveryOneAllowed: $isEveryOneAllowed
      fileURL: $fileURL
      fileTitle: $fileTitle
      fileType: $fileType
      fileVersion: $fileVersion
      createdBy:"a1"
      updatedBy:"s2"
      isDeleted:false
      referenceType:PROJECTTYPE
      referenceID:"13"
      referenceTitle:"gamesoft"
      peoples:$people
      }){
      uploadedFileID
      parentUploadedFileID
      directory
      structureID
      structureTitle
      BKPID
      BKPIDTitle
      phaseID
      phaseName
      generateFileName
      fileTypeID
      fileReferences{
      fileReferenceID
      referenceID
      referenceType
      referenceTitle
      }
      people{
      filePeopleID
      userID
      userName
      imageUrl
      }
      }
}`;


