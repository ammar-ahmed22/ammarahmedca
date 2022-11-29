import jwt from "jsonwebtoken";
import { AuthChecker, ObjectType, Field } from "type-graphql";

export const authChecker: AuthChecker<Context> = ({ context }): boolean =>
  !!context.userId;

const createJWT = (payload: string | object | Buffer): string => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1 year",
  });
};

@ObjectType()
export class AuthPayload {
  @Field()
  public token: string;

  constructor(payload: string | object | Buffer) {
    this.token = createJWT(payload);
  }
}
