import React from "react";
import { Link } from "react-router-dom";
import type { NavigationOption } from ".";
import { Button } from "@nextui-org/react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid"
import { FaGithub } from "react-icons/fa";
import { useTheme, useThemeValue } from "../../hooks/theme";

export type DesktopNavigationProps = {
  active?: string,
  options: NavigationOption[]
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  active,
  options
}) => {
  const textGradient = "bg-gradient-to-r from-primary-500 to-secondary-300 text-transparent bg-clip-text"
  const { toggleTheme } = useTheme();
  const ThemeIcon = useThemeValue(MoonIcon, SunIcon);
  return (
    <div className="relative md:flex hidden items-center ml-auto">
      <nav className="text-base leading-6 font-semibold text-slate-700 dark:text-slate-200">
        <ul className="flex space-x-8">
          {
            options.map((opt) => {
              const isActive = active === opt.id;
              const activeClasses = textGradient + " font-bold";
              return (
                <li key={`nav-opt-${opt.id}`}>
                  <Link to={opt.to} className={`inline-block hover:underline underline-foreground underline-offset-4 decoration-2 ${isActive ? activeClasses : ""}`} >{opt.element}</Link>
                </li>
              )
            })
          }
        </ul>
      </nav>
      <div className="flex items-center border-l border-slate-900/10 dark:border-slate-200/10 ml-6 pl-6">
        <Button isIconOnly variant="light" color="default" onPress={toggleTheme} >
          <ThemeIcon className="size-5 text-default-500" />
        </Button>
        <Button isIconOnly variant="light" color="default" as="a" href="https://github.com/ammar-ahmed22/ammarahmedca" >
          <FaGithub className="size-5 text-default-500" />
        </Button>
      </div>
    </div>
  )
}

export default DesktopNavigation;