import { gql } from "@apollo/client";

export const LAST_MOVE = gql`
  query LastMove {
    game {
      lastMove{
        fen
        colorToMove
        takes{
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
      playerIDs{
        white
        black
      }
    }
  }
`

export namespace LastMove{
  export interface Response{
    game: {
      lastMove?: Move,
      playerIDs: {
        white: string,
        black: string
      }
    }
  }
}
