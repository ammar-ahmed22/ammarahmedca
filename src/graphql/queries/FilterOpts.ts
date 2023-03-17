import { gql } from "@apollo/client";

export const PROJECT_FILTER_OPTIONS_QUERY = gql`
  query ProjectFilterOptions{
    projectFrameworks
    projectTypes
    projectLanguages
  }
`

export namespace ProjectFilterOptionsQuery{
  export interface Response{
    projectFrameworks: string[],
    projectTypes: string[],
    projectLanguages: string[]
  }
}
