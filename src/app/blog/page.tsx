import api from "@/lib/api";
import { Metadata } from "next";
import Posts from "./posts";

export const metadata: Metadata = {
  title: "Blog",
};

export default async function Blog() {
  const posts = await api.posts.list({ onlyPublished: true });
  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="md:w-3/5">
        <h1 className="text-4xl font-bold text-center">Blog</h1>
        <p className="text-lg text-neutral text-center">
          Sometimes I like to write about things I&apos;ve worked on,
          my experiences, or anything else of interest to me.
        </p>
      </div>
      <Posts posts={posts} />
    </div>
  );
}
