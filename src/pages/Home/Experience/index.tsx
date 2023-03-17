import React, { useState } from "react";
import { Box, Text, Flex, Tag, HStack, SkeletonText } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import BulletItem from "./BulletItem";
import DisplayLimiter from "../../../components/DisplayLimiter";
import RichText from "@website/components/RichText";
import {
  ExperienceQuery,
  ExperienceQueryResponse,
} from "../../../graphql/queries/Experience";
import { styles } from "./styles/index.styles";
import { intlFormat } from "date-fns";

const CustomSkeleton: React.FC = () => {
  return (
    <Box mb={16}>
      <SkeletonText skeletonHeight={10} noOfLines={1} mb="4" w="50%" />
      <SkeletonText skeletonHeight={4} noOfLines={1} mb="4" w="25%" />
      <SkeletonText skeletonHeight={2} noOfLines={1} mb="4" w="25%" />
      <SkeletonText noOfLines={7} mb="4" />
    </Box>
  );
};

const Experience: React.FC = () => {
  const [experiencesToDisplay, setExperiencesToDisplay] = useState(3);

  const { data, loading } = useQuery<ExperienceQueryResponse>(ExperienceQuery);

  return (
    <Box {...styles.mainBox} id="experience">
      <Text {...styles.title}>
        My{" "}
        <Text as="span" variant="gradient">
          Experiences
        </Text>
      </Text>
      <Box>
        {data &&
          data.experiences.slice(0, experiencesToDisplay).map((exp, idx) => {
            const { company, role, timeframe, description, type, skills } = exp;
            const startParsed = intlFormat(new Date(timeframe.start), { month: "long", year: "numeric" });
            const endParsed = timeframe.end ? intlFormat(new Date(timeframe.end), { month: "long", year: "numeric" }) : "Present";
            return (
              <BulletItem key={idx} idx={idx} listLength={experiencesToDisplay}>
                <Text {...styles.company}>{company}</Text>
                <Box mb={3}>
                  <Text {...styles.role}>{role}</Text>
                  <Text {...styles.timeframe}>
                    {startParsed} -{" "}
                    {endParsed}
                  </Text>
                  <Tag
                    textTransform="uppercase"
                    fontWeight="bold"
                    size="md"
                    my={2}
                  >
                    {type}
                  </Tag>

                  <RichText data={description} {...styles.description} />
                  <HStack my={2} wrap="wrap">
                    {skills.map((skill, skillIdx) => {
                      return (
                        <Tag
                          size="sm"
                          fontWeight="bold"
                          textTransform="uppercase"
                          colorScheme="brand.purple"
                          my={2}
                          key={skillIdx}
                        >
                          {skill}
                        </Tag>
                      );
                    })}
                  </HStack>
                </Box>
              </BulletItem>
            );
          })}
        {loading &&
          [1, 2, 3].map((val) => {
            return <CustomSkeleton key={val} />;
          })}
        <Flex justify="center">
          {data && data.experiences.length > 3 && (
            <DisplayLimiter
              numDisplaying={experiencesToDisplay}
              setNumDisplaying={setExperiencesToDisplay}
              initial={3}
              total={data.experiences.length}
              incrementBy={2}
              scrollToId="experience"
            />
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default Experience;
