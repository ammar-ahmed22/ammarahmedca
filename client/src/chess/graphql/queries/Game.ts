import { gql } from "@apollo/client";

export const GAME_QUERY = gql`
  query Query {
    game {
      moves {
        fen
        takes {
          black
          white
        }
        colorToMove
        boardOpts {
          castling
          enPassant
          halfMove
          fullMove
        }
      }
      playerIDs {
        black
        white
      }
    }
  }
`;

export namespace GameQuery {
  export interface Response {
    game: Game;
  }
}
