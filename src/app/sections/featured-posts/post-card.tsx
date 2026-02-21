import type { PostMetadata } from "@/types/api";
import RichText from "@/components/ui/rich-text";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import ImageWithLoading from "@/components/ui/loading-image";

export type PostCardProps = {
  post: PostMetadata;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="w-full h-full shadow-none flex-grow border-none hover:bg-neutral-300/50 dark:hover:bg-neutral-600/50 [&_img]:hover:scale-125 [&_img]:scale-100 cursor-pointer transition-all ease-in-out duration-200 relative">
        {post.image && post.category && (
          <Badge
            className="absolute top-4 left-4 z-20 rounded-full border-foreground/30 bg-background/60"
            variant="outline"
          >
            {post.category}
          </Badge>
        )}
        {post.image && (
          <div className="w-full overflow-hidden mb-4">
            <ImageWithLoading
              src={post.image}
              alt={post.name + " cover image"}
              className="w-full h-48 object-cover rounded-t-xl transition-transform duration-200 ease-in"
            />
          </div>
        )}
        <CardContent>
          {!post.image && post.category && (
            <div className="my-4">
              <Badge
                className="rounded-full border-foreground/30 bg-background/60"
                variant="outline"
              >
                {post.category}
              </Badge>
            </div>
          )}
          <span className="text-neutral">
            {post.date && format(post.date, "MMM dd, yyyy")}
          </span>
          <h4 className="text-xl font-bold mt-2">{post.name}</h4>
          <RichText as="p" data={post.description} className="mb-4" />
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, tagIdx) => {
              return (
                <Badge
                  key={`post-${post.id}-tag-${tagIdx}`}
                  variant="outline"
                  className="border-foreground/30"
                >
                  #{tag}
                </Badge>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
