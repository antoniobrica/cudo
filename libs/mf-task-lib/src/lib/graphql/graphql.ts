import gql from "graphql-tag";
export const GET_MILESTONES = gql`{

  MileStones(referenceFilter: {  
    referenceType: PROJECTTYPE, referenceID: "d3f04920-a18e-11eb-bd3b-7597bc3ab7d7" 
        }){ 
         milestoneID 
        milestoneTitle 
        phaseName
        dueDate
        status
        worktypeID
        worktypeName
        description
        files{fileID,fileName,fileUrl} 
      } 
    
}`

export const DELETE_MILESTONE = gql`
mutation  Delete($milestoneID: String!){ 
  deleteMileStone(milestoneFilter: { milestoneID: $milestoneID }) { 
    milestoneID 
    milestoneTitle 
  } 

} 
`
export const GET_MILESTONES_BY_ID = gql`
query MileStone($milestoneID: String!) {
  
  MileStoneByID( 
    milestoneFilter: { milestoneID: $milestoneID } 
  ) { 

    milestoneID 

    milestoneTitle 

    description 
    phaseName
    dueDate
    status
    worktypeID
    worktypeName
    files { 

      fileID 

    } 

  } 

    
}`
export const ADD_MILESTONE = gql`
mutation CreateTask(
  $milestoneTitle: String!, 
  $dueDate: DateTime!,
  $description: String!,
  $phaseID: String!,
  $phaseName: String!,
  $worktypeName: String!,
  $worktypeID: String!
  ){ 
    createMileStone(
      referenceFilter: { referenceType: PROJECTTYPE, referenceID: "d3f04920-a18e-11eb-bd3b-7597bc3ab7d7" }
      mileStoneDetails: {
        milestoneBasics: {
          milestoneTitle: $milestoneTitle
          dueDate: $dueDate
          description: $description
          phaseID: $phaseID
          phaseName: $phaseName
          worktypeID: $worktypeID
          worktypeName: $worktypeName
          status: INPROGRESS
        }
        files: [
          { fileID: "milestone1", fileUrl: "Pull.comm", fileName: "requeest" }
        ]
      }
    ) {
      milestoneID
      description
      phaseID
      phaseName
      status
      worktypeID
      worktypeName
      files {
        fileID
      }
    }
}`;

export const UPDATE_MILESTONE = gql`
mutation UpdateMileStone(
  $milestoneID: String!,
  $milestoneTitle: String!, 
  $dueDate: DateTime!,
  $description: String!,
  $phaseName: String!,
  ){ 
    updateMileStone(
      milestoneDetailsUpdate: {
        milestoneBasics: {
          milestoneTitle: $milestoneTitle
          milestoneID: $milestoneID
          dueDate: $dueDate
          description: $description
          phaseName: $phaseName
          worktypeName: "Whateever"
          status: INPROGRESS
        }
        files: [
          { fileID: "milestone1", fileUrl: "Pull.comm", fileName: "requeest" }
        ]
      }
    ) {
      milestoneID
      description
      phaseID
      phaseName
      status
      files {
        fileID
      }
    }
}`;





//dummy data


