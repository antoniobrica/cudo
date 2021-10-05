import gql from "graphql-tag";
export const GET_TOKEN = gql`
  {
  accountSASToken
  }
`;

export const GET_FILES = gql`query UploadedFiles($projectId:String!)
{
  uploadedFiles(referenceFilter: { referenceID: $projectId, referenceType:PROJECTTYPE }) { 
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
    createdBy 
    createdAt 
    updatedBy 
    updatedAt
    isEveryOneAllowed 
    children{
      parentUploadedFileID
      fileURL
      fileTitle
      fileType
      fileVersion
      fileTypeName
      isEveryOneAllowed
      uploadedFileID
      BKPID 
      BKPIDTitle 
      phaseID 
      phaseName 
      fileTypeID  
      structureID 
      directory
      structureTitle  
      versionCount
      taskCount
      commentCount
      createdBy 
      createdAt 
      updatedBy 
      updatedAt
      workTypeID
      workTypeTitle
      people { 
        userID 
        userName 
      }
      isDeleted
    }
    people { 
      userID 
      userName 
    }
    workTypeID
    workTypeTitle 
  } 
  }
`;

export const UPLOAD_FILE = gql`
mutation SaveUploadedFile(
  $projectId:String!,
  $projectTitle:String!,

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
  $workTypeID:String,
  $workTypeTitle:String
  ){ 
    saveUploadedFile(
      referenceFilter:{ 
      referenceType:PROJECTTYPE
      referenceID:$projectId
      referenceTitle:$projectTitle
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
      referenceID:$projectId
      referenceTitle:$projectTitle
      peoples:$people
      workTypeID:$workTypeID,
      workTypeTitle:$workTypeTitle
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
      workTypeID
      workTypeTitle
      }
}`;

export const UPLOAD_FILE_VERSION = gql`
mutation UploadNewFileVersion(
  $projectId:String!,
  $projectTitle:String!,

  $parentUploadedFileID: String!,
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

  ){ 
    uploadNewFileVersion(
      uploadedFileInfo:{
      parentUploadedFileID: $parentUploadedFileID
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
      referenceID:$projectId
      referenceTitle:$projectTitle
      peoples: [{
        userID: "1",
        userName: "S1",
        imageUrl: "url1"
      }]
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

export const GET_FILE_VERSIONS = gql`query FileVersions($projectId:String!,$fileId:String!,){
  fileVersions(
    parentFile: {
      referenceType: PROJECTTYPE
      referenceID: $projectId # "04b9bb40-de6b-11eb-b34f-cd1f71d8908c"
      uploadedFileID: $fileId # "e81f3f80-f91a-11eb-8f43-87a1cb82224b"
    }
  ) {
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
    fileTypeName
    isEveryOneAllowed
    fileURL
    fileTitle
    fileType
    fileVersion
    createdBy 
    createdAt 
    updatedBy 
    updatedAt
    isDeleted
    referenceID
    referenceTitle
    referenceType
    children {
      parentUploadedFileID
      fileURL
      fileTitle
      fileType
      fileVersion
      fileTypeName
      isEveryOneAllowed
      uploadedFileID
      BKPID
      BKPIDTitle
      phaseID
      phaseName
      fileTypeID
      structureID
      directory
      structureTitle
      createdBy 
      createdAt 
      updatedBy 
      updatedAt
    }
    people {
      userID
      userName
    }
  }
}
`
export const DELETE_FILE = gql`
mutation DeleteFile($uploadedFileID:String!){
  deleteFile(fileDeleteInput:{
    uploadedFileID:$uploadedFileID
  }){
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
    createdBy 
    createdAt 
    updatedBy 
    updatedAt
    isEveryOneAllowed 
    children{
      parentUploadedFileID
      fileURL
      fileTitle
      fileType
      fileVersion
      fileTypeName
      isEveryOneAllowed
      uploadedFileID
      BKPID 
      BKPIDTitle 
      phaseID 
      phaseName 
      fileTypeID  
      structureID 
      directory
      structureTitle  
      versionCount
      taskCount
      commentCount
      createdBy 
      createdAt 
      updatedBy 
      updatedAt
      workTypeID
      workTypeTitle
      people { 
        userID 
        userName 
      }
      isDeleted
    }
    people { 
      userID 
      userName 
    }
    workTypeID
    workTypeTitle
  }
}`