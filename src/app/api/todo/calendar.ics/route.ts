import { NextResponse } from "next/server";
import { databases } from "@/lib/api/database";
import Properties from "@/lib/notion/properties";
import { filterDatabaseResults } from "@/lib/notion/utils";
import { subMinutes } from "date-fns";
import type { DatabaseQueryParams } from "@/lib/api/database";
import { createEvents } from "ics";

async function getAllPaginated(params: DatabaseQueryParams) {
  const allResults = [];
  let cursor: string | undefined = undefined;
  do {
    const response = await databases.todo.query({
      ...params,
      start_cursor: cursor,
    });
    allResults.push(...filterDatabaseResults(response.results));
    cursor = response.has_more
      ? response.next_cursor || undefined
      : undefined;
  } while (cursor);

  return allResults;
}

export async function GET(): Promise<NextResponse> {
  const completedStatuses = [
    "Complete",
    "Done",
    "Not Submitted (Zero)",
    "No longer needed",
  ];
  const results = await getAllPaginated({
    filter: {
      and: [
        ...completedStatuses.map((status) => ({
          property: "Status",
          status: {
            does_not_equal: status,
          },
        })),
        {
          property: "Status",
          status: {
            is_not_empty: true,
          },
        },
      ],
    },
    sorts: [
      {
        property: "Due Date",
        direction: "ascending",
      },
    ],
    page_size: 100,
  });

  const { error, value } = createEvents(
    results.map((result) => {
      const properties = new Properties(result.properties);
      const name = properties.get("Name").asTitle();
      const course = properties.get("Class").asSelect();
      const dateRange = properties.get("Due Date").asDateRange();

      if (!name) {
        throw new Error("Event name is required");
      }
      if (!dateRange) {
        throw new Error("Event date is required");
      }

      const shared = {
        title: name,
        location: course,
      };

      if (dateRange.end) {
        return {
          ...shared,
          start: dateRange.start.getTime(),
          end: dateRange.end.getTime(),
        };
      } else {
        return {
          ...shared,
          start: subMinutes(dateRange.start, 10).getTime(),
          duration: { minutes: 10 },
        };
      }
    }),
  );

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  } else {
    return new NextResponse(value, {
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": 'attachment; filename="calendar.ics"',
      },
    });
  }
}
