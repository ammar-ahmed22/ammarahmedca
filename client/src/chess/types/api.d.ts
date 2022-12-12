export {};

declare global {
  // Auth
  type GameRecord = {
    wins: number;
    losses: number;
  };
  type User = {
    _id: string;
    createdAt: number;
    email: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    company?: string;
    position?: string;
    foundBy?: string;
    // currentGameID?: string;
    gameIDs: string[];
    profilePic?: string;
    emailConfirmed: boolean;
    record: GameRecord;
  };

  interface AuthPayload {
    token: string;
  }

  type RegisterData = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    middleName: string;
    company: string;
    position: string;
    foundBy: string;
    profilePic: string;
  };

  type RegisterInput = {
    data: RegisterData;
  };

  type Move = {
    fen: string;
    takes: {
      white: string[];
      black: string[];
    };
    boardOpts?: {
      castling?: string;
      enPassant?: string;
      halfMove?: number;
      fullMove?: number;
    };

    executedMove: ExecutedMove;
  };

  type Game = {
    _id: string;
    createdAt: number;
    moves: Move[];
    playerIDs: {
      white: string;
      black: string;
    };
    colorToMove: "w" | "b";
    status: string;
  };

  type ExecutedMove = {
    from: IAlgebraic;
    to: IAlgebraic;
    pieceType: PieceType;
    causedCheck?: boolean;
  };
}
