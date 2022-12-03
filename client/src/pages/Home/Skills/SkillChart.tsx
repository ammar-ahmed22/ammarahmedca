import React, { useEffect } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Text as RechartsText,
  ResponsiveContainer,
} from "recharts";
import {
  useColorModeValue,
  Spinner,
  Flex,
  useMediaQuery,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import {
  SkillsQuery,
  SkillsQueryVariables,
  SkillQueryResponse,
} from "../../../graphql/queries/Skills";

interface SkillChartProps {
  type: string;
}

const SkillChart: React.FC<SkillChartProps> = ({ type }) => {
  const { data, loading } = useQuery<SkillQueryResponse, SkillsQueryVariables>(
    SkillsQuery,
    {
      variables: {
        onlyType: type,
      },
    }
  );

  const [isLargerThan30em] = useMediaQuery(["(min-width: 30em)"]);

  useEffect(() => {
    console.log("Larger than 30em:", isLargerThan30em);
  }, [isLargerThan30em]);

  const primary = "var(--ammar-colors-brand-purple-500)";
  const foreground = useColorModeValue(
    "var(--ammar-colors-gray-800)",
    "var(--ammar-colors-white)"
  );
  const lightForeground = useColorModeValue(
    "var(--ammar-colors-gray-600)",
    "var(--ammar-colors-gray-400)"
  );

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
        fontFamily="var(--ammar-fonts-body)"
        fill={foreground}
        verticalAnchor="middle"
        y={y + (y - cy) / 10}
        x={x + (x - cx) / 10}
      >
        {payload.value}
      </RechartsText>
    );
  };

  const CustomPolarRadiusAxis: React.FC<any> = ({
    payload,
    x,
    y,
    cx,
    cy,
    ...rest
  }) => {
    const labels: Record<number, string> = {
      0: "Unaware",
      25: "Aware",
      50: "Learning",
      75: "Competent",
      100: "Expert",
    };

    return (
      <RechartsText
        {...rest}
        fontFamily="var(--chakra-fonts-body)"
        verticalAnchor="middle"
        textAnchor="middle"
        fontSize={8}
        fill={lightForeground}
        x={x}
        y={y}
      >
        {labels[payload.value]}
      </RechartsText>
    );
  };

  if (!loading && data) {
    return (
      <ResponsiveContainer width={"100%"} height="100%">
        <RadarChart
          outerRadius={isLargerThan30em ? "75%" : "55%"}
          data={data.skills}
          cy="50%"
        >
          <PolarGrid />
          <PolarAngleAxis
            dataKey="name"
            tick={(props) => <CustomPolarAngleAxis {...props} />}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={(props) => <CustomPolarRadiusAxis {...props} />}
          />
          <Radar
            name="Skills"
            dataKey="value"
            stroke={primary}
            fill={primary}
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    );
  } else {
    return (
      <Flex justify="center" align="center" w="100%" h="100%">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color={primary}
          size="xl"
        />
      </Flex>
    );
  }
};

export default SkillChart;
