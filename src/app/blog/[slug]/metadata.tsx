"use client";
import { PostMetadata } from "@/types/api";
import Link from "next/link";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";

export type MetadataProps = {
  metadata: PostMetadata;
};

export default function Metadata({ metadata }: MetadataProps) {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const backHref = from === "home" ? "/" : "/blog";

  return (
    <header className="flex flex-col gap-4">
      <Link
        href={backHref}
        className="font-mono text-xs text-muted hover:text-foreground w-fit"
      >
        ← cd ..
      </Link>
      <div className="font-mono text-xs text-muted tabular-nums uppercase tracking-wider flex flex-wrap gap-2">
        {metadata.date && (
          <span>[{format(metadata.date, "yyyy-MM-dd")}]</span>
        )}
        {metadata.category && (
          <>
            <span>·</span>
            <span>{metadata.category}</span>
          </>
        )}
      </div>
      <h1 className="font-display text-4xl sm:text-5xl leading-[1.05]">
        {metadata.name}
      </h1>
      {metadata.tags.length > 0 && (
        <div className="font-mono text-xs text-muted">
          [
          {metadata.tags.map((t, i) => (
            <span key={t}>
              {i > 0 && ", "}#{t}
            </span>
          ))}
          ]
        </div>
      )}
    </header>
  );
}
