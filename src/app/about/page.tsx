import { Metadata } from "next";
import api from "@/lib/api";
import Block from "../blog/[slug]/block";

export async function generateMetadata(): Promise<Metadata> {
  const [post] = await api.posts.list({ slug: "about" });
  return {
    title: "About",
    description: post.description.map((r) => r.plainText).join(""),
    openGraph: {
      title: "About",
      description: post.description.map((r) => r.plainText).join(""),
      type: "website",
      siteName: "ammarahmed.ca",
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
