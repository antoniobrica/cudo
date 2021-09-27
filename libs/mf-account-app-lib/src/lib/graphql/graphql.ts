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
// titleFilter: { bkpTitle: "bkp2" }
//     referenceFilter: {
//       referenceType: COMPANY
//       referenceID: "dapr"
//     }

export const GET_BKP = gql`
query Bkp($referenceID:String!,$referenceType:ReferenceType!,$bkpTitle:String!,$bkpId:String!)
{
  Bkp(
    titleFilter: { bkpTitle: $bkpTitle,bkpId:$bkpId }
    referenceFilter: {
      referenceType: $referenceType
      referenceID: $referenceID
    }
  )
   {
    bkpID
    bkpTitle
    }
  
}`

export const CREATE_BKP_COSTS = gql`
mutation CreateBKpCost(
  $referenceID: String!
  $referenceType: ReferenceType!
  $addLayerTwoBkpHierarchy: AddLayerTwoBkpHierarchyInput!
  ) {
    createBkpCost(
      referenceFilter: {
        referenceType: $referenceType
        referenceID: $referenceID
      }
      addLayerTwoBkpHierarchy:$addLayerTwoBkpHierarchy
    ) {
      bkpCostID
      BKPID
      BKPTitle
      structureID
      structureName
      children {
        bkpCostID
        BKPID
        BKPTitle
        bkpChildrenLayerTwo {
          bkpCostID
          BKPID
          BKPTitle
          itemPrice
          itemQuantity
          itemTotalPrice
          description
        }
      }
    }
  }
`

export const GET_BKP_HIERARCHIES = gql`
query GetBkps($referenceID:String!,$referenceType:ReferenceType!)
{
  getBkps(
    refFilter:{referenceType:$referenceType,referenceID:$referenceID}
  )
  {
    bkpCostID
    BKPID
    BKPTitle
    structureID
    structureName
    children {
      bkpCostID
      BKPID
      BKPTitle
      bkpChildrenLayerTwo {
        bkpCostID
        BKPID
        BKPTitle
        itemPrice
        itemQuantity
        itemTotalPrice
        description
      }
    }
  }
}
`

export const DELETE_BKP_COST = gql`
mutation DeleteBkp(
  $bkpCostID:String!
) {
  deleteBkp(
    bkpDeleteInput :{
      bkpCostID:$bkpCostID
    }
  ) {
    BKPID
    BKPTitle
    bkpCostID
  }
}

`
export const UPDATE_BKP_COST = gql`
mutation UpdateBkpCost(
  $bkpCostID:String!
  $BKPTitle:String!
  $itemPrice:Float!
  $itemQuantity:Float!
  $itemTotalPrice:Float!
  $description:String!
) {
  updateBkpCost(
    updateBKPLayerTwo :{
      bkpCostID: $bkpCostID
      BKPTitle: $BKPTitle
      description: $description
      itemPrice: $itemPrice
      itemTotalPrice: $itemTotalPrice
      itemQuantity: $itemQuantity
    }
  ) {
    BKPID
    BKPTitle
    description
    itemPrice
    itemQuantity
    itemTotalPrice
  }
}

`

export const GET_FOLDER = gql`
query Folders($referenceID:String!,$referenceType:ReferenceType!,$folderTitle:String!)
{
  Folders(
    referenceFilter: { referenceType: $referenceType, referenceID: $referenceID }
    titleFilter: {folderTitle:$folderTitle}
  ) { 
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
    referenceFilter: { referenceID: "Sftobiz_1234", referenceType: COMPANY } 
  ) { 
    meetingCatagoryID 
    meetingCatagoryTitle 
  } 
}`

export const GET_PROTOCOL = gql`{
  ProtocoleTemplates( 
    referenceFilter: { referenceID: "Sftobiz_1234", referenceType: COMPANY } 
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
      folderDetails: {folderTitle:  $folderTitle } 
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


