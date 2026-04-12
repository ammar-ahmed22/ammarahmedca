import api from "@/lib/api";
import PostRow from "./post-card";
import Link from "next/link";

export const revalidate = 60;

export default async function FeaturedPosts() {
  const posts = await api.posts.list({ onlyPublished: true });
  const featuredPosts = posts.slice(0, 6);

  return (
    <section id="featured-posts" className="py-16 sm:py-24">
      <div className="flex items-baseline justify-between mb-2">
        <h2 className="font-mono text-base text-muted">
          ~/blog $ ls -lt | head -6
        </h2>
        <Link
          href="/blog?from=home"
          className="font-mono text-sm text-muted hover:text-foreground"
        >
          [view all↗]
        </Link>
      </div>
      <span className="ascii-rule mb-4" />
      <ul className="flex flex-col">
        {featuredPosts.map((post) => (
          <PostRow
            key={post.id}
            post={post}
            href={`/blog/${post.slug}?from=home`}
          />
        ))}
      </ul>
    </section>
  );
}
