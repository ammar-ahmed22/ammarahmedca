import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
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
import FilterMenu from "@website/components/FilterMenu";
import DisplayLimiter from "@website/components/DisplayLimiter";
import {
  ProjectMetadataQuery,
  PROJECT_METADATA_QUERY,
} from "@website/graphql/queries/Metadata";
import { PROJECT_FILTER_OPTIONS_QUERY, ProjectFilterOptionsQuery } from "@website/graphql/queries/FilterOpts";
import { styles } from "./styles/index.styles";
import { IProjectMetadata } from "@ammarahmedca/types";

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
  const [projects, setProjects] = useState<IProjectMetadata[]>([]);
  const [filterTypes, setFilterTypes] = useState(new Set<string>());
  const [filterFrameworks, setFilterFrameworks] = useState(new Set<string>())
  const [filterLanguages, setFilterLanguages] = useState(new Set<string>())
  const [projectsToDisplay, setProjectsToDisplay] = useState<number>(4);
  const [searching, setSearching] = useState<boolean>(false);

  const [getProjectMetadata,{ data, loading, error }] =
    useLazyQuery<ProjectMetadataQuery.Response, ProjectMetadataQuery.Variables>(PROJECT_METADATA_QUERY);
  
  const filterOptsResp = useQuery<ProjectFilterOptionsQuery.Response>(PROJECT_FILTER_OPTIONS_QUERY)

  useEffect(() => {
    getProjectMetadata({
      variables: {
        onlyPublished: true,
        frameworks: [...filterFrameworks.values()],
        languages: [...filterLanguages.values()],
        type: [...filterTypes.values()]
      }
    })
  }, [filterTypes, filterFrameworks, filterLanguages, getProjectMetadata])

  useEffect(() => {
    if (data && !loading) {
      setProjects(data.projectMetadata);
    }
  }, [data, loading]);

  type ProjectFilterOptionDataKey = keyof ProjectFilterOptionsQuery.Response

  const filterMenuMapping = [
    {
      dataKey: "projectTypes" as ProjectFilterOptionDataKey,
      filterSet: filterTypes,
      setFilterSet: setFilterTypes,
      text: "Types"
    },
    {
      dataKey: "projectLanguages" as ProjectFilterOptionDataKey,
      filterSet: filterLanguages,
      setFilterSet: setFilterLanguages,
      text: "Languages"
    },
    {
      dataKey: "projectFrameworks" as ProjectFilterOptionDataKey,
      filterSet: filterFrameworks,
      setFilterSet: setFilterFrameworks,
      text: "Frameworks"
    },
  ]

  return (
    <Box {...styles.mainBox} id="projects">
      <Text {...styles.title}>
        My{" "}
        <Text variant="gradient" as="span">
          Works
        </Text>
      </Text>
      <Box mb={4}>
        <Search projects={data?.projectMetadata} setProjects={setProjects} setSearching={setSearching} isDisabled={!data} />
      </Box>
      {
        filterOptsResp.data && (
          <HStack mb="4" >
            <Text fontSize="lg" >Filter by:</Text>
            {
              filterMenuMapping.map( mapping => {
                const { dataKey, filterSet, setFilterSet, text } = mapping
                if (filterOptsResp.data){
                  return (
                    <FilterMenu
                      key={text} 
                      options={filterOptsResp.data[dataKey]}
                      filterSet={filterSet}
                      setFilterSet={setFilterSet}
                      buttonChildren={text}
                      buttonProps={{
                        colorScheme: "brand.purple",
                        variant: filterSet.size > 0 ? "solid" : "outline",
                        size: "sm"
                      }}
                      menuProps={{
                        closeOnSelect: false
                      }}
                    />
                  )
                }
                return null;
              })
            }
          </HStack>
        )
      }

      {data && projects && (
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
          {projects.slice(0, searching ? projects.length : projectsToDisplay ).map((project: IProjectMetadata) => {
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
        {data && data.projectMetadata.length > 4 && !searching && (
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
