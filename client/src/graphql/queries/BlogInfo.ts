import { gql, DocumentNode } from "@apollo/client"

export const BlogInfoQuery : DocumentNode = gql`
        query {
            BlogInfo{
                category
                posts{
                    id
                    name
                    description
                    published
                    readTime
                    category
                }
            }
            
        }
`

export interface BlogInfoVariables{
    name: string
}

export const BlogInfoVariableQuery : DocumentNode = gql`
    query($name: String!){
        BlogInfo(name: $name){
            posts{
                id
                name
                readTime
                published
            }
        }
    }
`