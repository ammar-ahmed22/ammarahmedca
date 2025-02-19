import ScrollIndicator from "@/components/ui/scroll-indicator";
import Signature from "@/components/ui/signature";
import { ArrowDownIcon } from "lucide-react";
import Image from "next/image";

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
        <p className="sm:text-2xl text-lg text-neutral-500">
          Engineer • Muslim • Husband • Father
        </p>
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
