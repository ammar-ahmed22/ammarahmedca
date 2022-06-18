import React, { useEffect } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Text as RechartsText, ResponsiveContainer } from 'recharts'
import { useColorModeValue, Spinner, Flex, useMediaQuery } from '@chakra-ui/react';
import { useQuery, gql } from "@apollo/client"

const fakeData = [
    {
        skill: "JavaScript",
        value: 90,
        fullValue: 100
    },
    {
        skill: "Python",
        value: 75,
        fullValue: 100
    },
    {
        skill: "HTML/CSS",
        value: 90,
        fullValue: 100
    },
    {
        skill: "MATLAB",
        value: 60,
        fullValue: 100
    },
    {
        skill: "C++",
        value: 30,
        fullValue: 100
    },
    {
        skill: "LaTeX",
        value: 60,
        fullValue: 100
    },
]

const SkillChart = ({ type }) => {

    const SKILL_DATA = gql`
        query SkillData($type: String){
            SkillData(type: $type){
                name
                value
                type
            }
        }
    `

    const { data, loading, error } = useQuery(SKILL_DATA, { variables: {
        type
    }})

    const [isLargerThan30em] = useMediaQuery(['(min-width: 30em)'])

    useEffect(() => {
        console.log("Larger than 30em:", isLargerThan30em)
    }, [isLargerThan30em])

    const primary = useColorModeValue("var(--chakra-colors-primaryLight)", "var(--chakra-colors-primaryDark)")
    const foreground = useColorModeValue("var(--chakra-colors-gray-800)", "var(--chakra-colors-white)")
    const lightForeground = useColorModeValue("var(--chakra-colors-gray-600)", "var(--chakra-colors-gray-400)")

    const renderPolarAngleAxis = ({ payload, x, y, cx, cy, ...rest }) => {
        return (
          <RechartsText
            {...rest}
            fontFamily="var(--chakra-fonts-body)"
            fill={foreground}
            verticalAnchor="middle"
            y={y + (y - cy) / 10}
            x={x + (x - cx) / 10}
          >
            {payload.value}
          </RechartsText>
        );
    }

    const renderPolarRadiusAxis = (props) => {

        const { payload, x, y, cx, cy, ...rest } = props

        //console.log(props)
        const labels = {
            0: "Unaware",
            25: "Aware",
            50: "Learning",
            75: "Competent",
            100: "Expert"
        }

        return (
            <RechartsText
                {...rest}
                fontFamily="var(--chakra-fonts-body)"
                verticalAnchor='middle'
                textAnchor='middle'
                fontSize={8}
                fill={lightForeground}
                x={x}
                y={y}
            >
                {labels[payload.value]}
            </RechartsText>
        )
    }

    
    if (!loading && data){
        return (
            <ResponsiveContainer width={"100%"} height="100%">
                <RadarChart outerRadius={isLargerThan30em ? "75%" : "55%"} data={data.SkillData} cy="50%">
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" tick={props => renderPolarAngleAxis(props)} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={props => renderPolarRadiusAxis(props)}/>
                    <Radar name="Skills" dataKey="value" stroke={primary} fill={primary} fillOpacity={0.6} />
                </RadarChart>
            </ResponsiveContainer>
            
        );
    }else{
        return (
            <Flex justify="center" align="center" w="100%" h="100%">
                <Spinner thickness='4px' speed="0.65s" emptyColor='gray.200' color={primary} size="xl" />
            </Flex>
            
        )
    }
    
}

export default SkillChart;
