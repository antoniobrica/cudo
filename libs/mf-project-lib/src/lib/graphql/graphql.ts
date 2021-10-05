import gql from 'graphql-tag'

export const GET_COMPANY_WORKTYPES = gql`
query WorkTypes($companyId:String!)
  {
    workTypes(referenceFilter:{
      referenceType:COMPANY,
      referenceID:$companyId
      })
    {
      workTypeID
      name
    }
  }
`;

export const GET_PROJECT_BY_ID = gql`
query ProjectById($projectId: String!) 
{
  projectById( projectId:$projectId)
  {
    projectId
    projectName
    projectNum
    client
    buildingType
    printingCompany
    projectWorkTypes{
      workID
      workTypeName
      projectWorkTypeID
      estimatedCost
    }
    description
    createdBy
  }
}
`;