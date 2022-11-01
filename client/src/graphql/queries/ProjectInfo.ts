import { gql } from "@apollo/client";
import type { DocumentNode } from "@apollo/client";

export const ProjectInfoQuery : DocumentNode = gql`
  query {
    ProjectInfo {
        id
        name
        lastEdited
        timeline
        type
        languages
        frameworks
        github
        external
        description
        isBlog
    }
  }
`