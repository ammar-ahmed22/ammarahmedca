import React from 'react';
import PostContent from './PostContent';
import { Text, Box, Button, SkeletonText } from "@chakra-ui/react"
import { ArrowBackIcon } from "@chakra-ui/icons"

import { useNavigate, useLoaderData } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { BlogInfoVariableQuery, BlogInfoVariables } from '../../graphql/queries/BlogInfo';
import * as helper from "../../utils/helpers"
import { styles } from "./styles/index.styles";

const Post : React.FC = () => {
    
    const postName = useLoaderData() as string;
    const navigate = useNavigate();

    const handleBackClick = () => navigate("/blog");

    const { data, loading } = useQuery<BlogInfo, BlogInfoVariables>(BlogInfoVariableQuery, { variables: {name: decodeURIComponent(postName)}});

    return (
        <>
                {
                    loading && (
                        <Box mt="5vh">
                            <SkeletonText skeletonHeight={20} noOfLines={1} mb="4"/>
                            <SkeletonText skeletonHeight={4} noOfLines={1} mb="12"/>
                        </Box>
                    )
                }
                {
                    !loading && data && (
                        <Box my={5}>
                            <Button leftIcon={<ArrowBackIcon />} mt={4} variant="ghost" onClick={handleBackClick}>Back</Button>
                            <Text {...styles.title}>{data.BlogInfo[0].posts[0].name}</Text>
                            <Text {...styles.info}>{helper.displayTimeSince(data.BlogInfo[0].posts[0].published as string)} &bull; {data.BlogInfo[0].posts[0].readTime} min read</Text>

                        </Box>
                    )
                }
                {
                   !loading && data && <PostContent pageId={data.BlogInfo[0].posts[0].id} infoLoaded={!loading && !!data}/>
                }
        </>
    );
}

export default Post;
