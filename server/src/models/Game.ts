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
  public enPasant?: string;

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
  public enPasant?: string;

  @Field((returns) => Int, { nullable: true })
  public halfMove?: number;

  @Field((returns) => Int, { nullable: true })
  public fullMove?: number;
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

  @Field()
  @prop({ required: true })
  public colorToMove: string;

  @Field((returns) => BoardOpts, { nullable: true })
  @prop({ type: BoardOpts, default: {} })
  public boardOpts?: BoardOpts;

  @Field((returns) => Takes)
  @prop({ required: true, default: { white: [], black: [] }, type: Takes })
  public takes: Takes;
}

@ObjectType()
@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "games",
  },
})
export class Game {
  @Field((returns) => [Move])
  @prop({ required: true, default: [], type: Move })
  public moves: Types.Array<Move>;

  @Field((returns) => Players)
  @prop({ type: Players, required: true })
  public playerIDs: Players;
}

export default getModelForClass(Game);
