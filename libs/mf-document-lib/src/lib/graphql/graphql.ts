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
      fileURL
      fileTitle
      fileType
      fileTypeID
      fileVersion
      fileTypeName
      isEveryOneAllowed
      uploadedFileID
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
      createdBy 
      createdAt 
      updatedBy 
      updatedAt
      workTypeID
      workTypeTitle
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
      }
    ){
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

export const SAVE_PINS = gql`
mutation 
CreatePins(
$pinsID: String
$uploadedFileID: String!
$x_axis: Float!
$y_axis: Float!
$z_axis: Float!
$isDeleted: Boolean!
  )
 { 
  createPins(
    pinsDetails:{ 
    x_axis:$x_axis
    y_axis:$y_axis
    z_axis:$z_axis
    isDeleted:$isDeleted 
    uploadedFileID: $uploadedFileID
    pageNumber: 0
    pinId: 0
  }) 

  { 

    pinsID 
    uploadedFileID 
    x_axis 
    y_axis 
    z_axis 
    isDeleted 
    updatedBy 
    createdBy 
    createdAt 
    updatedAt 
  } 

} 
`;

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

export const GET_COMMENTS = gql`query GetComments($uploadedFileID:String!){
  getComments(commentsFilter:{
    uploadedFileID: $uploadedFileID # "ca813050-095f-11ec-b7f7-13a0db5fb508"
  }) {
    commentsID
    uploadedFileID
    comment
    createdBy
    createdByEmail
    createdByUrl
    createdAt
    updatedAt
    isDeleted
  }
}`

export const ADD_COMMENT = gql`mutation CreateComment(
  $parentUploadedFileID:String!,
  $uploadedFileID:String!,
  $comment:String!,
  $createdBy:String!,
  $createdByEmail: String!,
  $createdByUrl: String!
){
  createComment(
    commentCreateDto: {
      parentUploadedFileID: $parentUploadedFileID # "ca813050-095f-11ec-b7f7-13a0db5fb508"
      uploadedFileID: $uploadedFileID # "ca813050-095f-11ec-b7f7-13a0db5fb508"
      comment: $comment # "test new comment message another abcd"
      createdBy: $createdBy # "Mukut"
      createdByEmail: $createdByEmail
      createdByUrl: $createdByUrl
    }
  ){
    commentsID
    uploadedFileID
    comment
    createdBy
    createdByEmail
    createdByUrl
    createdAt
    updatedAt
    isDeleted
  }
}`

export const UPDATE_COMMENT = gql`mutation UpdateComment(
  # $uploadedFileID:String!, 
  $commentsID:String!,
  $comment:String!
){
  updateComment(
    commentFilter: {
      # uploadedFileID: $uploadedFileID # "ca813050-095f-11ec-b7f7-13a0db5fb508"
      commentsID: $commentsID # "ab028a70-16a8-11ec-b28d-2b111cca10d3"
    }
    commentUpdateDto: { 
      comment: $comment # "test comment message updated" 
    }
  ){
    commentsID
    uploadedFileID
    comment
    createdBy
    createdByEmail
    createdByUrl
    createdAt
    updatedAt
    isDeleted
  }
}`

export const DELETE_COMMENT = gql`mutation DeleteComment($commentsID:String!){
  deleteComment(
    commentDeleteInput: { 
      commentsID: $commentsID # "ab028a70-16a8-11ec-b28d-2b111cca10d3" 
    }
  ) {
    commentsID
    uploadedFileID
    comment
    createdBy
    createdByEmail
    createdByUrl
    createdAt
    updatedAt
    isDeleted
  }
}`


export const UPDATE_PIN_STATUS = gql`mutation {
  updateTaskInfoInPinDetail(
    pinsTaskInfoUpdateDto: { 
      taskID: "5d012030-154e-11ec-bb00-a3885705ef72", 
      taskTitle: "Task 3 on File 157 ", 
      status: COMPLETED 
    }
    pinsFilter: { 
      uploadedFileID: "ca813050-095f-11ec-b7f7-13a0db5fb508", 
      pinsID: "5cae6c50-154e-11ec-9fd2-cb6640933b51" 
    }
  ) {
    pinsID
    uploadedFileID
    x_axis
    y_axis
    z_axis
    pinNumber
    pageNumber
    isDeleted
    createdBy
    createdAt
    updatedBy
    updatedAt
    status
    taskID
    taskTitle
  }
}`

export const UPDATE_PIN_TASK_INFO = gql`mutation {
  updateTaskInfoInPinDetail(
    pinsTaskInfoUpdateDto: { 
      taskID: "5d012030-154e-11ec-bb00-a3885705ef72", 
      taskTitle: "Task 3 on File 157 ", 
      status: COMPLETED 
    }
    pinsFilter: { 
      uploadedFileID: "ca813050-095f-11ec-b7f7-13a0db5fb508", 
      pinsID: "5cae6c50-154e-11ec-9fd2-cb6640933b51" 
    }
  ) {
    pinsID
    uploadedFileID
    x_axis
    y_axis
    z_axis
    pinNumber
    pageNumber
    isDeleted
    createdBy
    createdAt
    updatedBy
    updatedAt
    status
    taskID
    taskTitle
  }
}`


export const UPDATE_UPLOADED_FILE = gql`
mutation UpdateUploadedFile(
    
  $directory: String!,
  $structureID: String!,
  $structureTitle: String!,
  $BKPID: String!,
  $BKPIDTitle: String!,
  $phaseID: String!,
  $phaseName: String!,
  $fileTypeID: String!, 
  $fileTypeName: String!,
  $isEveryOneAllowed: Boolean!
  $fileURL: String!,
  $fileTitle: String!,
  $fileType: FileTypeEnum!,
  $fileVersion:Float!
  $updatedBy:String!
  $people: [PeopleParams!]!
  $uploadedFileID:String!,
  $workTypeID:String,
  $workTypeTitle:String,
  
  ){ 
  updateUploadedFile(
    updateUploadedfileDetails:{
            
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
      updatedBy:$updatedBy
      isDeleted:false
      
      peoples:$people
      uploadedFileID:$uploadedFileID
      workTypeID:$workTypeID,
      workTypeTitle:$workTypeTitle
    }
  ){
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