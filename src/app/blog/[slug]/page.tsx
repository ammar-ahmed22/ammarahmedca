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
  const posts: Post[] = await fetch(
    "https://api.vercel.app/blog",
  ).then((res) => res.json());
  return posts.map((post) => {
    return {
      slug: String(post.id),
    };
  });
}

export default async function BlogPost(props: BlogPostProps) {
  const { params } = props;
  const slug = (await params).slug;
  const post: Post = await fetch(
    `https://api.vercel.app/blog/${slug}`,
  ).then((res) => res.json());
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
