import { gql } from "@apollo/client";

export const LAST_MOVE = gql`
  query LastMove($gameID: String!) {
    game(gameID: $gameID) {
      lastMove {
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

export namespace LastMove {
  export interface Response {
    game: {
      lastMove?: Move;
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
