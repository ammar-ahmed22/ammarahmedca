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