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
  ObjectType,
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

  @Field((returns) => [String])
  public whiteTakes: string[];

  @Field((returns) => [String])
  public blackTakes: string[];

  @Field()
  public gameID: string
}

@ObjectType()
class CreateGameResponse{
  @Field()
  gameID: string
}

@Resolver(of => Game)
export class GameResolver {
  @Authorized()
  @Mutation(returns => CreateGameResponse)
  async createGame(@Ctx() ctx: Context) {
    const user = await UserModel.findById(ctx.userId);
    const me = await UserModel.findOne({ email: "a353ahme@uwaterloo.ca" });

    if (!user || !me) throw new Error("Not found.");

    // if (user.currentGameID)
    //   throw new Error("A game is active. Cannot create another.");

    const game = await GameModel.create({
      colorToMove: "w",
      playerIDs: {
        white: user._id,
        black: me._id,
      },
    });

    // user.currentGameID = game._id;
    user.gameIDs.push(game._id);
    me.gameIDs.push(game._id);
    await user.save();
    await me.save();

    console.log("game created with id:", game._id);
    return { gameID: game._id };
  }

  @Authorized()
  @Mutation(returns => AuthPayload)
  async addMove(
    @Ctx() ctx: Context,
    @Args() { fen, boardOpts, whiteTakes, blackTakes, executedMove, gameID }: AddMoveArgs
  ) {
    const user = await UserModel.findById(ctx.userId);

    if (!user) throw new Error("Not found.");
    if (!user.gameIDs.includes(gameID)) throw new Error("Game not available.")
    // if (!gameID && !user.currentGameID) throw new Error("No active game.");

    const game = await GameModel.findById(gameID);

    if (!game) throw new Error("Game not found.");

    // no last move = first move
    const lastMove = game.moves[game.moves.length - 1];

    game.moves.push({
      fen,
      // colorToMove: lastMove ? (lastMove.colorToMove === "w" ? "b" : "w") : "b",
      takes: {
        white: whiteTakes,
        black: blackTakes,
      },
      executedMove
    });
    game.colorToMove = game.colorToMove === "w" ? "b" : "w";

    await game.save();

    return new AuthPayload({ id: user._id });
  }

  @Authorized()
  @Query(returns => Game)
  async game(
    @Ctx() ctx: Context,
    @Arg("gameID") gameID: string
  ) {
    
    const game = await GameModel.findById(gameID).lean().exec();

    if (!game) throw new Error("Game not found!");

    return game;
    
  }

  @Authorized()
  @Query(returns => [Game])
  async games (
    @Ctx() ctx: Context,
  ){

    const user = await UserModel.findById(ctx.userId);

    if (!user) throw new Error("User not found.")

    const { gameIDs } = user;

    const result = await Promise.all(gameIDs.map( async (gid) => {
      const game = await GameModel.findById(gid).lean().exec();
      return game;
    }))

    return result;
  }

  @FieldResolver(of => Game)
  lastMove(@Root() game: Game){
    return game.moves[game.moves.length - 1];
  }
}
