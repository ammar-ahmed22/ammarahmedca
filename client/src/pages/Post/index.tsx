import React from 'react';
import PostContent from './PostContent';
import { Text, Box, Button, SkeletonText } from "@chakra-ui/react"
import { ArrowBackIcon } from "@chakra-ui/icons"

import { useNavigate, useLoaderData } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { MetadataQuery, MetadataQueryResponse, MetadataQueryVariables } from '../../graphql/queries/Metadata';
import * as helper from "../../utils/helpers"
import { styles } from "./styles/index.styles";

const Post : React.FC = () => {
    
    const postName = useLoaderData() as string;
    const navigate = useNavigate();

    const handleBackClick = () => navigate("/blog");

    const { data, loading } = useQuery<MetadataQueryResponse, MetadataQueryVariables>(MetadataQuery, { variables: {pathname: postName}});

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
                            <Text {...styles.title}>{data.metadata.name}</Text>
                            <Text {...styles.info}>{helper.displayTimeSince(data.metadata.published as number)} &bull; {data.metadata.readTime} min read</Text>

                        </Box>
                    )
                }
                {
                   !loading && data && <PostContent pathname={data.metadata.pathname as string} infoLoaded={!loading && !!data}/>
                }
        </>
    );
}

export default Post;
