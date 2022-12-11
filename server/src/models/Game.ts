import { Field, ID, ObjectType, InputType, Int } from "type-graphql";
import {
  getModelForClass,
  modelOptions,
  prop,
  pre,
  DocumentType,
} from "@typegoose/typegoose";
import { Schema, Types } from "mongoose";

const takesValidator = (v: string[]): boolean => {
  for (let i = 0; i < v.length; i++) {
    const p = v[i];
    if (!["pawn", "queen", "bishop", "knight", "rook"].includes(p))
      return false;
  }

  return true;
};

@ObjectType()
export class Takes {
  @Field((returns) => [String])
  @prop({
    required: true,
    default: [],
    type: String,
    validate: {
      validator: takesValidator,
      message: "Invalid piece being added to takes.",
    },
  })
  public white: Types.Array<String>;

  @Field((returns) => [String])
  @prop({
    required: true,
    default: [],
    type: String,
    validate: {
      validator: takesValidator,
      message: "Invalid piece being added to takes.",
    },
  })
  public black: Types.Array<String>;
}

@ObjectType()
export class Players {
  @Field()
  @prop({ required: true })
  public white: string;

  @Field()
  @prop({ required: true })
  public black: string;
}

@ObjectType()
export class BoardOpts {
  @Field({ nullable: true })
  @prop()
  public castling?: string;

  @Field({ nullable: true })
  @prop()
  public enPassant?: string;

  @Field((returns) => Int, { nullable: true })
  @prop()
  public halfMove?: number;

  @Field((returns) => Int, { nullable: true })
  @prop()
  public fullMove?: number;
}

@InputType()
export class BoardOptsInput implements BoardOpts {
  @Field({ nullable: true })
  public castling?: string;

  @Field({ nullable: true })
  public enPassant?: string;

  @Field((returns) => Int, { nullable: true })
  public halfMove?: number;

  @Field((returns) => Int, { nullable: true })
  public fullMove?: number;
}

@ObjectType()
export class Algebraic{

  @Field(returns => Int)
  @prop({ required: true })
  public rank: number;

  @Field()
  @prop({ required: true })
  public file: string

}

@ObjectType()
export class ExecutedMove{
  @Field(returns => Algebraic)
  @prop({ required: true, type: Algebraic })
  public from: Algebraic

  @Field(returns => Algebraic)
  @prop({ required: true, type: Algebraic })
  public to: Algebraic

  @Field()
  @prop({ required: true })
  public pieceType: string

  @Field({ nullable: true })
  @prop()
  public causedCheck?: boolean
  

}

@InputType()
export class AlgebraicInput extends Algebraic{
  @Field(returns => Int)
  public rank: number;

  @Field()
  public file: string
}

@InputType()
export class ExecutedMoveInput extends ExecutedMove{
  @Field(returns => AlgebraicInput)
  public from: AlgebraicInput

  @Field(returns => AlgebraicInput)
  public to: AlgebraicInput

  @Field()
  public pieceType: string

  @Field({ nullable: true })
  public causedCheck?: boolean
}

@ObjectType()
export class Move {
  @Field()
  @prop({
    required: true,
    validate: {
      validator: (v: string) => {
        return /^([1-8PNBRQK]+\/){7}[1-8PNBRQK]+$/gim.test(v);
      },
      message: "Invalid FEN.",
    },
  })
  public fen: string;

  @Field((returns) => BoardOpts, { nullable: true })
  @prop({ type: BoardOpts, default: {} })
  public boardOpts?: BoardOpts;

  @Field((returns) => Takes)
  @prop({ required: true, default: { white: [], black: [] }, type: Takes })
  public takes: Takes;

  @Field(returns => ExecutedMove)
  @prop({ type: ExecutedMove })
  public executedMove: ExecutedMove

  
}

@ObjectType()
@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "games",
  },
})
export class Game {
  @Field((returns) => ID, { description: "MongoDB id for game." })
  readonly _id: Schema.Types.ObjectId;

  @Field({ description: "Date game was created at." })
  readonly createdAt: Date;

  @Field((returns) => [Move])
  @prop({ required: true, default: [], type: Move })
  public moves: Types.Array<Move>;

  @Field((returns) => Players)
  @prop({ type: Players, required: true })
  public playerIDs: Players;

  @Field(returns => Move, { nullable: true })
  public lastMove?: Move

  @Field()
  @prop({ required: true })
  public colorToMove: string;

  @Field()
  @prop({ required: true, default: "active"})
  public status: string
}

export default getModelForClass(Game);
