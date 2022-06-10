import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Text as RechartsText } from 'recharts'
import { useColorModeValue  } from '@chakra-ui/react';

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

    const primary = useColorModeValue("var(--chakra-colors-primaryLight)", "var(--chakra-colors-primaryDark)")
    return (
        <RadarChart outerRadius={90} width={450} height={250} data={fakeData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="skill" tick={props => renderPolarAngleAxis(props)} />
            <PolarRadiusAxis angle={20} domain={[0, 100]} />
            <Radar name="Languages" dataKey="value" stroke={primary} fill={primary} fillOpacity={0.6} />
            {/* <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} /> */}
            {/* <Legend /> */}
        </RadarChart>
    );
}

export default SkillChart;
