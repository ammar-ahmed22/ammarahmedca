"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { LoaderCircleIcon } from "lucide-react";

export type ImageWithLoadingProps = {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  loadingClassName?: string;
  iconClassName?: string;
};

export default function ImageWithLoading({
  src,
  alt,
  className,
  containerClassName,
  loadingClassName,
  iconClassName,
}: ImageWithLoadingProps) {
  const [loading, setLoading] = useState(true);

  return (
    <div
      className={cn(
        "w-full relative",
        containerClassName,
        loading && loadingClassName,
      )}
    >
      {loading && (
        <div className="absolute h-full w-full flex justify-center items-center">
          <LoaderCircleIcon
            className={cn("animate-spin size-24", iconClassName)}
          />
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={cn(className, {
          "opacity-0": loading,
        })}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}
