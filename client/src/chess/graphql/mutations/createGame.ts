import { gql } from "@apollo/client";

export const CREATE_GAME_MUTATION = gql`
  mutation CreateGame {
    createGame {
      gameID
    }
  }
`;

export namespace CreateGameMutation {
  export interface Response {
    createGame: {
      gameID: string;
    };
  }
}
