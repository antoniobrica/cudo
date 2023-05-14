import gql from 'graphql-tag';

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
  query Projects($referenceID: String!) {
    projects(referenceFilter: { referenceType: COMPANY, referenceID: $referenceID }) {
      projectId
      projectName
      projectNum
      client
      buildingType
      printingCompany
      projectWorkTypes {
        workTypeName
        projectWorkTypeID
        workTypeName
        estimatedCost
      }
      description
      createdBy
    }
  }
`;
export const GET_PROJECT_BY_ID = gql`
  query ProjectById($projectId: String!) {
    projectById(projectId: $projectId) {
      projectId
      projectName
      projectNum
      client
      buildingType
      printingCompany
      projectWorkTypes {
        workTypeName
        projectWorkTypeID
        workTypeName
        estimatedCost
      }
      description
      createdBy
    }
  }
`;

export const GET_WORKTYPES = gql`
  {
    workTypes(referenceFilter: { referenceType: COMPANY, referenceID: "Sftobiz_1234" }) {
      name
      workTypeID
    }
  }
`;

export const GET_BUILDINGTYPES = gql`
  {
    buildingTypes(referenceFilter: { referenceType: COMPANY, referenceID: "Sftobiz_1234" }) {
      name
      buildingTypeID
    }
  }
`;

export const GET_PRINTING_COMPANY = gql`
  {
    company(referenceFilter: { referenceType: COMPANY, referenceID: "Sftobiz_1234" }, companyType: PRINTING) {
      companyID
      companyName
      companyType
    }
  }
`;

export const GET_CLIENT_COMPANY = gql`
  {
    company(referenceFilter: { referenceType: COMPANY, referenceID: "Sftobiz_1234" }, companyType: CLIENT) {
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
      referenceFilter: { referenceType: COMPANY, referenceID: "Sftobiz_1234" }
      companyDetails: { companyName: $companyName, companyType: CLIENT }
    ) {
      id
      title
      description
      status
    }
  }
`;

export const ADD_PROJECT = gql`
  mutation CreateProject(
    $projectName: String!
    $projectNum: Float!
    $client: String!
    $buildingType: String!
    $printingCompany: String!
    $description: String!
    $projectWorkEstimates: [ProjectWorkParams!]!
    $addressLineOne: String!
    $addressLineTwo: String!
    $city: String!
    $state: String!
    $zip: String!
    $country: String!
    $createdBy: String!
  ) {
    createProject(
      projectDetails: {
        projectBasics: {
          projectName: $projectName
          projectNum: $projectNum
          client: $client
          buildingType: $buildingType
          printingCompany: $printingCompany
          description: $description
          addressLineOne: $addressLineOne
          addressLineTwo: $addressLineTwo
          city: $city
          state: $state
          zip: $zip
          country: $country
          createdBy: $createdBy
        }
        projectWorkEstimates: $projectWorkEstimates
      }
      referenceFilter: { referenceType: COMPANY, referenceID: "Sftobiz_1234" }
    ) {
      projectId
      projectName
      projectNum
      client
      buildingType
      printingCompany
      projectWorkTypes {
        workTypeName
        projectWorkTypeID
        workTypeName
        estimatedCost
      }
      description
    }
  }
`;

//dummy data
