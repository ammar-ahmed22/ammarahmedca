import React from 'react';
import { Box, Text, Flex } from "@chakra-ui/react"

const Timeline = () => {

    const timeLineDataByYear = [
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
                    title: "Started highschool at Lester B. Pearson Collegiate Institute"
                }
            ],
            
        },
        {
            year: 2018,
            items: [
                {  
                    title: "Switched highscools to Anderson Collegiate Institute"
                }
            ]
            
        },
        {
            year: 2020,
            items: [
                {
                    title: "Gained acceptance to the University of Waterloo's highly competitive engineering program."
                },
                {
                    title: "Initiated a team of 7 incoming first-years to collaborate on a resource webstie for applicants to the University of Waterloo"
                },
                {
                    title: "Commenced studies at the University of Waterloo (from the comfort of my basement)"
                },
                {
                    title: "Landed my first co-op intership for the University of Waterloo's WIL Programs as a Developer"
                }
            ],
            
        },
        
        {
            year: 2021,
            items: [
                {
                    title: "Completed my first year of engineering."
                },
                {
                    title: "Got married at the ripe, young age of 20 years old."
                },
                {
                    title: "Arrived on campus, living away from home for the first time"
                },
                {
                    title: "Landed my second co-op internship at HIRE Technologies as a QA Engineer."
                },
                {
                    title: "Accepted an offer from my previous co-op at the University of Waterloo WIL Programs to come back in casual/part-time Developer role."
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
        }
    }

    return (
        <Box {...styleProps.mainBox}>
            <Text {...styleProps.title}>A Glimpse of My Life</Text>
            {
                timeLineDataByYear.map( ( item, idx ) => {
                    return (
                        <Box key={`year-${idx}`}>
                            
                                
                                <Text as="h4" fontSize="4xl" ml={2} fontFamily="heading">{item.year}</Text>
                    
                            
                            <Box>
                                {
                                    item.items.map( (content, idx) => {
                                        return (
                                        <Flex >
                                            { idx !== item.items.length - 1 && <Box w="1px" bg="gray.700" position="relative">
                                                <Box w="10px" h="10px" borderRadius="50%" bg="black" position="absolute" transform={idx === 0 ? "translate(-50%, 0%)" : "translate(-50%, 50%)"}></Box>
                                            </Box>}
                                            <Text as="h5" ml={2} mb="2" fontSize="xl" fontFamily="body">{content.title}</Text>
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
