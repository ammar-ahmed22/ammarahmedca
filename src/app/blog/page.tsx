import api from "@/lib/api";
import { Metadata } from "next";
import Posts from "./posts";

const description =
  "Sometimes I like to write about things I've worked on, my experiences, or anything else of interest to me.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  openGraph: {
    title: "Blog",
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
  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="md:w-3/5 w-full mb-8">
        <h1 className="text-4xl font-display font-bold text-center">
          Blog
        </h1>
        <p className="text-lg text-neutral text-center">
          {description}
        </p>
      </div>
      <Posts posts={posts} />
    </div>
  );
}
