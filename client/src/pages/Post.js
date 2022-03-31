import React from 'react';
import NavBar from '../components/NavBar';
import PageContent from '../components/PageContent';
import Footer from '../components/Footer';
import BlogContent from '../components/Blog/BlogContent';
import { Text, Box, useColorModeValue, Link, Button, IconButton } from "@chakra-ui/react"
import { ChevronLeftIcon, ArrowBackIcon } from "@chakra-ui/icons"
import { Link as ReactLink } from "react-router-dom"
import { useParams, useLocation} from "react-router-dom"
import { useQuery, gql } from "@apollo/client"
import * as helper from "../utils/helpers"

const Post = ({ history }) => {
    

    const { postName } = useParams();
    const { state } = useLocation();

    const handleBackClick = e => {
        e.preventDefault()
        history.push("/blog")
    }

    

    

    const GET_BLOG_INFO = gql`
        query($id: String!){
            BlogInfo(id: $id){
                name
                readTime
                published
            }
        }
    `

    const styleProps = {
        title: {
            fontSize: "7xl",
            fontFamily: "heading",
            fontWeight: "bold",
            color: useColorModeValue("primaryLight", "primaryDark"),
            as: "h1"
        },
        info: {
            fontSize: "md",
            as: "span",
            color: "gray.500"
        },
    }

    
    const { data, loading, error } = useQuery(GET_BLOG_INFO, { variables: {id: state.id}});

    

    return (
        <>
            <NavBar active="blog"/>
            <PageContent>
                
                {
                    !loading && data && data.BlogInfo.map( item => {
                        //console.log(item)
                        return (
                        <Box my={5}>
                            <Button leftIcon={<ArrowBackIcon />} mt={4} variant="ghost" onClick={handleBackClick}>Back</Button>
                            <Text {...styleProps.title}>{item.name}</Text>
                            <Text {...styleProps.info}>{helper.displayTimeSince(item.published)} &bull; {item.readTime} min read</Text>

                        </Box>)
                    })
                }
                <BlogContent pageId={state.id} infoLoaded={!loading && data}/>
                

            </PageContent>
            <Footer />
        </>
    );
}

export default Post;
