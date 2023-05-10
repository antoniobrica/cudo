import gql from 'graphql-tag';

export const MUTATION_CREATE_USER = gql`
  mutation CreateUser(
    $userName: String!
    $userID: String!
    $imageUrl: String!
    $email: String!
    $referenceID: String!
    $referenceType: ReferenceType!
  ) {
    createUser(
      userDetails: { userName: $userName, userID: $userID, imageUrl: $imageUrl, email: $email }
      referenceFilter: { referenceID: $referenceID, referenceType: $referenceType }
    ) {
      userID
    }
  }
`;
