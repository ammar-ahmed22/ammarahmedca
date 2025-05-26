"use client";
import React from "react";
import Signature from "@/components/ui/signature";
import { ArrowDownIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type QuickLink = {
  href: string;
  label: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

export default function Hero() {
  const quickLinks: QuickLink[] = [
    {
      href: "/blog",
      label: "Blog",
    },
    {
      href: "#projects",
      label: "Projects",
      onClick(e) {
        e.preventDefault();
        document
          .getElementById("projects")
          ?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      href: "#experience",
      label: "Experience",
      onClick(e) {
        e.preventDefault();
        document
          .getElementById("experience")
          ?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      href: "/leetcode",
      label: "Leetcode",
    },
  ];
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
        <p className="sm:text-2xl text-lg text-neutral mb-2">
          Engineer • Muslim • Husband • Father
        </p>
        <div className="flex gap-2 items-center">
          {quickLinks.map((link, i, all) => {
            const isLast = i === all.length - 1;
            return (
              <React.Fragment key={link.href}>
                <Link
                  href={link.href}
                  onClick={link.onClick}
                  className="hover:underline">
                  {link.label}
                </Link>
                {!isLast && <span>•</span>}
              </React.Fragment>
            );
          })}
        </div>
        <div className="flex justify-end pt-3 mb-3">
          <Signature className="h-[40vh]" duration={1} />
        </div>
        <a
          href="#projects"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("projects")
              ?.scrollIntoView({ behavior: "smooth" });
          }}>
          <ArrowDownIcon className="animate-bounce size-8 absolute bottom-3 left-1/2 -translate-x-1/2" />
        </a>
      </header>
    </section>
  );
}
