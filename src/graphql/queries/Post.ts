import { gql } from '@apollo/client'
import { RICH_TEXT_FRAGMENTS } from '../fragments'
import type { IBlock, IPostMetadata } from '@ammarahmedca/types'

export const POST_METADATA_BY_SLUG = gql`
  ${RICH_TEXT_FRAGMENTS}
  query postMetadataBySlug($slug: String!) {
    postBySlug(slug: $slug) {
      metadata {
        category
        date
        description {
          ...complete
        }
        id
        image
        name
        slug
        tags
      }
    }
  }
`

export namespace PostMetadataBySlug {
  export interface Response {
    postBySlug: {
      metadata: IPostMetadata
    }
  }

  export interface Variables {
    slug: string
  }
}

export const POST_CONTENT_BY_SLUG = gql`
  ${RICH_TEXT_FRAGMENTS}
  query postContentBySlug($slug: String!) {
    postBySlug(slug: $slug) {
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
`

export namespace PostContentBySlug {
  export interface Response {
    postBySlug: {
      content: IBlock[]
    }
  }

  export interface Variables {
    slug: string
  }
}
