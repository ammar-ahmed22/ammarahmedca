import { leetcode } from "@/lib/api/leetcode";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
): Promise<NextResponse> {
  const searchParams = request.nextUrl.searchParams;

  const query = searchParams.get("query");
  const difficulty = searchParams.get("difficulty");

  const metadata = await leetcode.problemMetadata({
    query: query ?? undefined,
    difficulty: difficulty ?? undefined,
  });

  return NextResponse.json(metadata);
}
