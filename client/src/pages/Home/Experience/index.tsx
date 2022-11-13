import React, { useState } from 'react';
import { Box, Text, Flex, Tag, HStack, SkeletonText } from "@chakra-ui/react"
import { useQuery } from "@apollo/client"
import BulletItem from './BulletItem';
import DisplayLimiter from '../../../components/DisplayLimiter';
import RichText from '../../Post/RichText';
import { ExperienceQuery, ExperienceQueryResponse } from '../../../graphql/queries/Experience';
import { styles } from './styles/index.styles';

const CustomSkeleton : React.FC = () => {
    return (
        <Box mb={16}>
            <SkeletonText skeletonHeight={10} noOfLines={1} mb="4" w="50%"/>
            <SkeletonText skeletonHeight={4} noOfLines={1} mb="4" w="25%"/>
            <SkeletonText skeletonHeight={2} noOfLines={1} mb="4" w="25%"/>
            <SkeletonText noOfLines={7} mb="4"/>
        </Box>
    )
}

const Experience : React.FC = () => {

    const [experiencesToDisplay, setExperiencesToDisplay] = useState(3);

    const { data, loading } = useQuery<ExperienceQueryResponse>(ExperienceQuery);

    const getMonthYear = (ISOStamp?: number) : string => {
        if (!ISOStamp){
            return "Present"
        }
        const date = new Date(ISOStamp);
        const month = date.toLocaleString("default", { month: "long" });
        const year = date.getFullYear();

        return `${month} ${year}`

    }

    return (
        <Box {...styles.mainBox} id="experience">
            <Text {...styles.title} >My <Text as="span" variant="gradient" >Experiences</Text></Text>
            <Box>
                {
                    data && data.experiences.slice(0, experiencesToDisplay).map( (exp, idx) => {
                        const { company, role, timeframe, description, type, skills } = exp;
                        return (
                            <BulletItem key={idx} idx={idx} listLength={experiencesToDisplay}>
                                <Text {...styles.company} >{company}</Text>
                                <Box mb={3}>
                                    <Text {...styles.role} >{role}</Text>
                                    <Text {...styles.timeframe} >{getMonthYear(timeframe.start)} - {getMonthYear(timeframe.end)}</Text>
                                    <Tag textTransform="uppercase" fontWeight="bold" size="md" my={2}>{type}</Tag>
                                    
                                    <Text {...styles.description}>
                                        {
                                            description.map( (text, idx) => (<RichText key={idx} idx={idx} {...text.annotations}>{text.plainText}</RichText>))
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
                    loading && [1, 2, 3].map( (val) => {
                        return <CustomSkeleton key={val} />
                    })
                }
                <Flex justify="center">
                    {
                        data && <DisplayLimiter numDisplaying={experiencesToDisplay} setNumDisplaying={setExperiencesToDisplay} initial={3} total={data.experiences.length} incrementBy={2} scrollToId="experience"/>
                    }
                </Flex>
            </Box>
        </Box>
    );
}

export default Experience;
