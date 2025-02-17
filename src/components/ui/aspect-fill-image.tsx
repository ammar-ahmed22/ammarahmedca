"use client";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

export type AspectFillImageProps = Omit<
  ImageProps,
  "layout" | "objectFit" | "onLoad"
>;

export default function AspectFillImage(props: AspectFillImageProps) {
  const [paddingTop, setPaddingTop] = useState<string>("0");

  return (
    <div className="relative" style={{ paddingTop }}>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        {...props}
        layout="fill"
        objectFit="contain"
        onLoad={({ target }) => {
          const { naturalHeight, naturalWidth } =
            target as HTMLImageElement;
          setPaddingTop(
            `calc(100% / (${naturalWidth} / ${naturalHeight}))`,
          );
        }}
      />
    </div>
  );
}
