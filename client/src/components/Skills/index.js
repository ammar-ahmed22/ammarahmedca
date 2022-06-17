import React from "react"
import { Box, Text, useColorModeValue, SimpleGrid } from "@chakra-ui/react"
import SkillChart from "./SkillChart"
import SkillTreeMap from "./SkillTreeMap"


const Skills = () => {

    const styleProps = {
        mainBox: {
            minH: "100vh"
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
            <Text fontWeight="bold" fontSize="2xl">Languages</Text>
            {/* <Box width="100%" height="40vh">
                <SkillChart />
            </Box> */}
            <SimpleGrid columns={2} spacing={2}>
                <Box h="40vh">
                    <SkillChart type="Language"/>
                </Box>
                <Box h="40vh">
                    <SkillChart type="Framework"/>
                </Box>
                <Box h="40vh">
                    <SkillChart type="Developer Tool"/>
                </Box>
                <Box h="40vh">
                    <SkillChart type="Other"/>
                </Box>
            </SimpleGrid>
            {/* <Box h="50vh">
                <SkillTreeMap />
            </Box> */}
            
        </Box>
    )
}

export default Skills;