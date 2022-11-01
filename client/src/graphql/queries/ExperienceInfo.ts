import { gql } from "@apollo/client";
import type { DocumentNode } from "@apollo/client";

export const ExperienceInfoQuery : DocumentNode = gql`
  query {
    ExperienceInfo{
        company
        role
        description{
            plain_text
            annotations{
                bold
                code
                color
                underline
                strikethrough
                italic
            }
        }
        type
        skills
        timeframe {
            start
            end
        }
    }
  }
`