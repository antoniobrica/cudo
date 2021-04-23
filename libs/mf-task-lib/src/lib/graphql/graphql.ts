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
          worktypeID: "123"
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


