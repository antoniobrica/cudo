import gql from "graphql-tag";
export const GET_TOKEN = gql`
  {
  accountSASToken
  }
`;

export const GET_COST = gql`
query Costs($referenceID: String!) 
{
  costs(referenceFilter: {referenceID: $referenceID, referenceType: PROJECTTYPE }) { 
    id 
    costID 
    structureID
    structureName
    BKPCosts { 
      BKPID 
      description
      itemQuantity
      bkpCostID
      BKPID
      BKPTitle
      itemPrice
      itemTotalPrice
      bkpCostFiles { 
        bkpCostFileID 
        uploadedFileTitle
        uploadedFileID
      } 
    } 
  } 
  }
`;


export const CREATE_COST = gql`
mutation CreateCost(
  $description: String!,
  $uploadedFileID: String!, 
  $uploadedFileTitle: String!,
  $BKPTitle: String!,
  $BKPID: String!,
  $itemPrice: Float!,
  $itemQuantity: Float!,
  $referenceID: String!,
  $structureID: String!,
  $structureName: String!
  ){ 
    createCost( 
      referenceFilter: {  referenceID: $referenceID, referenceType: PROJECTTYPE } 
      costDetails: { 
        costBasicInfo: { structureID: $structureID, structureName: $structureName } 
        BKPCosts: { 
          bkpCostBasic: { 
            BKPID: $BKPID
            BKPTitle: $BKPTitle
            description: $description
            itemPrice: $itemPrice 
            itemQuantity: $itemQuantity
          } 
          bkpCostFiles: { 
            uploadedFileID: $uploadedFileID
            uploadedFileTitle: $uploadedFileTitle
          } 
        } 
      } 
  
    ) { 
  
      id 
      costID 
      BKPCosts { 
        BKPTitle 
        bkpCostFiles { 
          bkpCostFileID 
          uploadedFileID 

        } 
  
      } 
  
    } 
}`;



export const EDIT_COST = gql`
mutation 
UpdateBkpCost(
  $BKPID: String!,
  $bkpCostID: String!,
  $description: String!,
  $BKPTitle: String!,
  $itemPrice: Float!,
  $itemQuantity: Float!
  )
  {
    updateBkpCost(bkpCostDetailsUpdate:{
      bkpCostID:$bkpCostID
      BKPID: $BKPID
      BKPTitle: $BKPTitle
      description: $description
      itemPrice: $itemPrice 
      itemQuantity: $itemQuantity
    } 
    )
    {
      BKPTitle
    }
    
  }
`

export const DELETE_COST = gql`
mutation 
DeleteCost(
  $costID: String!,
  )
{
  deleteCost( costFilter: {  costID: $costID} )
{
  id
}
}`
