import { gql } from "@apollo/client";
import type { DocumentNode } from "@apollo/client";

export const ExperienceQuery: DocumentNode = gql`
  query Experiences {
    experiences {
      company
      role
      description {
        plainText
        annotations {
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
`;

export interface ExperienceQueryResponse {
  experiences: IExperience[];
}
