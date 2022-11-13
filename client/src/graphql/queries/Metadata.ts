import { gql } from "@apollo/client";
import type { DocumentNode } from "@apollo/client";

export const ProjectMetadataQuery : DocumentNode = gql`
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
`

export interface ProjectMetadataQueryResponse{
  projectMetadata: IMetadata[]
}

export const BlogMetadataQuery : DocumentNode = gql`
    query BlogMetadata($publishedOnly: Boolean){
        blogMetadata(publishedOnly: $publishedOnly){
            id
            name
            description
            published
            readTime
            category
            pathname
        }
    }
`

export interface BlogMetadataQueryResponse{
    blogMetadata: IMetadata[]
}

export interface BlogMetadataQueryVariables{
    publishedOnly?: boolean
}

export const MetadataQuery : DocumentNode = gql`
  query Metadata(
    $pathname: String,
    $metadataId: String
  ){
    metadata(
      pathname: $pathname,
      id: $metadataId
    ){
      name
      description
      published
      readTime
      category
      pathname
    }
  }
`

export interface MetadataQueryResponse{
  metadata: IMetadata
}

export interface MetadataQueryVariables{
  pathname?: string,
  metadataId?: string
}