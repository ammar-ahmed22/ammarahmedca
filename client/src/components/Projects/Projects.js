import React, { useState, useEffect } from 'react';
import { useQuery, gql } from "@apollo/client";
import { Text, Box, SimpleGrid, useColorModeValue, HStack, Button, Skeleton, SkeletonText } from "@chakra-ui/react"
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons"
import ProjectCard from './ProjectCard';
import Search from './Search';
import Filter from './Filter';
import DisplayLimiter from '../DisplayLimiter';


const CustomSkeleton = () => {
    return (
        <>
        <SkeletonText mb={2} skeletonHeight={10} noOfLines={1} />
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} >
            <Box>
                <Skeleton height="30vh" my={5}/>
                <Skeleton height="30vh" my={5}/>
            </Box>
            <Box>
                <Skeleton height="30vh" my={5}/>
                <Skeleton height="30vh" my={5} />
            </Box>
        </SimpleGrid>
        </>
    )
}

const PROJECT_INFO = gql`
    query {
        ProjectInfo {
            id
            name
            lastEdited
            timeline
            type
            languages
            frameworks
            github
            external
            description
            isBlog
        }
    }
`

const Projects = () => {

    const styleProps = {
        mainBox: {
            minH: "100vh"
        },
        title: {
            fontSize: { base: "5xl", lg: "6xl"},
            fontFamily: "heading",
            as: "h3",
        },
        showMoreLessBtn: {
            variant: "ghost",
            display: "flex",
            flexDirection: "column",
            _hover: {
                color: "primaryLight"
            }
        }
    }

    const [projects, setProjects] = useState([]);
    const [projectsToDisplay, setProjectsToDisplay] = useState(4);

    const { data, loading, error } = useQuery(PROJECT_INFO);
    console.log(data)

    const primaryColor = useColorModeValue("primaryLight", "primaryDark");

    useEffect(() => {
        if (data && !loading){
            setProjects(data.ProjectInfo);
            
        }
    }, [data, loading])

    
    
    return (
        <Box {...styleProps.mainBox} id="projects">
            <Text {...styleProps.title}>My <Text color={primaryColor} as="span">Works</Text></Text>
            <HStack mb={4} spacing={2} >
               {data &&  <Search projects={data.ProjectInfo} setProjects={setProjects} /> }
               {data && <Filter projects={data.ProjectInfo} setProjects={setProjects} /> }
            </HStack>
            
            {
                data && projects && (
                    <SimpleGrid columns={{ base: 1, md: 2}} spacing={5}>
                        {
                            projects.slice(0, projectsToDisplay).map( project => {
                                return <ProjectCard project={project} id={project.id} key={project.id} loading={loading} />
                            })
                        }
                    </SimpleGrid>
                )
            }
            {
                error && <Text>Error</Text>
            }
            {
                loading && <CustomSkeleton />
            }
            
                
            <HStack justify="center" mt={5}>
                
                {data && <DisplayLimiter numDisplaying={projectsToDisplay} setNumDisplaying={setProjectsToDisplay} initial={4} total={data.ProjectInfo.length} incrementBy={2} scrollToId="projects" />}
                        
            </HStack>
                
            
        </Box>
    );
    

    

    
}

export default Projects;
