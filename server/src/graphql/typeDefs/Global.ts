import "reflect-metadata";
import { ObjectType, Field } from "type-graphql";

@ObjectType({ description: "Object containing properties for rich text." })
class Annotations implements IAnnotations {
  @Field({ description: "Bold text." })
  bold: boolean;

  @Field({ description: "Underlined text." })
  underline: boolean;

  @Field({ description: "Text with a line through it." })
  strikethrough: boolean;

  @Field({ description: "Inline code text." })
  code: boolean;

  @Field({ description: "Italicized text." })
  italic: boolean;

  @Field({ description: "Colored text." })
  color: string;

  @Field({ nullable: true, description: "Name of language for code block." })
  language?: string;
}

@ObjectType({ description: "Object containing text properties." })
export class Text implements IText {
  @Field({ description: "Text content for rich text." })
  plainText: string;

  @Field((type) => Annotations, { description: "Rich text annotations." })
  annotations: Annotations;
}

@ObjectType({ description: "Object containing image properties." })
export class Image implements IImage {
  @Field({ description: "Image url." })
  url: string;

  @Field({ description: "Image caption." })
  caption: string;
}
