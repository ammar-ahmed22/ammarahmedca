"use client";
import React from "react";
import Signature from "@/components/ui/signature";
import {
  ArrowDownIcon,
  HammerIcon,
  BabyIcon,
  GemIcon,
} from "lucide-react";
import { PiMosqueBold } from "react-icons/pi";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export type QuickLink = {
  href: string;
  label: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

export type BadgeContent = {
  icon: React.ReactNode;
  label: string;
};

export default function Hero() {
  const badges: BadgeContent[] = [
    {
      icon: <HammerIcon className="size-3" />,
      label: "Engineer",
    },
    {
      icon: <PiMosqueBold className="size-3" />,
      label: "Muslim",
    },
    {
      icon: <GemIcon className="size-3" />,
      label: "Husband",
    },
    {
      icon: <BabyIcon className="size-3" />,
      label: "Father",
    },
  ];
  return (
    <section className="flex flex-col min-h-screen pt-[10vh]">
      <header className="flex flex-col">
        <div className="flex gap-2 items-center mb-2">
          {badges.map((badge, index) => {
            return (
              <Badge
                key={index}
                className="w-fit rounded-full border-primary/30 flex items-center gap-2"
                variant="outline"
              >
                {badge.icon} {badge.label}
              </Badge>
            );
          })}
        </div>
        <div className="flex gap-4 sm:text-7xl text-5xl font-display items-center flex-wrap font-bold z-20 mb-4">
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
