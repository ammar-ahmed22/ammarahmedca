import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import {
  Text,
  Box,
  SimpleGrid,
  HStack,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import ProjectCard from "./ProjectCard";
import Search from "./Search";
import Filter from "./Filter";
import DisplayLimiter from "@website/components/DisplayLimiter";
import {
  ProjectMetadataQuery,
  ProjectMetadataQueryResponse,
} from "@website/graphql/queries/Metadata";
import { styles } from "./styles/index.styles";

const CustomSkeleton: React.FC = () => {
  return (
    <>
      <SkeletonText mb={2} skeletonHeight={10} noOfLines={1} />
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
        <Box>
          <Skeleton height="30vh" my={5} />
          <Skeleton height="30vh" my={5} />
        </Box>
        <Box>
          <Skeleton height="30vh" my={5} />
          <Skeleton height="30vh" my={5} />
        </Box>
      </SimpleGrid>
    </>
  );
};

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<IMetadata[]>([]);
  const [projectsToDisplay, setProjectsToDisplay] = useState<number>(4);

  const { data, loading, error } =
    useQuery<ProjectMetadataQueryResponse>(ProjectMetadataQuery);

  useEffect(() => {
    if (data && !loading) {
      setProjects(data.projectMetadata);
    }
  }, [data, loading]);

  return (
    <Box {...styles.mainBox} id="projects">
      <Text {...styles.title}>
        My{" "}
        <Text variant="gradient" as="span">
          Works
        </Text>
      </Text>
      <HStack mb={4} spacing={2}>
        {data && (
          <Search projects={data.projectMetadata} setProjects={setProjects} />
        )}
        {data && (
          <Filter projects={data.projectMetadata} setProjects={setProjects} />
        )}
      </HStack>

      {data && projects && (
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
          {projects.slice(0, projectsToDisplay).map((project: IMetadata) => {
            return (
              <ProjectCard
                project={project}
                id={project.id}
                key={project.id}
                loading={loading}
              />
            );
          })}
        </SimpleGrid>
      )}
      {error && <Text>Error</Text>}
      {loading && <CustomSkeleton />}

      <HStack justify="center" mt={5}>
        {data && data.projectMetadata.length > 4 && (
          <DisplayLimiter
            numDisplaying={projectsToDisplay}
            setNumDisplaying={setProjectsToDisplay}
            initial={4}
            total={data.projectMetadata.length}
            incrementBy={2}
            scrollToId="projects"
          />
        )}
      </HStack>
    </Box>
  );
};

export default Projects;
