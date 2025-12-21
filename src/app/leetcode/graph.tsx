"use client";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Cell, Label, Pie, PieChart, Sector } from "recharts";
import { type PieSectorDataItem } from "recharts/types/polar/Pie";

export type LeetcodeGraphProps = {
  easy?: number;
  medium?: number;
  hard?: number;
  active?: "easy" | "medium" | "hard";
};
const difficulties = ["easy", "medium", "hard"] as const;

const colors = {
  easy: { base: "var(--green-600)", hover: "var(--green-500)" },
  medium: { base: "var(--yellow-600)", hover: "var(--yellow-500)" },
  hard: { base: "var(--red-600)", hover: "var(--red-500)" },
};

export function LeetcodeGraph({
  easy = 0,
  medium = 0,
  hard = 0,
  active,
}: LeetcodeGraphProps) {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(
    null,
  );

  const totalProblems = useMemo(() => {
    if (!active) {
      return easy + medium + hard;
    }
    if (active === "easy") {
      return easy;
    }
    if (active === "medium") {
      return medium;
    }
    if (active === "hard") {
      return hard;
    }
  }, [easy, medium, hard, active]);
  const activeIndex = useMemo(() => {
    if (!active) {
      return -1;
    }

    if (active === "easy") {
      return 0;
    }
    if (active === "medium") {
      return 1;
    }
    if (active === "hard") {
      return 2;
    }
  }, [active]);
  const chartConfig = {
    problems: {
      label: "Problems",
    },
    easy: {
      label: "Easy",
      color: "var(--green-600)",
    },
    medium: {
      label: "Medium",
      color: "var(--yellow-600)",
    },
    hard: {
      label: "Hard",
      color: "var(--red-600)",
    },
  } satisfies ChartConfig;

  const chartData = [
    { difficulty: "easy", value: easy },
    { difficulty: "medium", value: medium },
    { difficulty: "hard", value: hard },
  ];

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="difficulty"
          innerRadius={60}
          strokeWidth={5}
          activeIndex={activeIndex}
          activeShape={({
            outerRadius = 0,
            ...props
          }: PieSectorDataItem) => (
            <Sector {...props} outerRadius={outerRadius + 10} />
          )}
          onMouseEnter={(_, index) => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {chartData.map((entry, index) => {
            const difficulty = difficulties[index];
            const isHovered = hoveredIndex === index;
            return (
              <Cell
                key={`cell-${index}`}
                fill={
                  isHovered
                    ? colors[difficulty].hover
                    : colors[difficulty].base
                }
                onClick={() => router.push(`/leetcode/${difficulty}`)}
                style={{ cursor: "pointer" }}
              />
            );
          })}
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {totalProblems}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Problems
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
