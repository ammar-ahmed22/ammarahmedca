import React, { useState } from "react"
import { Box, Text, useColorModeValue, SimpleGrid, Button, Tabs, TabList, Tab } from "@chakra-ui/react"
import SkillChart from "./SkillChart"
import SkillTreeMap from "./SkillTreeMap"


const Skills = () => {
    const [typeIdx, setTypeIdx] = useState(0);
    const types = ["Language", "Framework", "Developer Tool", "Other"]
    const styleProps = {
        title: {
            fontSize: { base: "5xl", lg: "6xl"},
            fontFamily: "heading",
            as: "h3",
        },
    }
    return (
        <Box >
            <Text {...styleProps.title}>My <Text as="span" color={useColorModeValue("primaryLight", "primaryDark")}>Skills</Text></Text>
            <Tabs variant="line" colorScheme="red" onChange={(idx) => setTypeIdx(idx)} size="sm" >
                <TabList>
                    {
                        types.map( type => <Tab _focus={{}}>{type}{type === "Other" ? "" : "s"}</Tab>)
                    }
                </TabList>
            </Tabs>
            <Box width="100%" height="60vh">
                <SkillChart type={types[typeIdx]} />
            </Box>
            
        </Box>
    )
}

export default Skills;