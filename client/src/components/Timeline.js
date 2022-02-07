import React from 'react';
import { Box, Text, Flex, useColorModeValue } from "@chakra-ui/react"
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';



const Timeline = () => {


    const timeLineDataByYear = [
        {
            year: 2001,
            items: [
                {
                    title: "A little brown boy was born in Regina, Saskatchewan (me)"
                }
            ]
        },
        {
            year: 2013,
            items: [
                {
                    title: "Started Hifz (Memorization of Quran)",
                    content: "Left school to memorize the Holy Quran full-time while doing academic schooling from home."
                }
            ]
        },
        {
            year: 2016,
            items: [
                {
                    title: "Completed Hifz",
                    content: "Successfully memorized the Holy Quran (850 pages), an immense honor in Islam."    
                },
                {
                    title: "Started highschool"
                }
            ],
            
        },
        {
            year: 2020,
            items: [
                {
                    title: "Graduated highschool"
                },
                {
                    title: "Accepted into the University of Waterloo's highly competitive engineering program."
                },
                {
                    title: "Wrote my first line of code",
                    content: "Python to start off with, wrote a function to solve the quadratic formula"
                },
                {
                    title: "Started my first collaborative coding project",
                    content: "Initiated a team of 7 fellow incoming first-years to create a resource website for applicants to the University of Waterloo."
                },
                {
                    title: "Started Bachelor of Applied Science in Nanotechnology Engineering (from my basement)",
                    content: "Gotta love the pandemic"
                },
                {
                    title: "Landed first co-op intership for the University of Waterloo's WIL Programs as a Developer",
                    content: "An immense accomplishment especially due to the pandemic causing the internship market to be very scarce. I was so happy when I received this offer as I would be doing work I really enjoyed."
                }
            ],
            
        },
        
        {
            year: 2021,
            items: [
                {
                    title: "Completed 1 year of my Bachelor's Degree"
                },
                {
                    title: "Landed a position as Husband",
                    content: "Yes, I got married at 20 years old. Ask me about it!"
                },
                {
                    title: "Arrived at the University of Waterloo campus",
                    content: "My first time living alone after a year of doing school from home."
                },
                {
                    title: "Landed my second co-op internship at HIRE Technologies as a QA Engineer.",
                    content: "Super excited for this job as it was much more technical as compared to my last internship. I'd be working with React, GraphQL and AWS; all of which are very popular technologies at the moment."
                },
                {
                    title: "Accepted an offer from my previous co-op at the University of Waterloo WIL Programs to come back in casual/part-time Developer role.",
                    content: "Due to exceptional performance during my co-op term, WIL Programs offered me to come back in a casual/part-time role to help out with backlog. Very exciting to be making some extra money."
                }
            ],
        },
        
    ]

    

    const styleProps = {
        mainBox: {
            minH: "100vh"
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
        },
        event: {
            fontSize: "xl",
            ml: 3,
            fontWeight: "bold"
        },
        eventContent: {
            ml: 3,
            fontWeight: "light"
        }
        
    }

    return (
        <Box {...styleProps.mainBox}>
            <Text {...styleProps.title}>My <Text as="span" color={useColorModeValue("primaryLight", "primaryDark")}>Life</Text> So Far</Text>
            
            {
                timeLineDataByYear.slice(0).reverse().map( (item, idx) => {
                    return (
                        <Box key={`year-${idx}`}>
                            <Text {...styleProps.year}>{item.year}</Text>

                            <Box >

                                {
                                    item.items.slice(0).reverse().map( (content, conIdx) => {
                                        return (
                                            <Flex pb="5" key={`event-${item.year}-${conIdx}`} position="relative">
                                                { conIdx !== item.items.length - 1 && <Box {...styleProps.line}></Box>}
                                                <Text {...styleProps.bullet}><FontAwesomeIcon icon="circle"/></Text>
                                                <Box>
                                                    <Text {...styleProps.event}>{content.title}</Text>
                                                    {content.content && <Text {...styleProps.eventContent}>{content.content}</Text>}
                                                </Box>
                                                
                                                
                                            </Flex>
                                        )
                                    })
                                }
                            </Box>
                        </Box>
                    )
                })
            }
        </Box>
    );
}

export default Timeline;
