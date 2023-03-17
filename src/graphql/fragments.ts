import { gql } from "@apollo/client";

export const RICH_TEXT_FRAGMENTS = gql`
  fragment complete on RichText {
    plainText
    href
    annotations {
      ...all
    }
  }

  fragment all on Annotations {
    bold
    code
    color
    strikethrough
    underline
    italic
    language
  }
`;
