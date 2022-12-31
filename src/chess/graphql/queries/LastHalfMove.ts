import { gql } from "@apollo/client";

export const LAST_HALF_MOVE = gql`
  query LastHalfMove($gameID: String!) {
    game(gameID: $gameID) {
      lastHalfMove {
        fen
        takes {
          white
          black
        }
        executedMove {
          from {
            file
            rank
          }
          to {
            file
            rank
          }
          pieceType
          causedCheck
        }
      }
      playerIDs {
        white
        black
      }
      colorToMove
    }
  }
`;

export namespace LastHalfMove {
  export interface Response {
    game: {
      lastHalfMove?: HalfMove;
      playerIDs: {
        white: string;
        black: string;
      };
      colorToMove: "w" | "b";
    };
  }

  export interface Variables {
    gameID: string;
  }
}
