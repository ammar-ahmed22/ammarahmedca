import { Metadata } from "next";
import api from "@/lib/api";
import Block from "@/components/ui/block";
import { toPlainText } from "@/lib/notion/utils";
import Signature from "@/components/ui/signature";

export async function generateMetadata(): Promise<Metadata> {
  const [post] = await api.posts.list({ slug: "about" });
  const description = toPlainText(post.description);
  return {
    title: "~/about",
    description,
    openGraph: {
      title: "about",
      description: toPlainText(post.description),
      type: "website",
      siteName: "ammarahmed.ca",
      images: [
        `/api/og?title=About&description=${encodeURIComponent(description)}`,
      ],
    },
  };
}

export const revalidate = 60;

export default async function About() {
  const { content } = await api.posts.content({ slug: "about" });
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="font-mono text-xs text-muted">
          ~ $ cat about.md
        </div>
        <h1 className="font-display text-5xl sm:text-6xl leading-none">
          about.
        </h1>
      </div>
      <span className="ascii-rule" />
      <div className="prose-mono flex flex-col gap-5">
        {content.map((block) => {
          return <Block key={block.id} block={block} />;
        })}
      </div>
      <div className="mt-8 flex flex-col items-start gap-2">
        <Signature
          className="h-20 w-auto text-foreground"
          animationType="repeat"
          duration={1.2}
        />
        <span className="font-mono text-xs text-muted">— ammar</span>
      </div>
    </div>
  );
}
