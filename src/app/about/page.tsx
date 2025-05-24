import { Metadata } from "next";
import api from "@/lib/api";
import Block from "@/components/ui/block";
import { toPlainText } from "@/lib/notion/utils";

export async function generateMetadata(): Promise<Metadata> {
  const [post] = await api.posts.list({ slug: "about" });
  const description = toPlainText(post.description);
  return {
    title: "About",
    description,
    openGraph: {
      title: "About",
      description: toPlainText(post.description),
      type: "website",
      siteName: "ammarahmed.ca",
      images: [
        `/api/og?title=About&description=${encodeURIComponent(description)}`,
      ],
    },
  };
}

export default async function About() {
  const { content } = await api.posts.content({ slug: "about" });
  return (
    <div className="w-full flex flex-col gap-4">
      {content.map((block) => {
        return <Block key={block.id} block={block} />;
      })}
    </div>
  );
}
