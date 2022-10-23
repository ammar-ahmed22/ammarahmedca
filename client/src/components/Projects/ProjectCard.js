import React from "react";
import { useColorModeValue, Skeleton, Box, Flex, Tag, Text, Link, } from "@chakra-ui/react"
import { Link as ReactLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const ProjectCard = ({ project, id, loading }) => {
    const styleProps = {
        mainBox: {
            border: "1px solid",
            borderColor: useColorModeValue("gray.800", "white"),
            position: "relative",
            h: "100%",
            bg: useColorModeValue("white", 'gray.800'),
            p: 4,
        },
        afterBox: {
            position: "absolute",
            h: "100%",
            w: "100%",
            left: ".25rem",
            top: ".25rem",
            zIndex: -1,
            bg: useColorModeValue("gray.800", "white"),
            content: "' '",
            display: "block"
        },
        tag: {
            size: "sm",
            textTransform: "uppercase",
            mr: 1,
            mb: 1,
            fontWeight: "bold"
        }
    }

    const primary = useColorModeValue("primaryLight", "primaryDark");

    const hyphenate = string => {
        return string.toLowerCase().split(" ").join("-");
    }
    
    return (
        <Skeleton isLoaded={!loading} >
            <Box {...styleProps.mainBox} _after={{...styleProps.afterBox}} key={id} >
                <Flex justify="space-between" align="baseline">
                    <Text fontSize="2xl" fontFamily="heading">{project.name}</Text>
                    <Flex>
                        { project.github && <Link href={project.github} mr={1} isExternal ><FontAwesomeIcon icon={['fab', 'github']}/></Link>}
                        { project.external && <Link href={project.external} isExternal ><FontAwesomeIcon icon="external-link-alt"/></Link>}
                    </Flex>
                </Flex>
                {
                    project.type.length > 0 && (
                        <Flex wrap="wrap">

                            {
                                project.type.map( (item, idx) => {
                                    return <Tag key={idx} {...styleProps.tag} >{item}</Tag>
                                })
                            }
                        </Flex>
                    )
                 }
                <Text fontSize="sm">{project.description}</Text>
                {
                    project.isBlog && <Link fontSize="sm" mt="2" color="brand.purple.500" fontWeight="bold" as={ReactLink} to={{pathname: `/blog/${hyphenate(project.name)}`, state: { id: project.id }}} >Read more</Link>
                }
                {project.frameworks.length > 0 && <Text fontSize="md" fontFamily="heading">Frameworks:</Text>}
                {
                    project.frameworks.length > 0 && (
                        <Flex wrap="wrap" mt={1} >
                            {
                                project.frameworks.map( (framework, idx) => {
                                    return <Tag key={idx} {...styleProps.tag} colorScheme="brand.purple" >{framework}</Tag>
                                })
                            }
                        </Flex>
                    )
                }
                {project.languages.length > 0 && <Text fontSize="md" fontFamily="heading">Languages:</Text>}
                {
                    project.languages.length > 0 && (
                        <Flex wrap="wrap" mt="1">
                            {
                                project.languages.map( (language, idx) => {
                                    return <Tag key={idx} {...styleProps.tag} colorScheme="brand.purple">{language}</Tag>
                                })
                            }
                        </Flex>
                    )
                }
                
                
            </Box>
        </Skeleton>
    )
}

export default ProjectCard