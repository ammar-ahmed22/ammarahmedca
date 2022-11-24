import { Resolver, Mutation, Arg, Query, Authorized, Ctx } from "type-graphql";

import UserModel, { RegisterInput, User, UpdateInput } from "../../models/User";
import { AuthPayload } from "../../utils/auth";


@Resolver()
export class UserResolver{

  @Mutation(returns => AuthPayload)
  async register(
    @Arg("data") data : RegisterInput
  ){

    const existing = await UserModel.findOne({ email: data.email });

    if (existing){
      throw new Error("User already exists.")
    }

    const user = await UserModel.create(data);

    return new AuthPayload({ id: user.id });
  }

  @Mutation(returns => AuthPayload)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ){

    const user = await UserModel.findOne({ email }).select("+password");
    const errorMsg = "Invalid credentials. Check email or password."

    if (!user){
      throw new Error(errorMsg)
    }

    const match = await user.matchPasswords(password);

    if (!match){
      throw new Error(errorMsg)
    }

    return new AuthPayload({ id: user._id });

  }

  @Authorized()
  @Query(returns => User)
  async user(
    @Ctx() ctx: Context
  ){
    const user = await UserModel.findById(ctx.userId);
    return user;
  }

  @Authorized()
  @Mutation(returns => AuthPayload)
  async updateUser(
    @Ctx() ctx: Context,
    @Arg('data') data: UpdateInput
  ){
    const user = await UserModel.findById(ctx.userId);

    if (!user) throw new Error("Not found")

    if (data.email) user.email = data.email;
    if (data.firstName) user.firstName = data.firstName;
    if (data.lastName) user.lastName = data.lastName;
    if (data.middleName) user.middleName = data.middleName;
    if (data.company) user.company = data.company;
    if (data.position) user.position = data.position;
    if (data.foundBy) user.foundBy = data.foundBy;

    await user.save();

    return new AuthPayload({ id: user._id });
  }
}