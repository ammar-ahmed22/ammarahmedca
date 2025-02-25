"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { LoaderCircleIcon } from "lucide-react";

export type ImageWithLoadingProps = {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  iconClassName?: string;
};

export default function ImageWithLoading({
  src,
  alt,
  className,
  containerClassName,
  iconClassName,
}: ImageWithLoadingProps) {
  const [loading, setLoading] = useState(true);

  return (
    <div className={cn("w-full relative", containerClassName)}>
      {loading && (
        <div
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            containerClassName,
          )}>
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
