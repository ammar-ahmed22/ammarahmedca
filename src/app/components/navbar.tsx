"use client";
import React, { useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { MoonIcon, SunIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useThemeValue, useToggleTheme } from "@/hooks/theme";
import { SiGithub } from "react-icons/si";
import { usePathname } from "next/navigation";
import { useScrollY } from "@/hooks/scroll";
import { useMediaQuery } from "@/hooks/media-query";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { UIContext } from "@/context/ui";

export type NavItem = {
  name: string;
  link: string;
};

const navItems: NavItem[] = [
  {
    name: "Home",
    link: "/",
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
  const { lastY, direction } = useScrollY();
  const isMobile = useMediaQuery("(min-width: 640px)");
  const pathname = usePathname();

  const { isNavbarVisible: visible, setIsNavbarVisible: setVisible } =
    useContext(UIContext);
  useEffect(() => {
    if (lastY < 50) {
      setVisible(true);
    } else {
      if (direction > 0) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    }
  }, [direction, lastY, setVisible]);

  const themeToggleIcon = useThemeValue(<MoonIcon />, <SunIcon />);
  const toggleTheme = useToggleTheme();
  const logoSrc = useThemeValue(
    "/LogoIcon-light.png",
    "/LogoIcon-dark.png",
  );

  const isNavItemActive = (link: string, pathname: string) => {
    let isActive = false;
    if (link === "/") {
      isActive = pathname === "/";
    } else {
      isActive = pathname.startsWith(link);
    }
    return isActive;
  };

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
          "flex max-w-4xl fixed top-10 inset-x-0 mx-auto border border-black/[0.2] dark:border-white/[0.2] rounded-xl bg-background shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[1000] px-4 py-4  items-center justify-between space-x-4",
          {
            "border-none shadow-none": lastY === 0,
          },
        )}>
        <Image
          src={logoSrc}
          alt="Logo for ammarahmed.ca"
          width={40}
          height={40}
          priority
        />
        {isMobile && (
          <>
            <div className="flex gap-12">
              {navItems.map((navItem: NavItem, idx: number) => {
                const isActive = isNavItemActive(
                  navItem.link,
                  pathname,
                );
                return (
                  <Link
                    key={`link=${idx}`}
                    href={navItem.link}
                    className={cn(
                      "relative dark:text-neutral-400 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-600",
                      {
                        "dark:text-foreground text-foreground border-b dark:border-neutral-50 border-neutral-900":
                          isActive,
                      },
                    )}>
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
                onClick={() => toggleTheme()}>
                {themeToggleIcon}
              </Button>
              <a
                href="https://github.com/ammar-ahmed22/ammarahmedca"
                target="_blank"
                rel="noreferrer noopenner"
                className={buttonVariants({
                  variant: "ghost",
                  size: "icon",
                })}>
                <SiGithub />
              </a>
            </div>
          </>
        )}
        {!isMobile && (
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="size-12 [&_svg]:size-6">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="top"
              className="w-screen h-screen flex flex-col items-center justify-center">
              <SheetTitle className="hidden">
                Website Navigation
              </SheetTitle>
              <div className="flex gap-4 items-center justify-center flex-col">
                {navItems.map((navItem, idx) => {
                  const isActive = isNavItemActive(
                    navItem.link,
                    pathname,
                  );
                  return (
                    <SheetClose asChild key={`navlink-${idx}`}>
                      <Link
                        href={navItem.link}
                        className={cn("text-4xl font-bold pb-2", {
                          "border-b dark:border-neutral-50 border-neutral-900":
                            isActive,
                        })}>
                        {navItem.name}
                      </Link>
                    </SheetClose>
                  );
                })}
              </div>
              <div className="flex gap-3">
                <Button variant="ghost" onClick={() => toggleTheme()}>
                  {themeToggleIcon}
                  Light Mode
                </Button>
                <a
                  href="https://github.com/ammar-ahmed22/ammarahmedca"
                  target="_blank"
                  rel="noreferrer noopenner"
                  className={buttonVariants({
                    variant: "ghost",
                  })}>
                  <SiGithub />
                  GitHub
                </a>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
