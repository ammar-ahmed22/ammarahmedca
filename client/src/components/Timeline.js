import React, { useState, useEffect } from 'react';
import { Box, Text, Flex, useColorModeValue, Skeleton, Button } from "@chakra-ui/react"
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { useQuery, gql } from '@apollo/client';
import DisplayLimiter from './DisplayLimiter';



const Timeline = () => {

    const GET_TIMELINE_INFO = gql`
        query {
            TimelineInfo {
                year
                yearData {
                    title
                    description
                }
            }
        }
    `

    const [yearsToDisplay, setYearsToDisplay] = useState(2);
    

    const { data, loading, error } = useQuery(GET_TIMELINE_INFO);


    

    const styleProps = {
        mainBox: {
            minH: "100vh",
            mt: "10vh"
        },
        title: {
            as: 'h3',
            fontSize: "6xl",
            fontFamily: "heading"
        },
        line: {
            position: "absolute",
            w: 1,
            h: "100%",
            bg: useColorModeValue("gray.800", "white"),
            top: "1rem",
            left: 3,
            zIndex: -1,
            transform: "translate(-6px, 0)"
        },
        bullet: {
            color: useColorModeValue("primaryLight", "primaryDark")
        },
        year: {
            as: "h4",
            fontSize: "4xl",
            fontFamily: "heading",
            mt: 5,
            mb: 3
        },
        event: {
            fontSize: "2xl",
            ml: 3,
            fontWeight: "bold",
        },
        eventContent: {
            ml: 3,
            fontWeight: "light"
        }
        
    }

    

    return (
        <Box {...styleProps.mainBox} id='timeline'>
            <Text {...styleProps.title}>My <Text as="span" color={useColorModeValue("primaryLight", "primaryDark")}>Life</Text> So Far</Text>
            
            {
                data && data.TimelineInfo.slice(0, yearsToDisplay).map( (item, idx) => {
                    return (
                        <Skeleton key={idx} isLoaded={!loading}>
                        <Box key={`year-${idx}`}>
                            <Text {...styleProps.year}>{item.year}</Text>

                            <Box >

                                {
                                    item.yearData.map( (content, conIdx) => {
                                        return (
                                            <Flex pb="5" key={`event-${item.year}-${conIdx}`} position="relative">
                                                { conIdx !== item.yearData.length - 1 && <Box {...styleProps.line}></Box>}
                                                <Text {...styleProps.bullet}><FontAwesomeIcon icon="circle"/></Text>
                                                <Box>
                                                    <Text {...styleProps.event} mb={ content.description ? 0 : 3}>{content.title}</Text>
                                                    {content.description && <Text {...styleProps.eventContent} mb={3}>{content.description}</Text>}
                                                </Box>
                                                
                                                
                                            </Flex>
                                        )
                                    })
                                }
                            </Box>
                        </Box>
                        </Skeleton>
                    )
                })
            }
            
            <Flex justify="center">
                {data && <DisplayLimiter numDisplaying={yearsToDisplay} setNumDisplaying={setYearsToDisplay} initial={2} total={data.TimelineInfo.length} incrementBy={2} scrollToId="timeline"/>}
            </Flex>
                
            
        </Box>
    );
}

export default Timeline;
