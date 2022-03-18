import React from 'react';
import {useQuery, gql} from "@apollo/client"
import { Text, OrderedList, ListItem, Flex, Image, Box, SkeletonText, Spinner, useColorModeValue } from "@chakra-ui/react"

const BlogContent = ({ pageId, infoLoaded }) => {

    const GET_BLOG_POST_CONTENT = gql`
        query($id: String!){
            BlogContent(id: $id){
                type
                content
            }
        }
    `

    const { data, loading, error } = useQuery(GET_BLOG_POST_CONTENT, {variables: { id: pageId }})

    const styleProps = {
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
        },
        imageBox:{
            align: "center",
            justify: "center",
            direction: "column",
            my: 5,
        },
        image: {
            objectFit: "cover",
            borderRadius: "md",
            boxShadow: "lg",
            mb: 2,
            fallback: <Spinner thickness='4px' speed="0.65s" emptyColor='gray.200' color={useColorModeValue("primaryLight", "primaryDark")} size="xl" />
        },
        imageCaption:{
            fontSize: "sm",
            color: "gray.500"
        }

    }

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
                    <Flex {...styleProps.imageBox}>
                        <Image 
                            {...styleProps.image}
                            src={item.content[0]}

                        />
                        <Text {...styleProps.imageCaption}>{item.content[1]}</Text>
                    </Flex>
                )
                break
            default:
                break;
        }
    }

    if (!loading && data && infoLoaded){
        return (
            <>
                {
                    data.BlogContent.map((block, idx) => {
                        return renderBlogContent(block)
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
