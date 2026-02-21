import api from "@/lib/api";
import PostCard from "./post-card";

export const revalidate = 60;

export default async function FeaturedPosts() {
  const posts = await api.posts.list({ onlyPublished: true });
  const featuredPosts = posts.slice(0, 4);

  return (
    <section id="featured-posts" className="min-h-screen mb-24">
      <h2 className="text-4xl mb-1 font-display font-bold">
        Featured Posts
      </h2>
      <p className="text-neutral text-lg mb-4">
        Check out my latest blog posts!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuredPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
