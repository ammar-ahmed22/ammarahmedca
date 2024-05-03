import { gql } from '@apollo/client'
import type { DocumentNode } from '@apollo/client'
import { RICH_TEXT_FRAGMENTS } from '../fragments'
import { IExperience } from '@ammarahmedca/types'

export const EXPERIENCE_QUERY: DocumentNode = gql`
  query Experiences {
    experiences {
      company
      role
      description {
        ...complete
      }
      type
      skills
      timeframe {
        start
        end
      }
    }
  }
  ${RICH_TEXT_FRAGMENTS}
`

export namespace ExperienceQuery {
  export interface Response {
    experiences: IExperience[]
  }
}
