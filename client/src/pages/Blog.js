import React from 'react';
import NavBar from '../components/NavBar';
import PageContent from '../components/PageContent';
import Footer from '../components/Footer';
import Card from '../components/Card';
import { Text } from "@chakra-ui/react";
import { useQuery, gql } from "@apollo/client";

const Blog = ({ match }) => {
    console.log("page", match)

    const GET_PROJ_INFO = gql`
        query ($onlyHasContent: Boolean){
            ProjectInfo(onlyHasContent: $onlyHasContent){
                id
                name
                description
            }
        }
    `

    const projResp = useQuery(GET_PROJ_INFO, { variables: {onlyHasContent: true}});

    

    return (
        <>
            <NavBar active="blog"/>
            <PageContent>
                <Text fontSize="6xl" fontFamily="heading" as="h1">My <Text as="span" color="primaryLight">Journal</Text></Text>
                <Text fontSize='lg' >Sometimes I like to write about things I've worked on, my experiences or anything else of interest to me. Check it out!</Text>
                {
                    !projResp.loading && projResp.data && projResp.data.ProjectInfo.map( item => {
                        return (
                            <Card isLink to="/blog/test">
                                <Text>{item.name}</Text>
                            </Card>
                        )
                    })
                }
            </PageContent>
            <Footer />
        </>
    );
}

export default Blog;
