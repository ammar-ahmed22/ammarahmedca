import "reflect-metadata"
import { ObjectType, Field, Int, createUnionType } from "type-graphql"

@ObjectType({ description: "Metadata model for blog and project posts" })
export class Metadata implements IMetadata{
  @Field({ description: "ID of the page in Notion."})
  id: string

  @Field({ description: "Timestamp when page was last edited."})
  lastEdited: Date

  @Field({ description: "Name of the page entry."})
  name: string

  @Field({ nullable: true, description: "Pathname for blog posts."})
  pathname?: string

  @Field({ nullable: true, description: "Month year string for project posts." })
  timeline?: string

  @Field(type => [String], { nullable: true, description: "List of types for project or blog post."})
  type?: string[]

  @Field(type => [String], { nullable: true, description: "Programming languages used for project or blog post."})
  languages?: string[]

  @Field(type => [String], { nullable: true, description: "Frameworks used for project or blog post."})
  frameworks?: string[]

  @Field({ nullable: true, description: "GitHub link for project or blog post." })
  github?: string

  @Field({ nullable: true, description: "External link for project or blog post." })
  external?: string

  @Field({ nullable: true, description: "Description for project or blog post." })
  description?: string

  @Field({ nullable: true, description: "Published date for project or blog post." })
  published?: string

  @Field({ nullable: true, description: "Boolean for blog post." })
  isBlog?: boolean

  @Field({ nullable: true, description: "Boolean for project post." })
  isProject?: boolean

  @Field(type => Int, { nullable: true, description: "Read time in minutes for blog post." })
  readTime?: number

  @Field({ nullable: true, description: "Category for blog post." })
  category?: string

  @Field({ nullable: true, description: "Boolean to show blog post." })
  isPublished?: boolean

}

@ObjectType()
class Annotations implements IAnnotations{
  @Field({ description: "Bold text."})
  bold: boolean

  @Field({ description: "Underlined text."})
  underline: boolean

  @Field({ description: "Text with a line through it."})
  strikethrough: boolean

  @Field({ description: "Inline code text."})
  code: boolean

  @Field({ description: "Italicized text."})
  italic: boolean

  @Field({ description: "Colored text."})
  color: string

  @Field({ nullable: true, description: "Name of language for code block." })
  language?: string
}

@ObjectType()
export class Text implements IText{
  @Field({ description: "Text content for rich text."})
  plainText: string
  
  @Field(type => Annotations, { description: "Rich text annotations."})
  annotations: Annotations
}

@ObjectType()
export class Image implements IImage{
  @Field({ description: "Image url."})
  url: string

  @Field({ description: "Image caption."})
  caption: string
}

const TextOrImage = createUnionType({
  name: "TextOrImage",
  description: "Text or Image union type for content blocks.",
  types: () => [Text, Image] as const,
  // our implementation of detecting returned object type
  resolveType: value => {
    if ("plainText" in value && "annotations" in value) {
      return Text; 
    }
    if ("url" in value && "caption" in value) {
      return Image; 
    }
    return undefined;
  },
});

@ObjectType({ description: "Content block for blog." })
export class Content implements IContent{
  @Field()
  type: string

  @Field(type => [TextOrImage])
  content: TextOrImageType[] 
}

