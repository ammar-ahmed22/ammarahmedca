import api from "@/lib/api";
import Metadata from "./metadata";
import Block from "@/components/ui/block";
import { Metadata as NextMetadata } from "next";
import { toPlainText } from "@/lib/notion/utils";
import { Suspense } from "react";

export type BlogPostProps = {
  params: Promise<{ slug: string }>;
};

export type Post = {
  id: string;
  title: string;
  content: string;
};

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await api.posts.list({ onlyPublished: true });
  return posts.map((post) => {
    return {
      slug: post.slug,
    };
  });
}

export async function generateMetadata({
  params,
}: BlogPostProps): Promise<NextMetadata> {
  const { slug } = await params;
  const [post] = await api.posts.list({ slug });
  const description = toPlainText(post.description);
  return {
    title: `~/blog/${post.slug}`,
    description,
    openGraph: {
      type: "article",
      description,
      siteName: "ammarahmed.ca",
      title: post.name,
      images: [
        post.image ??
          `/api/og?title=${encodeURIComponent(post.name)}&description=${encodeURIComponent(description)}`,
      ],
      tags: post.tags,
      url: "https://ammarahmed.ca/blog/" + post.slug,
    },
  };
}

export default async function BlogPost(props: BlogPostProps) {
  const { params } = props;
  const { slug } = await params;
  const { metadata, content } = await api.posts.content({ slug });
  return (
    <article className="flex flex-col gap-6">
      <Suspense>
        <Metadata metadata={metadata} />
      </Suspense>
      <span className="ascii-rule" />
      <div className="prose-mono flex flex-col gap-5">
        {content.map((block) => {
          return <Block key={block.id} block={block} />;
        })}
      </div>
      <div className="mt-12">
        <span className="ascii-rule" />
      </div>
    </article>
  );
}
