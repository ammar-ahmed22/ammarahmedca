import {
  Resolver,
  Mutation,
  Arg,
  Query,
  Authorized,
  Ctx,
  Int,
  ArgsType,
  Field,
  Args,
  FieldResolver,
  Root,
} from "type-graphql";
import { AuthPayload } from "../../utils/auth";
import GameModel, { BoardOptsInput, Game, ExecutedMoveInput } from "../../models/Game";
import UserModel from "../../models/User";

@ArgsType()
class AddMoveArgs {
  @Field()
  public fen: string;

  @Field(returns => ExecutedMoveInput)
  executedMove: ExecutedMoveInput

  @Field({ nullable: true })
  public boardOpts?: BoardOptsInput;

  @Field((returns) => [String], { nullable: true })
  public whiteTakes?: string[];

  @Field((returns) => [String], { nullable: true })
  public blackTakes?: string[];
}

@Resolver(of => Game)
export class GameResolver {
  @Authorized()
  @Mutation(returns => AuthPayload)
  async createGame(@Ctx() ctx: Context) {
    const user = await UserModel.findById(ctx.userId);
    const me = await UserModel.findOne({ email: "a353ahme@uwaterloo.ca" });

    if (!user || !me) throw new Error("Not found.");

    if (user.currentGameID)
      throw new Error("A game is active. Cannot create another.");

    const game = await GameModel.create({
      playerIDs: {
        white: user._id,
        black: me._id,
      },
    });

    user.currentGameID = game._id;
    user.gameIDs.push(game._id);
    me.gameIDs.push(game._id);
    await user.save();
    await me.save();

    return new AuthPayload({ id: user._id });
  }

  @Authorized()
  @Mutation(returns => String)
  async addMove(
    @Ctx() ctx: Context,
    @Args() { fen, boardOpts, whiteTakes, blackTakes, executedMove }: AddMoveArgs
  ) {
    const user = await UserModel.findById(ctx.userId);

    if (!user) throw new Error("Not found.");
    if (!user.currentGameID) throw new Error("No active game.");

    const game = await GameModel.findById(user.currentGameID);

    if (!game) throw new Error("Game not found.");

    // no last move = first move
    const lastMove = game.moves[game.moves.length - 1];

    game.moves.push({
      fen,
      colorToMove: lastMove ? (lastMove.colorToMove === "w" ? "b" : "w") : "b",
      takes: {
        white: lastMove ? lastMove.takes.white.concat(whiteTakes ?? []) : [],
        black: lastMove ? lastMove.takes.black.concat(blackTakes ?? []) : [],
      },
      executedMove
    });

    await game.save();

    return "move added!";
  }

  @Authorized()
  @Query(returns => Game)
  async game(
    @Ctx() ctx: Context,
    @Arg("gameId", { nullable: true }) gameId?: string
  ) {
    if (gameId) {
      const game = await GameModel.findById(gameId);

      if (!game) throw new Error("Game not found!");

      return game;
    }

    const user = await UserModel.findById(ctx.userId);

    if (!user) throw new Error("User not found!");

    if (!user.currentGameID) throw new Error("No active game!");

    const game = await GameModel.findById(user.currentGameID).lean().exec();

    if (!game) throw new Error("Current game not found!");

    return game;
  }

  @FieldResolver(of => Game)
  lastMove(@Root() game: Game){
    return game.moves[game.moves.length - 1];
  }
}
