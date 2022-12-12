import { gql } from "@apollo/client";

export const ADD_MOVE_MUTATION = gql`
  mutation Mutation(
    $fen: String!
    $executedMove: ExecutedMoveInput!
    $gameID: String!
    $whiteTakes: [String!]!
    $blackTakes: [String!]!
  ) {
    addMove(
      fen: $fen
      executedMove: $executedMove
      gameID: $gameID
      whiteTakes: $whiteTakes
      blackTakes: $blackTakes
    ) {
      token
    }
  }
`;

export namespace AddMoveMutation {
  export interface Variables {
    fen: string;
    executedMove: {
      causedCheck?: boolean;
      from: IAlgebraic;
      to: IAlgebraic;
      pieceType: PieceType;
    };
    whiteTakes: PieceType[];
    blackTakes: PieceType[];
    gameID: string;
  }
}
