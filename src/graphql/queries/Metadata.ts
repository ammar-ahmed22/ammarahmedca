import { gql } from "@apollo/client";
import type { DocumentNode } from "@apollo/client";
import { RICH_TEXT_FRAGMENTS } from "../fragments";
import { IPostMetadata } from "@ammarahmedca/types";

export const ProjectMetadataQuery: DocumentNode = gql`
  query {
    projectMetadata {
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
`;

export interface ProjectMetadataQueryResponse {
  projectMetadata: IMetadata[];
}

export const BLOG_METADATA_QUERY: DocumentNode = gql`
  query BlogMetadata(
    $tags: [String!], 
    $category: String, 
    $onlyPublished: Boolean
  ) {
    blogMetadata(
      tags: $tags, 
      category: $category, 
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

export namespace BlogMetadataQuery{
  export interface Response{
    blogMetadata: IPostMetadata[]
  }

  export interface Variables{
    onlyPublished?: boolean,
    tags?: string[],
    category?: string
  }
}

export interface BlogMetadataQueryResponse {
  blogMetadata: IMetadata[];
}

export interface BlogMetadataQueryVariables {
  publishedOnly?: boolean;
}

export const MetadataQuery: DocumentNode = gql`
  query Metadata($pathname: String, $metadataId: String) {
    metadata(pathname: $pathname, id: $metadataId) {
      name
      description
      published
      readTime
      category
      pathname
    }
  }
`;

export interface MetadataQueryResponse {
  metadata: IMetadata;
}

export interface MetadataQueryVariables {
  pathname?: string;
  metadataId?: string;
}
