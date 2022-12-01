import crypto from "crypto";
import {
  Resolver,
  Mutation,
  Arg,
  Query,
  Authorized,
  Ctx,
  Int,
} from "type-graphql";
import UserModel, { RegisterInput, User, UpdateInput } from "../../models/User";
import { AuthPayload } from "../../utils/auth";
import transporter, { readHTML, insertParams } from "../../utils/mail";

@Resolver()
export class UserResolver {
  constructor(private mailer = transporter) {}

  private sendConfirmationCodeEmail = async (code: number, email: string) => {
    const html = readHTML("../emails/confirmation-code.html");
    const updated = insertParams(html, { confirmationCode: code });
    await this.mailer.sendMail({
      from: "Ammar Ahmed <ammar@ammarahmed.ca>",
      to: email,
      subject: "Confirm your email for ammarahmed.ca",
      text: "Plain text is not supported yet :(",
      html: updated,
    });
    console.log("confirm email sent to:", email);
  };

  private sendResetPasswordEmail = async (token: string, email: string) => {
    const html = readHTML("../emails/reset-password.html");
    const updated = insertParams(html, {
      resetLink:
        process.env.NODE_ENV === "production"
          ? `https://ammarahmed.ca/chess/reset-password/${token}`
          : `http://localhost:3000/chess/reset-password/${token}`,
    });
    await this.mailer.sendMail({
      from: "Ammar Ahmed <ammar@ammarahmed.ca>",
      to: email,
      subject: "Reset password for ammarahmed.ca",
      text: "Plain text is not supported yet :(",
      html: updated,
    });

    console.log("reset pass email sent to:", email);
  };

  @Mutation((returns) => AuthPayload)
  async register(@Arg("data") data: RegisterInput) {
    const existing = await UserModel.findOne({ email: data.email });

    if (existing) {
      throw new Error("User already exists.");
    }

    const user = await UserModel.create(data);
    const code = await user.createEmailConfirmationCode();

    await this.sendConfirmationCodeEmail(code, user.email);

    return new AuthPayload({ id: user.id });
  }

  @Authorized()
  @Mutation((returns) => AuthPayload)
  async newEmailCode(@Ctx() ctx: Context) {
    const user = await UserModel.findById(ctx.userId);

    if (!user) throw new Error("Not found.");

    const code = await user.createEmailConfirmationCode();
    await this.sendConfirmationCodeEmail(code, user.email);

    return new AuthPayload({ id: user._id });
  }

  @Authorized()
  @Mutation((returns) => AuthPayload)
  async confirmEmail(
    @Ctx() ctx: Context,
    @Arg("code", (type) => Int) code: number
  ) {
    const user = await UserModel.findById(ctx.userId);

    if (!user) throw new Error("Not found");

    if (user.emailConfirmed) return new AuthPayload({ id: user._id });

    if (!user.emailConfirmationCode || !user.emailConfirmationCodeExpire)
      throw new Error("No code.");

    if (user.emailConfirmationCode !== code) throw new Error("Invalid code.");
    if (user.emailConfirmationCodeExpire <= new Date(Date.now()))
      throw new Error("Code expired.");

    user.emailConfirmed = true;
    await user.save();

    return new AuthPayload({ id: user._id });
  }

  @Mutation((returns) => AuthPayload)
  async login(@Arg("email") email: string, @Arg("password") password: string) {
    const user = await UserModel.findOne({ email }).select("+password");
    const errorMsg = "Invalid credentials. Check email or password.";

    if (!user) {
      throw new Error(errorMsg);
    }

    const match = await user.matchPasswords(password);

    if (!match) {
      throw new Error(errorMsg);
    }

    return new AuthPayload({ id: user._id });
  }

  @Mutation((returns) => String)
  async forgotPassword(@Arg("email") email: string) {
    const user = await UserModel.findOne({ email });

    if (!user) throw new Error("Account not found.");

    const token = await user.getResetPasswordToken();
    await this.sendResetPasswordEmail(token, user.email);

    return "Reset password email sent to: " + user.email;
  }

  @Mutation((returns) => String)
  async resetPassword(
    @Arg("newPassword") newPassword: string,
    @Arg("token") token: string
  ) {
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const user = await UserModel.findOne({ resetPasswordToken: tokenHash });

    if (!user) throw new Error("Not found.");

    if (user.resetPasswordExpire && user.resetPasswordExpire <= new Date())
      throw new Error("Token expired.");

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    user.password = newPassword;
    await user.save();

    return "Password reset successfully.";
  }

  @Authorized()
  @Query((returns) => User)
  async user(@Ctx() ctx: Context) {
    const user = await UserModel.findById(ctx.userId);
    if (!user) throw new Error("Not found!");
    return user;
  }

  @Authorized()
  @Mutation((returns) => AuthPayload)
  async updateUser(@Ctx() ctx: Context, @Arg("data") data: UpdateInput) {
    const user = await UserModel.findById(ctx.userId);

    if (!user) throw new Error("Not found");

    Object.keys(data).forEach((key) => {
      let k = key as keyof UpdateInput;

      if (data[k] !== undefined) {
        user[k] = data[k] as string;
      }
    });

    await user.save();

    return new AuthPayload({ id: user._id });
  }

  @Authorized()
  @Query((returns) => User)
  async getUserByID(@Arg("userId") userId: string) {
    const user = await UserModel.findById(userId);

    if (!user) throw new Error("Not found!");

    return user;
  }
}
