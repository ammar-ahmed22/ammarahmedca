import { gql } from "@apollo/client";


export const FilterOptsQuery = gql`
  query{
    filterOpts{
      type
      languages
      frameworks
    }
  }
`

export interface FilterOptsResponse{
  filterOpts: Omit<IFilterOpts, "category">
}