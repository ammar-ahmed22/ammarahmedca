import api from "@/lib/api";
import Metadata from "./metadata";
import Block from "./block";
import { Metadata as NextMetadata } from "next";
import { toPlainText } from "@/lib/notion/utils";

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
  return {
    title: post.name,
    description: toPlainText(post.description),
    openGraph: {
      type: "article",
      description: toPlainText(post.description),
      siteName: "ammarahmed.ca",
      title: post.name,
      images: post.image ? [post.image] : [],
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
    <div className="flex flex-col gap-4">
      <Metadata metadata={metadata} />
      <div className="flex flex-col gap-4">
        {content.map((block) => {
          return <Block key={block.id} block={block} />;
        })}
      </div>
    </div>
  );
}
