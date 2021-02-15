import gql from "graphql-tag";



export const GET_PROJECTS = gql`
  {
    getProjects {
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
    description
    }
  }
`;


export const ADD_PROJECT = gql`
mutation CreateNewProject(
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
  $description: String
  ){ 
    createNewProject(newProjectInputObject: {
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
    description: $description
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
    description
  }
}`;



//dummy data


