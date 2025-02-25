import api from "@/lib/api";
import Metadata from "./metadata";
import Block from "./block";

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

export default async function BlogPost(props: BlogPostProps) {
  const { params } = props;
  const { slug } = await params;
  const { metadata, content } = await api.posts.content({ slug });
  console.log(content);
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
