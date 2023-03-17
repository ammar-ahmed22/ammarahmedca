import { gql } from "@apollo/client";
import type { DocumentNode } from "@apollo/client";
import { RICH_TEXT_FRAGMENTS } from "../fragments";
import { IPostMetadata, IProjectMetadata } from "@ammarahmedca/types";

export const PROJECT_METADATA_QUERY = gql`
  query ProjectMetadata(
    $type: [String!]
    $frameworks: [String!]
    $languages: [String!]
    $onlyPublished: Boolean
  ) {
    projectMetadata(
      type: $type
      frameworks: $frameworks
      languages: $languages
      onlyPublished: $onlyPublished
    ) {
      name
      dateRange {
        start
        end
      }
      description {
        ...complete
      }
      external
      frameworks
      github
      id
      languages
      type
    }
  }
  ${RICH_TEXT_FRAGMENTS}
`;

export namespace ProjectMetadataQuery {
  export interface Response {
    projectMetadata: IProjectMetadata[];
  }

  export interface Variables {
    type?: string[];
    languages?: string[];
    frameworks?: string[];
    onlyPublished?: boolean;
  }
}

export const BLOG_METADATA_QUERY: DocumentNode = gql`
  query BlogMetadata(
    $tags: [String!]
    $category: String
    $onlyPublished: Boolean
  ) {
    blogMetadata(
      tags: $tags
      category: $category
      onlyPublished: $onlyPublished
    ) {
      id
      name
      slug
      category
      date
      description {
        ...complete
      }
      image
      tags
    }
  }
  ${RICH_TEXT_FRAGMENTS}
`;

export namespace BlogMetadataQuery {
  export interface Response {
    blogMetadata: IPostMetadata[];
  }

  export interface Variables {
    onlyPublished?: boolean;
    tags?: string[];
    category?: string;
  }
}
