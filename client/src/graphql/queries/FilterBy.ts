import { gql } from "@apollo/client";
import type { DocumentNode } from "@apollo/client";

export const FilterByQuery : DocumentNode = gql`
   query {
            FilterBy {
                frameworks
                languages
                type
            }
        }
`