"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavItem = {
  name: string;
  link: string;
  cmd: string;
};

const navItems: NavItem[] = [
  { name: "home", link: "/", cmd: "~" },
  { name: "about", link: "/about", cmd: "~/about" },
  { name: "blog", link: "/blog", cmd: "~/blog" },
  { name: "leetcode", link: "/leetcode", cmd: "~/leetcode" },
];

function isNavItemActive(link: string, pathname: string) {
  if (link === "/") return pathname === "/";
  return pathname.startsWith(link);
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 inset-x-0 z-[1000] border-b border-border bg-background">
      <div className="max-w-[72ch] mx-auto px-4 sm:px-8 h-12 flex items-center justify-between gap-4 text-base">
        <Link
          href="/"
          className="font-mono shrink-0 invert-on-hover px-1"
          aria-label="Home"
        >
          <span className="text-muted">ammar@web</span>
          <span className="text-foreground">:</span>
          <span className="text-muted">~</span>
          <span className="text-foreground">$</span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const active = isNavItemActive(item.link, pathname);
            return (
              <Link
                key={item.link}
                href={item.link}
                className={cn(
                  "px-2 py-0.5 font-mono text-sm transition-colors",
                  active
                    ? "bg-foreground text-background"
                    : "text-muted hover:text-foreground",
                )}
              >
                {item.cmd}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3 shrink-0">
          <a
            href="https://github.com/ammar-ahmed22/ammarahmedca"
            target="_blank"
            rel="noreferrer noopener"
            className="font-mono text-base text-muted hover:text-foreground"
          >
            [github↗]
          </a>
        </div>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden font-mono text-base px-2 py-0.5 text-foreground"
          aria-label="Menu"
        >
          {menuOpen ? "[x]" : "[menu]"}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="max-w-[72ch] mx-auto px-4 py-4 flex flex-col gap-1">
            {navItems.map((item) => {
              const active = isNavItemActive(item.link, pathname);
              return (
                <Link
                  key={item.link}
                  href={item.link}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "px-2 py-1 font-mono text-base",
                    active
                      ? "bg-foreground text-background"
                      : "text-muted hover:text-foreground",
                  )}
                >
                  {item.cmd}
                </Link>
              );
            })}
            <div className="flex gap-3 pt-2 mt-2 border-t border-border">
              <a
                href="https://github.com/ammar-ahmed22/ammarahmedca"
                target="_blank"
                rel="noreferrer noopener"
                className="font-mono text-base text-muted hover:text-foreground"
              >
                [github↗]
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
