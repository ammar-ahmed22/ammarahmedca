import type { PostMetadata } from "@/types/api";
import { format } from "date-fns";
import Link from "next/link";

export type PostRowProps = {
  post: PostMetadata;
  href: string;
};

export default function PostRow({ post, href }: PostRowProps) {
  return (
    <li>
      <Link
        href={href}
        className="group flex flex-col gap-2 py-3 border-b border-border font-mono text-base hover:bg-foreground hover:text-background transition-colors px-1"
      >
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-baseline gap-4">
            <span className="text-muted group-hover:text-background shrink-0 tabular-nums">
              {post.date
                ? format(post.date, "yyyy-MM-dd")
                : "----------"}
            </span>
            {post.category && (
              <span className="text-muted group-hover:text-background shrink-0 uppercase text-xs tracking-wider">
                {post.category}/
              </span>
            )}
          </div>
          {post.tags.length > 0 && (
            <span className="text-muted group-hover:text-background text-sm shrink-0">
              [{post.tags.slice(0, 3).join(", ")}]
            </span>
          )}
        </div>
        <span className="truncate">{post.name}</span>
      </Link>
    </li>
  );
}
