import gql from 'graphql-tag';

export const QUERY_USER_BY_EMAIL = gql`
  query userByEmail($email: String!) {
    userByEmail(email: $email) {
      userID
      references {
        referenceID
        referenceType
        name
        imageUrl
      }
    }
  }
`;
