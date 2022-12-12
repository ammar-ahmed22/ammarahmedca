import React, { useState } from "react";
import { Box, Text, Tabs, TabList, Tab, Flex } from "@chakra-ui/react";
import SkillChart from "./SkillChart";

const Skills: React.FC = () => {
  const [typeIdx, setTypeIdx] = useState<number>(0);
  const tabs = ["Language", "Framework", "Developer Tool", "Other"];

  return (
    <Box>
      <Text fontSize={{ base: "5xl", lg: "6xl" }} fontFamily="heading" as="h3">
        My{" "}
        <Text as="span" variant="gradient">
          Skills
        </Text>
      </Text>
      <Tabs
        variant="line"
        colorScheme="brand.purple.500"
        onChange={(idx) => setTypeIdx(idx)}
        size="sm"
      >
        <TabList>
          {tabs.map((tab, idx) => (
            <Tab key={`tab-${idx}`} _focus={{}}>
              {tab}
              {tab === "Other" ? "" : "s"}
            </Tab>
          ))}
        </TabList>
      </Tabs>
      <Flex width="100%" height="60vh" justify="center" align="center">
        <SkillChart type={tabs[typeIdx]} />
      </Flex>
    </Box>
  );
};

export default Skills;
