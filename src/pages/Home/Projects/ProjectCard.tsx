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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { styles } from "./styles/ProjectCard.styles";
import { IProjectMetadata } from "@ammarahmedca/types";
import RichText from "@website/components/RichText";
import { intlFormat } from "date-fns";

interface ProjectCardProps {
  project: IProjectMetadata;
  id: string;
  loading: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, id, loading }) => {
  const { start, end } = project.dateRange;
  const startParsed = intlFormat(new Date(start), {
    month: "short",
    year: "numeric",
    timeZone: "UTC"
  });
  const endParsed = end
    ? intlFormat(new Date(end), { month: "short", year: "numeric", timeZone: "UTC" })
    : undefined;

  return (
    <Skeleton isLoaded={!loading}>
      <Box
        sx={styles.mainBox}
        bg={useColorModeValue("white", "gray.800")}
        borderColor={useColorModeValue("gray.800", "white")}
        key={id}
      >
        <Flex justify="space-between" align="baseline" mb="1">
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
        <Text color="gray.500" fontWeight="thin" mb="1" fontSize="sm">
          {startParsed} {endParsed && "- " + endParsed}
        </Text>
        {project.type.length > 0 && (
          <Flex wrap="wrap" mb="1">
            {project.type?.map((item, idx) => {
              return (
                <Tag key={idx} {...styles.tag}>
                  {item}
                </Tag>
              );
            })}
          </Flex>
        )}
        <RichText fontSize="sm" mb="2" data={project.description} />
        {project.frameworks && project.frameworks.length > 0 && (
          <Text fontSize="sm" fontFamily="body" fontWeight="bold">
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
          <Text fontSize="sm" fontFamily="body" fontWeight="bold">
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
