import RepeatGenerateSentence from "@/components/ui/repeat-generate-sentence";
import Image from "next/image";
import { sentences } from "./data";
import Signature from "@/components/ui/signature";
import ScrollIndicator from "@/components/ui/scroll-indicator";
import { ArrowDownIcon } from "lucide-react";

export default function Home() {
  return (
    <section className="flex flex-col min-h-screen pt-[10vh]">
      <header className="flex flex-col">
        <div className="flex gap-2 sm:text-8xl text-6xl items-center flex-wrap font-bold z-20">
          <span>Hi, I&apos;m</span>
          <div className="flex items-center gap-2">
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
        <RepeatGenerateSentence
          duration={1}
          hold={1}
          className="sm:text-5xl text-3xl text-neutral-500 mb-3 z-20"
          sentences={sentences}
        />
        <div className="flex justify-end pt-3 mb-3">
          <Signature className="h-[40vh]" duration={1} />
        </div>
        <ScrollIndicator className="absolute bottom-3 left-1/2 translate-x-[-50%]">
          <ArrowDownIcon className="size-8" />
        </ScrollIndicator>
      </header>
    </section>
  );
}
