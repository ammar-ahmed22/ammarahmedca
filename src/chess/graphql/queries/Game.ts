import { gql } from "@apollo/client";

export const GAME_QUERY = gql`
  query Game($gameID: String!) {
    game(gameID: $gameID) {
      _id
      createdAt
      moves {
        white {
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
        black {
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
      }
      playerIDs {
        black
        white
      }
      colorToMove
      status
    }
  }
`;

export const GAMES_QUERY = gql`
  query Games {
    games {
      _id
      createdAt
      moves {
        white {
          fen
          takes {
            black
            white
          }
          boardOpts {
            castling
            enPassant
            halfMove
            fullMove
          }
        }
        black {
          fen
          takes {
            black
            white
          }
          boardOpts {
            castling
            enPassant
            halfMove
            fullMove
          }
        }
      }
      lastHalfMove {
        fen
      }
      playerIDs {
        black
        white
      }
      colorToMove
      status
    }
  }
`;

export namespace GameQuery {
  export interface Response {
    game: Game;
  }

  export interface Variables {
    gameID: string;
  }
}

export namespace GamesQuery {
  export interface Response {
    games: (Game & { lastHalfMove?: { fen: string } })[];
  }
}
