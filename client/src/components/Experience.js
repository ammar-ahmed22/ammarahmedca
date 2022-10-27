import React, { useState } from 'react';
import { Box, Text, useColorModeValue, Flex, Tag, HStack, SkeletonText, SkeletonCircle, Skeleton } from "@chakra-ui/react"
import { useQuery, gql } from "@apollo/client"
import BulletItem from './BulletItem';
import DisplayLimiter from './DisplayLimiter';
import RichText from './Blog/RichText';

const CustomSkeleton = () => {
    return (
        <Box mb={16}>
            <SkeletonText skeletonHeight={10} noOfLines={1} mb="4" w="50%"/>
            <SkeletonText skeletonHeight={4} noOfLines={1} mb="4" w="25%"/>
            <SkeletonText skeletonHeight={2} noOfLines={1} mb="4" w="25%"/>
            <SkeletonText noOfLines={7} mb="4"/>
        </Box>
    )
}

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
            fontSize: { base: "5xl", lg: "6xl"},
            fontFamily: "heading"
        },
        company: {
            fontSize: { base: "2xl", lg: "3xl"},
            fontWeight: "bold",
            fontFamily: "heading"
        },
        role: {
            fontSize: { base: "lg", lg: "xl"},
            fontWeight: "bold",
            // color: useColorModeValue("primaryLight", "primaryDark")
            variant: "gradient"
        },
        timeframe: {
            color: "gray.500",
            fontSize: { base: "sm", lg: "md"}
        },
        description: {
            fontSize: { base: "sm", lg: "md"}
        }
    }
    return (
        <Box {...styleProps.mainBox} id="experience">
            <Text {...styleProps.title} >My <Text as="span" variant="gradient" >Experiences</Text></Text>
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
                                    
                                    <Text {...styleProps.description}>
                                        {
                                            description.map( (text, idx) => (<RichText idx={idx} {...text.annotations}>{text.plain_text}</RichText>))
                                        }
                                    </Text>
                                    <HStack my={2} wrap="wrap" >
                                        {
                                            skills.map( (skill, skillIdx) => {
                                                return <Tag size="sm" fontWeight="bold" textTransform="uppercase" colorScheme="brand.purple" my={2} key={skillIdx} >{skill}</Tag>
                                            })
                                        }
                                    </HStack>
                                </Box>
                            </BulletItem>
                        )
                    })
                }
                {
                    loading && [1, 2, 3].map( () => {
                        return <CustomSkeleton />
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
