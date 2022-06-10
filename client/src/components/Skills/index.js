import React from "react"
import { Box, Text, useColorModeValue } from "@chakra-ui/react"
import SkillChart from "./SkillChart"


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
            <SkillChart />
        </Box>
    )
}

export default Skills;