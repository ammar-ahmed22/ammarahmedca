import React from 'react';
import { Text, Box, SimpleGrid, useColorModeValue, Link, Icon } from "@chakra-ui/react"
import { ExternalLinkIcon } from "@chakra-ui/icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ProjectCard = ({ project }) => {
    const styleProps = {
        mainBox: {
            border: "1px solid",
            borderColor: useColorModeValue("gray.800", "white"),
            position: "relative",
            bg: useColorModeValue("white", 'gray.800'),
            p: 3
        },
        afterBox: {
            position: "absolute",
            h: "100%",
            w: "100%",
            left: ".25rem",
            top: ".25rem",
            zIndex: -1,
            bg: useColorModeValue("gray.800", "white"),
            content: "' '"
        }
    }
    return (
        <Box {...styleProps.mainBox} _after={{...styleProps.afterBox}} >
            <Text fontSize="2xl" fontFamily="heading">
                {project.title}
                {" "}
                <Text as="span" fontSize="md">
                {project.links.map(link => {
                    if (link.icon !== "external"){
                        return <Link><FontAwesomeIcon icon={link.icon}/></Link>
                    }else{
                        return <Link> <FontAwesomeIcon icon={"external-link-alt"}/></Link>
                    }
                })}
                </Text>
            </Text>
            <Text>{project.description}</Text>
        </Box>
    )
}

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

    const projectData = [
        {
            title: "WaterlooBasics",
            links: [
                {
                    icon: ['fab', 'github'],
                    href: "google.ca"
                },
                {
                    icon: "external",
                    href: "google.ca"
                }
            ],
            description: "Website created for incoming students and applicants to the University of Waterloo's highly competitive engineering program in collaboration with 7 other engineering students.",
            timeline: "Summer 2020",
            projectType: ["frontend"],
            languages: ["HTML/CSS", "JavaScript", "Git"]
        },
        {
            title: "Home Renovation",
            links: [],
            description: "Transforming entire top floor from carpet to laminate flooring as well as restoring staris to stained hardwood with no prior experience in carpentry.",
            timeline: "December 2020",
            projectType: ["project management", "engineering"],
            languages: []
        }
    ]

    return (
        <Box {...styleProps.mainBox} >
            <Text {...styleProps.title}>My <Text color={useColorModeValue("primaryLight", "primaryDark")} as="span">Works</Text></Text>
            <SimpleGrid columns={2} spacing={5}>
                <ProjectCard project={projectData[0]}/>
                <ProjectCard project={projectData[1]}/>
            </SimpleGrid>
        </Box>
    );
}

export default Projects;
