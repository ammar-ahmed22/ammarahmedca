"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { MoonIcon, SunIcon, HomeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useThemeValue, useToggleTheme } from "@/hooks/theme";
import { SiGithub } from "react-icons/si";
import { usePathname } from "next/navigation";

export type NavItem = {
  name: string;
  link: string;
  icon?: React.ReactNode;
};

const navItems: NavItem[] = [
  {
    name: "Home",
    link: "/",
    icon: <HomeIcon className="size-4" strokeWidth="3px" />,
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Blog",
    link: "/blog",
  },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const pathname = usePathname();

  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (typeof current === "number") {
      const direction = current! - lastScrollY;
      setLastScrollY(current);

      if (current < 50) {
        setVisible(true);
      } else {
        if (direction > 0) {
          setVisible(false);
        } else {
          setVisible(true);
        }
      }
    }
  });

  const themeToggleIcon = useThemeValue(<MoonIcon />, <SunIcon />);
  const toggleTheme = useToggleTheme();
  const logoSrc = useThemeValue(
    "/LogoIcon-light.png",
    "/LogoIcon-dark.png",
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.35,
        }}
        className={cn(
          "flex max-w-4xl fixed top-10 inset-x-0 mx-auto border border-black/[0.2] dark:border-white/[0.2] rounded-xl bg-background shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] px-4 py-4  items-center justify-between space-x-4",
          {
            "border-none shadow-none": lastScrollY === 0,
          },
        )}
      >
        <Image
          src={logoSrc}
          alt="Logo for ammarahmed.ca"
          width={40}
          height={40}
          priority
        />
        <div className="flex gap-12">
          {navItems.map((navItem: NavItem, idx: number) => {
            let isActive = false;
            if (navItem.link === "/") {
              isActive = pathname === "/";
            } else {
              isActive = pathname.startsWith(navItem.link);
            }
            return (
              <Link
                key={`link=${idx}`}
                href={navItem.link}
                className={cn(
                  "relative dark:text-neutral-400 items-center flex space-x-1 text-neutral-500 dark:hover:text-neutral-300 hover:text-neutral-600",
                  {
                    "dark:text-neutral-50 text-neutral-900 dark:border-neutral-50 border-neutral-900":
                      isActive,
                  },
                )}
              >
                <span className="hidden sm:block text-md">
                  {navItem.name}
                </span>
              </Link>
            );
          })}
        </div>
        <div className="flex gap-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleTheme()}
          >
            {themeToggleIcon}
          </Button>
          <a
            href="https://github.com/ammar-ahmed22/ammarahmedca"
            target="_blank"
            rel="noreferrer noopenner"
            className={buttonVariants({
              variant: "ghost",
              size: "icon",
            })}
          >
            <SiGithub />
          </a>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
