import api from "@/lib/api";
import { Metadata } from "next";
import Posts from "./posts";

const description =
  "Sometimes I like to write about things I've worked on, my experiences, or anything else of interest to me.";

export const metadata: Metadata = {
  title: "~/blog",
  description,
  openGraph: {
    title: "blog",
    description,
    type: "website",
    siteName: "ammarahmed.ca",
    images: [
      `/api/og?title=Blog&description=${encodeURIComponent(description)}`,
    ],
  },
};

export const revalidate = 60;

export default async function Blog() {
  const posts = await api.posts.list({ onlyPublished: true });

  const allTags = [...new Set(posts.flatMap((p) => p.tags))].sort();
  const allCategories = [
    ...new Set(
      posts.map((p) => p.category).filter(Boolean) as string[],
    ),
  ].sort();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 mb-4">
        <div className="font-mono text-sm text-muted">$ ls -lt</div>
        <h1 className="font-display text-5xl sm:text-6xl leading-none">
          blog.
        </h1>
        <p className="font-mono text-base text-muted max-w-[68ch]">
          {description}
        </p>
      </div>
      <span className="ascii-rule" />
      <Posts
        posts={posts}
        allTags={allTags}
        allCategories={allCategories}
      />
    </div>
  );
}
