"use client";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-start justify-center gap-4 font-mono">
      <div className="text-xs text-muted">~ $ ./load-page</div>
      <div className="flex flex-col gap-2 max-w-[68ch]">
        <p className="text-base">
          <span className="text-muted">error: </span>
          {process.env.NODE_ENV === "development"
            ? error.name
            : "something went wrong"}
        </p>
        <p className="text-base text-muted">
          {process.env.NODE_ENV === "development"
            ? error.message
            : "the page failed to load. try again."}
        </p>
      </div>
      <button
        onClick={() => reset()}
        className="font-mono text-base border border-border px-3 py-1.5 hover:bg-foreground hover:text-background"
      >
        [retry]
      </button>
    </div>
  );
}
