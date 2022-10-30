import React, { useState, useEffect } from 'react';
import { useQuery, gql } from "@apollo/client";
import { BlogInfo, ProjectInfo } from '../../../graphql/types';
import { Text, Box, SimpleGrid, HStack, Skeleton, SkeletonText } from "@chakra-ui/react"
import ProjectCard from './ProjectCard';
import Search from './Search';
import Filter from './Filter';
import DisplayLimiter from '../../../components/DisplayLimiter';
import { styles } from './index.styles';


const CustomSkeleton : React.FC = () => {
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

const Projects : React.FC = () => {

    const [projects, setProjects] = useState<BlogInfo[]>([]);
    const [projectsToDisplay, setProjectsToDisplay] = useState<number>(4);

    const { data, loading, error } = useQuery<ProjectInfo>(PROJECT_INFO);
    

    

    useEffect(() => {
        if (data && !loading){
            setProjects(data.ProjectInfo);
            
        }
    }, [data, loading])

    
    
    return (
        <Box {...styles.mainBox} id="projects">
            <Text {...styles.title} >My <Text variant='gradient' as="span">Works</Text></Text>
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
