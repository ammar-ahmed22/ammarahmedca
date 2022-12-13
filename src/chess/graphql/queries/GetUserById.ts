import { gql } from "@apollo/client";

export const GET_USER_BY_ID = gql`
  query GetUserByID($userId: String!) {
    getUserByID(userId: $userId) {
      _id
      lastName
      company
      createdAt
      email
      emailConfirmed
      firstName
      foundBy
      gameIDs
      middleName
      position
      profilePic
      record {
        losses
        wins
      }
    }
  }
`;

export namespace GetUserById {
  export interface Response {
    getUserByID: User;
  }

  export interface Variables {
    userId: string;
  }
}
