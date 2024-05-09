import React from 'react'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Text as RechartsText,
  ResponsiveContainer,
} from 'recharts'
import { useBreakpointValue } from '../../../../hooks/mediaQuery'
import { Spinner } from '@nextui-org/react'
import { useQuery } from '@apollo/client'
import {
  SkillsQuery,
  SKILLS_QUERY,
} from '../../../../graphql/queries/Skills'

interface SkillChartProps {
  type: string
}

const SkillChart: React.FC<SkillChartProps> = ({ type }) => {
  const { data, loading } = useQuery<
    SkillsQuery.Response,
    SkillsQuery.Variables
  >(SKILLS_QUERY, {
    variables: {
      onlyType: type,
    },
  })

  const foreground =
    'hsl(var(--ammarahmed-foreground) / var(--ammarahmed-foreground-opacity, var(--tw-text-opacity)))'
  const default500 =
    'hsl(var(--ammarahmed-default-500) / var(--ammarahmed-default-500-opacity, var(--tw-text-opacity)))'
  const primary =
    'hsl(var(--ammarahmed-primary) / var(--ammarahmed-primary-opacity, var(--tw-bg-opacity)))'
  const size = useBreakpointValue({ default: '55%', md: '75%' })

  React.useEffect(() => {
    console.log({ size })
  }, [size])

  const CustomPolarAngleAxis: React.FC<any> = ({
    payload,
    x,
    y,
    cx,
    cy,
    ...rest
  }) => {
    return (
      <RechartsText
        {...rest}
        // fontFamily="var(--ammar-fonts-body)"
        fill={foreground}
        verticalAnchor='middle'
        y={y + (y - cy) / 10}
        x={x + (x - cx) / 10}
      >
        {payload.value}
      </RechartsText>
    )
  }

  const CustomPolarRadiusAxis: React.FC<any> = ({
    payload,
    x,
    y,
    cx,
    cy,
    ...rest
  }) => {
    const labels: Record<number, string> = {
      0: 'Unaware',
      25: 'Aware',
      50: 'Learning',
      75: 'Competent',
      100: 'Expert',
    }

    return (
      <RechartsText
        {...rest}
        // fontFamily="var(--chakra-fonts-body)"
        verticalAnchor='middle'
        textAnchor='middle'
        fontSize={8}
        fill={default500}
        x={x}
        y={y}
      >
        {labels[payload.value]}
      </RechartsText>
    )
  }

  if (!loading && data) {
    return (
      <ResponsiveContainer width={'100%'} height='100%'>
        <RadarChart outerRadius={size} data={data.skills} cy='50%'>
          <PolarGrid />
          <PolarAngleAxis
            dataKey='name'
            tick={(props) => <CustomPolarAngleAxis {...props} />}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={(props) => <CustomPolarRadiusAxis {...props} />}
          />
          <Radar
            name='Skills'
            dataKey='value'
            stroke={primary}
            fill={primary}
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    )
  } else {
    return (
      <div className='flex items-center justify-center size-full'>
        <Spinner size='lg' color='primary' />
      </div>
      // <Flex justify="center" align="center" w="100%" h="100%">
      //   <Spinner
      //     thickness="4px"
      //     speed="0.65s"
      //     emptyColor="gray.200"
      //     color={primary}
      //     size="xl"
      //   />
      // </Flex>
    )
  }
}

export default SkillChart
