import React, { useEffect } from 'react';
import { Treemap, ResponsiveContainer } from 'recharts';

const fakeData = [
    {
    name: "Languages",
    children: [
        {
            name: "JavaScript",
            size: 90,
        },
        {
            name: "Python",
            size: 75,
        },
        {
            name: "HTML/CSS",
            size: 90,
        },
        {
            name: "MATLAB",
            size: 60,
        },
        {
            name: "C++",
            size: 30,
        },
        {
            name: "LaTeX",
            size: 60,
        },
    ]
    },
    {
        name: "Frameworks",
        children: [
            {
                name: "React.js",
                size: 90,
            },
            {
                name: "Node.js",
                size: 90,
            },
            {
                name: "Express.js",
                size: 80,
            },
            {
                name: "Pandas",
                size: 50,
            },
            {
                name: "MongoDB",
                size: 70,
            },
            {
                name: "GraphQL",
                size: 40,
            },
        ]
        },
]

const CustomContent = (props) => {
    const { root, depth, x, y, width, height, index, payload, colors, rank, name, value } = props;
    useEffect(() => {
        // console.log("root area:", root.area)
        // console.log("curr area:", width * height)
        // console.log("curr / root:", (width * height) / root.area)
        //console.log(root.children)
        //console.log(name, root)
        console.log(props)
    }, [])

    const percentage = Math.round(((width * height) / root.area)*100)

    return (
        <g>
            <rect 
                x={x}
                y={y}
                width={width}
                height={height}
                style={{
                    fill: depth < 2 ? colors[Math.floor((index / root.children.length) * 6 )] : "none",
                    //fill: depth < 2 ? "var(--chakra-colors-primaryLight)": "none",
                    fillOpacity: 0.7,
                    stroke: "#fff",
                    strokeWidth: 2 / (depth + 1e-10),
                    strokeOpacity: 1 / (depth + 1e-10)
                }}
            />
            {
                depth === 2 ?
                <text x={x + width / 2} y={y + height / 2 + 6} textAnchor="middle" fill="#fff" fontSize={12}>
                    {name}
                </text>
                :
                null
            }
            {
                depth === 2 ?
                <text x={x + width / 2} y={y + height / 2 + 6 + 12} textAnchor="middle" fill="#fff" fontSize={8} fontWeight="normal">
                    {value}%
                </text>
                :
                null
            }
            {
                depth === 1 ? 
                <text x={x+4} y={y + 18} fill="#fff" fontSize={16} fillOpacity={0.9} >
                    {name}
                </text>
                :
                null
            }
        </g>
    )
}

const COLORS = ['#8889DD', '#9597E4', '#8DC77B', '#A5D297', '#E2CF45', '#F8C12D'];

const SkillTreeMap = () => {
    return (
        <ResponsiveContainer height="100%" width="100%">
            <Treemap 
                
                data={fakeData}
                dataKey="size"
                stroke="#fff"
                fill="#8884d8"
                aspectRatio={4 / 3}
                content={<CustomContent colors={COLORS}/>}
            />
        </ResponsiveContainer>
        
    );
}

export default SkillTreeMap;
