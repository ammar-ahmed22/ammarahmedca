import React, { useEffect } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Text as RechartsText, ResponsiveContainer } from 'recharts'
import { useColorModeValue  } from '@chakra-ui/react';
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

    const renderPolarAngleAxis = ({ payload, x, y, cx, cy, ...rest }) => {
        return (
          <RechartsText
            {...rest}
            fontFamily="var(--chakra-fonts-body)"
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

        console.log(props)
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
                fill="var(--chakra-colors-gray-600)"
                x={x}
                y={y}
            >
                {labels[payload.value]}
            </RechartsText>
        )
    }

    const primary = useColorModeValue("var(--chakra-colors-primaryLight)", "var(--chakra-colors-primaryDark)")
    if (!loading && data){
        return (
            <ResponsiveContainer width={"100%"} height="100%">
                <RadarChart outerRadius="50%" data={data.SkillData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" tick={props => renderPolarAngleAxis(props)} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={props => renderPolarRadiusAxis(props)}/>
                    <Radar name="Languages" dataKey="value" stroke={primary} fill={primary} fillOpacity={0.6} />
                    {/* <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} /> */}
                    {/* <Legend /> */}
                </RadarChart>
            </ResponsiveContainer>
            
        );
    }else{
        return (
            <div>
                LOADING...
            </div>
        )
    }
    
}

export default SkillChart;
