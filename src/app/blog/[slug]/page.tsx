export type BlogPostProps = {
  params: {
    slug: string;
  };
};

export default function BlogPost({ params }: BlogPostProps) {
  return <div>Blog Post with slug: {params.slug}</div>;
}
