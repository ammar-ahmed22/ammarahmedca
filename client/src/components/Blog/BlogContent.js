import React from 'react';
import {useQuery, gql} from "@apollo/client"
import { Box, SkeletonText } from "@chakra-ui/react"
import BlogBlock from './BlogBlock';

// Pulls blocks for a blog post and renders the blog content
const BlogContent = ({ pageId, infoLoaded }) => {

    const GET_BLOG_POST_CONTENT = gql`
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

    const { data, loading, error } = useQuery(GET_BLOG_POST_CONTENT, {variables: { id: pageId }})

    

    if (!loading && data && infoLoaded){
        return (
            <>
                {
                    data.BlogContent.map((block, idx) => {
                        return <BlogBlock type={block.type} content={block.content} idx={idx}/>
                    })
                }

            </>
        );
    }else{
        return (
            <Box mt="5vh">
                <SkeletonText skeletonHeight={20} noOfLines={1} mb="4"/>
                <SkeletonText skeletonHeight={4} noOfLines={1} mb="12"/>

                <SkeletonText skeletonHeight={8} noOfLines={1} mb="4"/>
                <SkeletonText noOfLines={7} mb="4"/>
                <SkeletonText noOfLines={5} mb="4" />

                <SkeletonText skeletonHeight={8} noOfLines={1} mb="4"/>
                <SkeletonText noOfLines={5} mb="4" />
            </Box>
        );
    }

}

export default BlogContent;
