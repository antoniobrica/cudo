import gql from "graphql-tag";

export const GET_TODOS = gql`
  {
    getTodos {
      id
      title
      description
      status
    }
  }
`;

export const GET_PROJECTS = gql`
  {
    projects(referenceFilter:{
      referenceType:"Company",
      referenceID:"Sftobiz_123"
      })
    {
      projectId
      projectName
      projectNum
      client
      buildingType
      printingCom
      workType
      estCost
      description
    }
  }
`;


export const GET_WORKTYPES = gql`
  {
    workTypes(referenceFilter:{
      referenceType:"Company",
      referenceID:"Sftobiz_123"
      })
    {
      name
      workTypeID
    }
  }
`;


export const GET_BUILDINGTYPES = gql`
  {
    buildingTypes(referenceFilter:{
      referenceType:"Company",
      referenceID:"Sftobiz_123"
      }){
      name
      buildingTypeID
      }
  }
`;

export const GET_PRINTING_COMPANY = gql`
  {
    company(referenceFilter:{
      referenceType:"Company",
      referenceID:"Sftobiz_123"
}, companyType:PRINTING)
    {
     companyID
     companyName
     companyType
    }
  }
`;

export const GET_CLIENT_COMPANY = gql`
  {
    company(referenceFilter:{
      referenceType:"Company",
      referenceID:"Sftobiz_123"
}, companyType:CLIENT)
    {
     companyID
     companyName
     companyType
    }
  }
`;


export const ADD_TODO = gql`
  mutation AddTodo($title: String!, $description: String!) {
    addTodo(todoInput: { title: $title, description: $description }) {
      id
      title
      description
      status
    }
  }
`;

export const CREATE_COMPANY = gql`
  mutation CreateCompany($companyName: String!, $companyType: String!) {
    createCompany(
      referenceFilter:{
      referenceType:"Company",
      referenceID:"Sftobiz_123"
      },companyDetails:{
      companyName: $companyName
      companyType: CLIENT
      }) {
      id
      title
      description
      status
    }
  }
`;

export const ADD_PROJECT = gql`
mutation CreateProject(
  $projectName: String!, 
  $projectNum: Float!,
  $client: String!,
  $buildingType: String,
  $printingCom: String,
  $workType: String,
  $estCost: Float,
  $description: String
  ){ 
    createProject(taskDetails: {
    projectName: $projectName,
    projectNum: $projectNum, 
    client: $client,
    buildingType: $buildingType,
    printingCom: $printingCom,
    workType: $workType,
    estCost: $estCost,
    description: $description
   }
   referenceFilter: { referenceType: "Company", referenceID: "Sftobiz_123" }
   ){
    projectId
    projectName
    projectNum
    client
    buildingType
    printingCom
    workType
    estCost
    description
  }
}`;



//dummy data


