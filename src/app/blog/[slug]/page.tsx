export type BlogPostProps = {
  params: {
    slug: string;
  };
};

export default function BlogPost(props: BlogPostProps) {
  const { params } = props;
  return <div>Blog post with slug: {params.slug}</div>;
}
