"use client";
import Signature from "@/components/ui/signature";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-[72ch] mx-auto px-4 sm:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="flex items-start flex-col gap-3">
            <Signature
              className="h-16 w-auto text-foreground"
              animationType="once"
              duration={1.2}
            />
            <span className="font-mono text-xs text-muted">
              — ammar ahmed, {year}
            </span>
          </div>
          <div className="flex flex-col gap-1 font-mono text-base">
            <a
              href="https://www.linkedin.com/in/ammarahmed2203/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground"
            >
              [linkedin↗]
            </a>
            <a
              href="https://github.com/ammar-ahmed22"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground"
            >
              [github↗]
            </a>
            <a
              href="mailto:ammar.ahmed1@uwaterloo.ca"
              className="text-muted hover:text-foreground"
            >
              [email↗]
            </a>
          </div>
        </div>
        <div className="mt-10 text-center font-mono text-xs text-muted select-none">
          --EOF--
        </div>
      </div>
    </footer>
  );
}
