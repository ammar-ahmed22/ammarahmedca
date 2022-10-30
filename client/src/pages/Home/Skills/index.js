import React, { useState } from "react"
import { Box, Text, useColorModeValue, SimpleGrid, Button, Tabs, TabList, Tab, Flex } from "@chakra-ui/react"
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
            <Text {...styleProps.title}>My <Text as="span" variant="gradient" >Skills</Text></Text>
            <Tabs variant="line" colorScheme="brand.purple.500" onChange={(idx) => setTypeIdx(idx)} size="sm" >
                <TabList>
                    {
                        types.map( type => <Tab _focus={{}}>{type}{type === "Other" ? "" : "s"}</Tab>)
                    }
                </TabList>
            </Tabs>
            <Flex width="100%" height="60vh" justify="center" align="center">
                <SkillChart type={types[typeIdx]} />
            </Flex>
            
        </Box>
    )
}

export default Skills;