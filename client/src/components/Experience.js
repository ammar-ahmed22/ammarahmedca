import React, { useState } from 'react';
import { Box, Text, useColorModeValue, Flex, Tag, HStack } from "@chakra-ui/react"
import { useQuery, gql } from "@apollo/client"
import BulletItem from './BulletItem';
import DisplayLimiter from './DisplayLimiter';
import RichText from './RichText';

const Experience = () => {

    const GET_EXP_INFO = gql`
        query {
            ExperienceInfo{
                company
                role
                description{
                    plain_text
                    annotations{
                        bold
                        code
                        color
                        underline
                        strikethrough
                        italic
                    }
                }
                type
                skills
                timeframe {
                    start
                    end
                }
            }
        }
    `

    const [experiencesToDisplay, setExperiencesToDisplay] = useState(3);

    const { data, loading, error } = useQuery(GET_EXP_INFO);

    const styleProps = {
        mainBox: {
            minH: "100vh",
            mt: "10vh"
        },
        title: {
            as: "h3",
            fontSize: '6xl',
            fontFamily: "heading"
        },
        company: {
            fontSize: "3xl",
            fontWeight: "bold",
            fontFamily: "heading"
        },
        role: {
            fontSize: "xl",
            color: useColorModeValue("primaryLight", "primaryDark")
        },
        timeframe: {
            color: "gray.500"
        }
    }
    return (
        <Box {...styleProps.mainBox} id="experience">
            <Text {...styleProps.title} >My <Text as="span" color={useColorModeValue("primaryLight", "primaryDark")}>Experiences</Text></Text>
            <Box>
                {
                    data && data.ExperienceInfo.slice(0, experiencesToDisplay).map( (exp, idx) => {
                        const { company, role, timeframe, description, type, skills } = exp;
                        return (
                            <BulletItem idx={idx} listLength={experiencesToDisplay}>
                                <Text {...styleProps.company} >{company}</Text>
                                <Box mb={3}>
                                    <Text {...styleProps.role} >{role}</Text>
                                    <Text {...styleProps.timeframe} >{timeframe.start} - {timeframe.end}</Text>
                                    <Tag textTransform="uppercase" fontWeight="bold" size="md" my={2}>{type}</Tag>
                                    
                                    <Text>
                                        {
                                            description.map( (text, idx) => (<RichText idx={idx} {...text.annotations}>{text.plain_text}</RichText>))
                                        }
                                    </Text>
                                    <HStack my={2} >
                                        {
                                            skills.map( (skill, skillIdx) => {
                                                return <Tag size="sm" fontWeight="bold" textTransform="uppercase" colorScheme="red" >{skill}</Tag>
                                            })
                                        }
                                    </HStack>
                                </Box>
                            </BulletItem>
                        )
                    })
                }
                <Flex justify="center">
                    {
                        data && <DisplayLimiter numDisplaying={experiencesToDisplay} setNumDisplaying={setExperiencesToDisplay} initial={3} total={data.ExperienceInfo.length} incrementBy={2} scrollToId="experience"/>
                    }
                </Flex>
            </Box>
        </Box>
    );
}

export default Experience;
