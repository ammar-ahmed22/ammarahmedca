import { NextRequest, NextResponse } from "next/server";
import { notion } from "@/lib/notion/client";
import { isFullPage } from "@notionhq/client";
import { fetchImageResponse } from "@/lib/api/utils";

interface Options {
  params: Promise<Params>;
}

interface Params {
  id: string;
  resource: string;
}

const ALLOWED_RESOURCES = ["cover", "icon"];
export async function GET(req: NextRequest, { params }: Options) {
  try {
    const { id, resource } = await params;
    if (!ALLOWED_RESOURCES.includes(resource)) {
      return NextResponse.json(
        { error: "Invalid resource" },
        { status: 400 },
      );
    }
    const page = await notion.pages.retrieve({ page_id: id });
    if (!isFullPage(page)) {
      return NextResponse.json(
        { error: "Invalid page" },
        { status: 400 },
      );
    }

    if (resource === "cover" && page.cover) {
      const imageUrl =
        page.cover.type === "external"
          ? page.cover.external.url
          : page.cover.file.url;
      return fetchImageResponse(imageUrl);
    }

    if (
      resource === "icon" &&
      page.icon &&
      page.icon.type !== "emoji"
    ) {
      const imageUrl =
        page.icon.type === "external"
          ? page.icon.external.url
          : page.icon.file.url;
      return fetchImageResponse(imageUrl);
    }

    return NextResponse.json(
      { error: "Resource not found" },
      { status: 404 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
