"use client"; // Error boundaries must be Client Components
import { useEffect } from "react";
import { CircleAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="w-screen h-screen flex flex-col gap-3 justify-center items-center absolute top-0 left-0">
      <CircleAlertIcon className="size-16 text-foreground" />
      <div className="text-center">
        <h2 className="text-2xl font-bold">
          {process.env.NODE_ENV === "development"
            ? error.name
            : "Oops!"}
        </h2>
        <p className="text-neutral-500 text-lg">
          {/* Something went wrong loading this page */}
          {process.env.NODE_ENV === "development"
            ? error.message
            : "Something went wrong loading this page"}
        </p>
      </div>
      <Button variant="outline" onClick={() => reset()}>
        Try Again
      </Button>
    </div>
  );
}
