import "reflect-metadata";
import { Field, Int, ObjectType } from "type-graphql";
import { Text } from "./Global";

// EXPERIENCE
@ObjectType({
  description: "Duration of experience (null end means currently active)",
})
export class Timeframe implements ITimeframe {
  @Field({ description: "Start of experience." })
  start: Date;

  @Field({ nullable: true, description: "End of experience." })
  end?: Date;
}

@ObjectType({ description: "Experience information." })
export class Experience implements IExperience {
  @Field({ description: "Company experience is for." })
  company: string;

  @Field({ description: "Role at company." })
  role: string;

  @Field((type) => [Text], { description: "Description of experience." })
  description: IText[];

  @Field({ description: "Type/Field of experience." })
  type: string;

  @Field((type) => [String], {
    description: "Skills learned/employed at experience.",
  })
  skills: string[];

  @Field((type) => Timeframe, { description: "Duration of experience." })
  timeframe: ITimeframe;
}

@ObjectType({ description: "Skill information." })
export class Skill implements ISkill {
  @Field({ description: "Name of skill." })
  name: string;

  @Field({ description: "Type categorization of skill." })
  type: string;

  @Field((type) => Int, { description: "Competency in skill out of 100." })
  value: number;
}
