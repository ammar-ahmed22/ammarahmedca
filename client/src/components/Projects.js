import React from 'react';
import { useQuery, gql } from "@apollo/client";
import { Text, Box, SimpleGrid, useColorModeValue } from "@chakra-ui/react"
import ProjectCard from './Projects/ProjectCard';




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

    

    const { data, loading, error } = useQuery(PROJECT_INFO);
    console.log(data)

    const primaryColor = useColorModeValue("primaryLight", "primaryDark");

    
    
    return (
        <Box {...styleProps.mainBox} >
            <Text {...styleProps.title}>My <Text color={primaryColor} as="span">Works</Text></Text>
            {
                data && (
                    <SimpleGrid columns={2} spacing={5}>
                        {
                            data.ProjectInfo.map( project => {
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
