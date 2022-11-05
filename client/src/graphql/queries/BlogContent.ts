import { gql, DocumentNode } from "@apollo/client";

export const BlogContentQuery : DocumentNode = gql`
    query($id: String!){
        BlogContent(id: $id){
            type
            content{
                ... on Text{
                    plain_text
                    annotations{
                        bold
                        code
                        color
                        underline
                        strikethrough
                        italic
                        language
                    }
                }
                ... on Image {
                    caption
                    url
                }
            }
        }
      }
`

export interface BlogContentQueryVariables{
  id: string
}