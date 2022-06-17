import React, { useState } from "react"
import { Box, Text, useColorModeValue, SimpleGrid, Button, Tabs, TabList, Tab } from "@chakra-ui/react"
import SkillChart from "./SkillChart"
import SkillTreeMap from "./SkillTreeMap"


const Skills = () => {
    const [typeIdx, setTypeIdx] = useState(0);
    const types = ["Language", "Framework", "Developer Tool", "Other"]
    const styleProps = {
        mainBox: {
            // minH: "100vh"
        },
        title: {
            fontSize: { base: "5xl", lg: "6xl"},
            fontFamily: "heading",
            as: "h3",
        },
    }
    return (
        <Box {...styleProps.mainBox}>
            <Text {...styleProps.title}>My <Text as="span" color={useColorModeValue("primaryLight", "primaryDark")}>Skills</Text></Text>
            <Tabs variant="soft-rounded" colorScheme="red" onChange={(idx) => setTypeIdx(idx)}>
                <TabList>
                    <Tab>Languages</Tab>
                    <Tab>Frameworks</Tab>
                    <Tab>Developer Tools</Tab>
                    <Tab>Other</Tab>
                </TabList>
            </Tabs>
            <Box width="100%" height="60vh">
                <SkillChart type={types[typeIdx]} />
            </Box>
            
        </Box>
    )
}

export default Skills;