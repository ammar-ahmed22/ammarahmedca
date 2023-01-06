import React from "react";
import {
  useColorModeValue,
  Skeleton,
  Box,
  Flex,
  Tag,
  Text,
  Link,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { styles } from "./styles/ProjectCard.styles";

interface ProjectCardProps {
  project: IMetadata;
  id: string;
  loading: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, id, loading }) => {
  const hyphenate = (str: string) => {
    return str.toLowerCase().split(" ").join("-");
  };

  return (
    <Skeleton isLoaded={!loading}>
      <Box
        sx={styles.mainBox}
        bg={useColorModeValue("white", "gray.800")}
        borderColor={useColorModeValue("gray.800", "white")}
        key={id}
      >
        <Flex justify="space-between" align="baseline">
          <Text fontSize="2xl" fontFamily="heading">
            {project.name}
          </Text>
          <Flex>
            {project.github && (
              <Link href={project.github} mr={1} isExternal>
                <FontAwesomeIcon icon={faGithub as IconProp} />
              </Link>
            )}
            {project.external && (
              <Link href={project.external} isExternal>
                <FontAwesomeIcon icon={faExternalLinkAlt as IconProp} />
              </Link>
            )}
          </Flex>
        </Flex>
        {project.type && project.type.length > 0 && (
          <Flex wrap="wrap">
            {project.type?.map((item, idx) => {
              return (
                <Tag key={idx} {...styles.tag}>
                  {item}
                </Tag>
              );
            })}
          </Flex>
        )}
        <Text fontSize="sm">{project.description}</Text>
        {project.isBlog && (
          <Link
            fontSize="sm"
            mt="2"
            color="brand.purple.500"
            fontWeight="bold"
            as={ReactLink}
            to={`/blog/${hyphenate(project.name)}`}
          >
            Read more
          </Link>
        )}
        {project.frameworks && project.frameworks.length > 0 && (
          <Text fontSize="sm" fontFamily="body" fontWeight="bold" >
            Frameworks:
          </Text>
        )}
        {project.frameworks && project.frameworks.length > 0 && (
          <Flex wrap="wrap" mt={1}>
            {project.frameworks?.map((framework, idx) => {
              return (
                <Tag key={idx} {...styles.tag} colorScheme="brand.purple">
                  {framework}
                </Tag>
              );
            })}
          </Flex>
        )}
        {project.languages && project.languages.length > 0 && (
          <Text fontSize="sm" fontFamily="body" fontWeight="bold" >
            Languages:
          </Text>
        )}
        {project.languages && project.languages.length > 0 && (
          <Flex wrap="wrap" mt="1">
            {project.languages?.map((language, idx) => {
              return (
                <Tag key={idx} {...styles.tag} colorScheme="brand.blue">
                  {language}
                </Tag>
              );
            })}
          </Flex>
        )}
      </Box>
    </Skeleton>
  );
};

export default ProjectCard;
