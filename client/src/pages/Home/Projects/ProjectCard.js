import React from "react";
import { useColorModeValue, Skeleton, Box, Flex, Tag, Text, Link, } from "@chakra-ui/react"
import { Link as ReactLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";


const ProjectCard = ({ project, id, loading }) => {
    const styleProps = {
        mainBox: {
            border: "1px solid",
            borderColor: useColorModeValue("gray.800", "white"),
            position: "relative",
            h: "100%",
            bg: useColorModeValue("white", 'gray.800'),
            p: 4,
            // transition: "transform .35s ease-out",
            // _hover: {
            //     _after: {
            //         opacity: 0
            //     },
            //     transform: "scale(1.05)",
            //     boxShadow: "dark-lg"
            // },
            _after: {
                position: "absolute",
                h: "100%",
                w: "100%",
                left: ".5rem",
                top: ".5rem",
                zIndex: -10,
                bgGradient: "linear(to-tr, brand.blue.500, brand.purple.500)",
                content: "' '",
                opacity: 1,
            }
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
            <Box sx={styleProps.mainBox} key={id} >
                <Flex justify="space-between" align="baseline">
                    <Text fontSize="2xl" fontFamily="heading">{project.name}</Text>
                    <Flex>
                        { project.github && <Link href={project.github} mr={1} isExternal ><FontAwesomeIcon icon={faGithub}/></Link>}
                        { project.external && <Link href={project.external} isExternal ><FontAwesomeIcon icon={faExternalLinkAlt} /></Link>}
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