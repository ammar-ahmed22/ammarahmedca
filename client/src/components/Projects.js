import React, { useState, useEffect } from 'react';
import { useQuery, gql } from "@apollo/client";
import { Text, Box, SimpleGrid, useColorModeValue, Flex } from "@chakra-ui/react"
import ProjectCard from './Projects/ProjectCard';
import Search from './Projects/Search';
import Filter from './Projects/Filter';




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
        }
    }
`

const Projects = () => {

    const styleProps = {
        mainBox: {
            minH: "100vh"
        },
        title: {
            fontSize: "6xl",
            fontFamily: "heading",
            as: "h3",
        }
    }

    const [projects, setProjects] = useState([]);


    

    const { data, loading, error } = useQuery(PROJECT_INFO);
    console.log(data)

    const primaryColor = useColorModeValue("primaryLight", "primaryDark");

    useEffect(() => {
        if (data){
            setProjects(data.ProjectInfo)
        }
    }, [data])
    
    
    return (
        <Box {...styleProps.mainBox} >
            <Text {...styleProps.title}>My <Text color={primaryColor} as="span">Works</Text></Text>
            <Flex mb={4}>
               {data &&  <Search data={data.ProjectInfo} setData={setProjects} /> }
               <Filter />
            </Flex>
            
            {
                data && projects && (
                    <SimpleGrid columns={2} spacing={5}>
                        {
                            projects.map( project => {
                                return <ProjectCard project={project} id={project.id} key={project.id} loading={loading} />
                            })
                        }
                    </SimpleGrid>
                )
            }
            {
                error && <Text>Error</Text>
            }
            
        </Box>
    );
    

    

    
}

export default Projects;
