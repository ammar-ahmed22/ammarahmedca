import { NextResponse } from "next/server";

export const toSlug = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .split(" ")
    .join("-");
};

export async function fetchImageResponse(url: string) {
  const imageResponse = await fetch(url);
  if (!imageResponse.ok) {
    return NextResponse.json(
      { error: "Failed to fetch image" },
      { status: 500 },
    );
  }
  const contentType = imageResponse.headers.get("content-type");
  if (!contentType) {
    return NextResponse.json(
      { error: "Failed to fetch image" },
      { status: 500 },
    );
  }
  return new NextResponse(imageResponse.body, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control":
        "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}
