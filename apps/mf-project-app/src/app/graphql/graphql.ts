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
    getProjects {
     projectId
     projectName
     projectNum
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

export const ADD_PROJECT = gql`
mutation CreateProjectDatabase(
  $projectName: String!, 
  $projectNum: String!,
  $client: String!,
  $buildingType: String,
  $printingCom: String,
  $workType: String,
  $estCost: String,
  $adressLine1: String,
  $adressLine2: String,
  $city: String,
  $state: String,
  $zip: String,
  $country: String
  ){ 
  createProjectDatabase(createProjectData: {
     projectName: $projectName,
     projectNum: $projectNum, 
    client: $client,
    buildingType: $buildingType,
    printingCom: $printingCom,
    workType: $workType,
    estCost: $estCost,
    adressLine1: $adressLine1,
    adressLine2: $adressLine2,
    city: $city,
    state: $state,
    zip: $zip,
    country: $country
   }){
    projectId
    projectName
    projectNum
    client
    buildingType
    printingCom
    workType
    estCost
    adressLine1
    adressLine2
    city
    state
    zip
    country
  }
}`;



//dummy data


