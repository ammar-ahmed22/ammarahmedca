import React from 'react';
import NavBar from './NavBar';
import PageContent from './PageContent';
import Footer from './Footer';
import { Text, Box, OrderedList, ListItem, Image, Flex, SkeletonText, Spinner, Skeleton } from "@chakra-ui/react"
import { useParams, useLocation} from "react-router-dom"
import { useQuery, gql } from "@apollo/client"
import * as helper from "../utils/helpers"

const BlogPost = () => {
    //console.log("post:", match)

    const { postName } = useParams();
    const { state } = useLocation();

    console.log({ postName, state })

    const GET_BLOG_POST_CONTENT = gql`
        query($id: String!){
            BlogContent(id: $id){
                type
                content
            }
        }
    `

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
            color: "primaryLight",
            as: "h1"
        },
        info: {
            fontSize: "md",
            as: "span",
            color: "gray.500"
        },
        h1: {
            fontSize: '4xl',
            fontFamily: "heading",
            fontWeight: "bold",
            as: "h2",
            mb: 2
        },
        h2: {
            fontSize: "3xl",
            fontFamily: "heading",
            fontWeight: "bold",
            as: "h3" ,
            mb: 2
        },
        h3: {
            fontSize: "2xl",
            fontFamily: "heading",
            fontWeight: "bold",
            as: "h4",
            mb: 2
        },
        p: {
            fontSize: "md",
            mb: 4,
            as: "p"
        },
        ol: {
            fontSize: "md",
            mb: 4,
            pl: 2
        }


    }

    const blogContent = useQuery(GET_BLOG_POST_CONTENT, {variables: {id: state.id}});
    const blogInfo = useQuery(GET_BLOG_INFO, { variables: {id: state.id}});

    const renderBlogContent = (item) => {
        //console.log(item)
        switch (item.type) {
            case "h1":
                return <Text {...styleProps.h1}>{item.content[0]}</Text>
                break;
            
            case "h2":
                return <Text {...styleProps.h2}>{item.content[0]}</Text>
                break;
            case "h3":
                return <Text {...styleProps.h3}>{item.content[0]}</Text>
                break;
            case "ol":
                return (
                    <OrderedList {...styleProps.ol}>
                        {
                            item.content.map( li => {
                                return <ListItem>{li}</ListItem>
                            })
                        }
                    </OrderedList>
                )
                break;
            case "p":
                return <Text {...styleProps.p}>{item.content[0]}</Text>
                break
            
            case "image":
                return (
                    <Flex align="center" justify="center" w="100%" direction="column" my={5}>
                        <Image 
                            objectFit="cover"
                            src={item.content[0]}
                            borderRadius="md"
                            boxShadow="lg"
                            mb="2"
                            fallback={<Spinner thickness='4px' speed="0.65s" emptyColor='gray.200' color="primaryLight" size="xl"/>}
                        />
                        <Text {...styleProps.info}>{item.content[1]}</Text>
                    </Flex>
                )
                break
            default:
                break;
        }
    }

    return (
        <>
            <NavBar active="blog"/>
            <PageContent>
                {
                    blogInfo.loading && blogContent.loading && !blogInfo.data && !blogContent.data && (
                        <Box mt="5vh">
                            <SkeletonText skeletonHeight={20} noOfLines={1} mb="4"/>
                            <SkeletonText skeletonHeight={4} noOfLines={1} mb="12"/>

                            <SkeletonText skeletonHeight={8} noOfLines={1} mb="4"/>
                            <SkeletonText noOfLines={7} mb="4"/>
                            <SkeletonText noOfLines={5} mb="4" />

                            <SkeletonText skeletonHeight={8} noOfLines={1} mb="4"/>
                            <SkeletonText noOfLines={5} mb="4" />
                        </Box>
                        
                    )
                }
                {
                    !blogInfo.loading && blogInfo.data && blogInfo.data.BlogInfo.map( item => {
                        //console.log(item)
                        return (<Box my={4}>
                            <Text {...styleProps.title}>{item.name}</Text>
                            <Text {...styleProps.info}>{helper.displayTimeSince(item.published)} &bull; {item.readTime} min read</Text>

                        </Box>)
                    })
                }
                {
                    !blogContent.loading && blogContent.data && !blogInfo.loading && blogInfo.data && blogContent.data.BlogContent.map( item => {
                        return renderBlogContent(item)
                    })
                }
                

            </PageContent>
            <Footer />
        </>
    );
}

export default BlogPost;
