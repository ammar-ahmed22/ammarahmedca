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
} from "type-graphql";
import { AuthPayload } from "../../utils/auth";
import GameModel, { BoardOptsInput, Game } from "../../models/Game";
import UserModel from "../../models/User";

@ArgsType()
class AddMoveArgs {
  @Field()
  public fen: string;

  @Field({ nullable: true })
  public boardOpts?: BoardOptsInput;

  @Field((returns) => [String], { nullable: true })
  public whiteTakes?: string[];

  @Field((returns) => [String], { nullable: true })
  public blackTakes?: string[];
}

@Resolver()
export class GameResolver {
  @Authorized()
  @Mutation((returns) => AuthPayload)
  async createGame(@Ctx() ctx: Context) {
    const user = await UserModel.findById(ctx.userId);
    const me = await UserModel.findOne({ email: "a353ahme@uwaterloo.ca" });

    if (!user || !me) throw new Error("Not found.");

    if (user.currentGameID)
      throw new Error("A game is active. Cannot create another.");

    const game = await GameModel.create({
      moves: [
        {
          fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",
          takes: { white: [], black: [] },
          colorToMove: "w",
        },
      ],
      playerIDs: {
        white: user._id,
        black: me._id,
      },
    });

    user.currentGameID = game._id;
    user.gameIDs.push(game._id);
    await user.save();

    return new AuthPayload({ id: user._id });
  }

  @Authorized()
  @Mutation((returns) => String)
  async addMove(
    @Ctx() ctx: Context,
    @Args() { fen, boardOpts, whiteTakes, blackTakes }: AddMoveArgs
  ) {
    const user = await UserModel.findById(ctx.userId);

    if (!user) throw new Error("Not found.");
    if (!user.currentGameID) throw new Error("No active game.");

    const game = await GameModel.findById(user.currentGameID);

    if (!game) throw new Error("Game not found.");

    const lastMove = game.moves[game.moves.length - 1];

    game.moves.push({
      fen,
      colorToMove: lastMove.colorToMove === "w" ? "b" : "w",
      takes: {
        white: lastMove.takes.white.concat(whiteTakes ?? []),
        black: lastMove.takes.black.concat(blackTakes ?? []),
      },
    });

    await game.save();

    return "move added!";
  }

  @Authorized()
  @Query(returns => Game)
  async game(
    @Ctx() ctx: Context,
    @Arg("gameId", { nullable: true }) gameId?: string
  ){
    if (gameId){
      const game = await GameModel.findById(gameId);

      if (!game) throw new Error("Game not found!")

      return game;
    }

    const user = await UserModel.findById(ctx.userId);

    if (!user) throw new Error("User not found!")

    if (!user.currentGameID) throw new Error("No active game!")

    const game = await GameModel.findById(user.currentGameID);

    if (!game) throw new Error("Current game not found!")

    return game;

  }
}
