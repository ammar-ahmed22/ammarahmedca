import { gql } from "@apollo/client";

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

export interface ContentQueryVariables {
  pathname: string;
}

export interface ContentQueryResponse {
  content: IContent[];
}
