import { NextRequest, NextResponse } from "next/server";
import { notion } from "@/lib/notion/client";
import { isFullBlock } from "@notionhq/client";
import { fetchImageResponse } from "@/lib/api/utils";

interface Options {
  params: Promise<Params>;
}

interface Params {
  id: string;
  resource: string;
}

const ALLOWED_RESOURCES = ["image", "video"];
export async function GET(req: NextRequest, { params }: Options) {
  try {
    const { id, resource } = await params;
    if (!ALLOWED_RESOURCES.includes(resource)) {
      return NextResponse.json(
        { error: "Invalid resource" },
        { status: 400 },
      );
    }
    const block = await notion.blocks.retrieve({ block_id: id });
    if (!isFullBlock(block)) {
      return NextResponse.json(
        { error: "Invalid block" },
        { status: 400 },
      );
    }

    if (resource === "image" && block.type === "image") {
      const imageUrl =
        block.image.type === "external"
          ? block.image.external.url
          : block.image.file.url;
      return fetchImageResponse(imageUrl);
    }

    if (resource === "video" && block.type === "video") {
      const videoUrl =
        block.video.type === "external"
          ? block.video.external.url
          : block.video.file.url;
      return fetchImageResponse(videoUrl);
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
