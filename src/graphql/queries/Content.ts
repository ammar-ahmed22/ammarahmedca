import { gql } from "@apollo/client";
import { RICH_TEXT_FRAGMENTS } from "../fragments"; 
import { IBlock } from "@ammarahmedca/types";

export const ContentQuery = gql`
  query Content($pathname: String!) {
    content(pathname: $pathname) {
      type
      content {
        ... on Text {
          plainText
          href
          annotations {
            bold
            code
            color
            underline
            strikethrough
            italic
            language
          }
        }
        ... on Image {
          caption
          url
        }
      }
    }
  }
`;

export const BLOG_POST_QUERY = gql`
  query PostBySlug(
    $slug: String!
  ) {
    postBySlug(slug: $slug) {
      metadata {
        name
        date
        category
        tags
      }
      content {
        type
        content {
          ... on RichText {
            ...complete
          }
          ... on Image {
            url
            caption {
              ...complete
            }
          }
          ... on List {
            children {
              content {
                ...complete
              }
              children {
                content {
                  ...complete
                }
              }
            }
          }
          ... on Equation {
            expression
          }
        }
      }
    }
  }
  ${RICH_TEXT_FRAGMENTS}
`

export namespace BlogPostQuery{
  export interface Response{
    postBySlug: {
      metadata: {
        name: string,
        date: number,
        category: string,
        tags: string[]
      },
      content: IBlock[]
    }
  }

  export interface Variables{
    slug: string
  }
}

