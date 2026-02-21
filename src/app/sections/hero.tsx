"use client";
import React from "react";
import Signature from "@/components/ui/signature";
import { ArrowDownIcon } from "lucide-react";
import Image from "next/image";

export type QuickLink = {
  href: string;
  label: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

export default function Hero() {
  return (
    <section className="flex flex-col min-h-screen pt-[10vh]">
      <header className="flex flex-col">
        <div className="flex gap-4 sm:text-7xl text-5xl font-display items-center flex-wrap font-bold z-20">
          <span>Hi, I&apos;m</span>
          <div className="flex items-center gap-3">
            <div className="border border-foreground rounded-2xl p-1 relative">
              <Image
                src="/pixelbw.jpg"
                alt="8 bit pixel art of Ammar Ahmed"
                width={500}
                height={500}
                className="rounded-2xl sm:size-24 size-14"
                priority
              />
            </div>
            <span>Ammar!</span>
          </div>
        </div>
        <div className="font-body sm:text-xl text-lg text-neutral font-bold">
          Muslim. Engineer. Husband. Father.
        </div>
        <div className="font-body sm:text-lg text-base text-neutral">
          I build software and write about my thoughts and
          experiences.
        </div>
        <div className="font-body sm:text-lg text-base text-neutral">
          Currently at the{" "}
          <a
            href="https://uwaterloo.ca"
            className="underline underline-offset-4"
          >
            University of Waterloo
          </a>
          .
        </div>
        <div className="flex justify-start pt-3 mb-3">
          <Signature className="h-[40vh]" duration={1} />
        </div>
        <a
          href="#projects"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("projects")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <ArrowDownIcon className="animate-bounce size-8 absolute bottom-3 left-1/2 -translate-x-1/2" />
        </a>
      </header>
    </section>
  );
}
