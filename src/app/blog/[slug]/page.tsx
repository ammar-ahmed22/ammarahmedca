import api from "@/lib/api";

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
  const content = await api.posts.content({ slug });
  console.log(content);
  return <div>Check the console.</div>;
}
