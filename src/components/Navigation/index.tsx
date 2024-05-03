import React from "react";
import LogoIconGradient from "../../assets/images/LogoIcon-gradient.png"
import DesktopNavigation from "./Desktop";
import MobileNavigation from "./Mobile";
import { Link } from "react-router-dom"


export type NavigationProps = {
  active?: string
}

export type NavigationOption = {
  element: React.ReactNode,
  id: string,
  to: string
}

const Navigation: React.FC<NavigationProps> = ({
  active
}) => {
  const options: NavigationOption[] = [
    {
      element: "Home",
      id: "home",
      to: "/"
    },
    {
      element: "About",
      id: "about",
      to: "/about"
    },
    {
      element: "Blog",
      id: "blog",
      to: "/blog"
    },
  ]
  return (
    <div className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 border-b border-slate-900/10 dark:border-slate-200/10">
      <div className="max-w-5xl mx-auto md:px-5 px-3">
        <div className="py-4">
          <div className="relative flex items-center">
            <Link to="/" className="flex space-x-2 items-center">
              <img src={LogoIconGradient} alt="Logo for ammarahmed.ca" className="md:size-12 size-8"/>
            </Link>
            <DesktopNavigation 
              active={active}
              options={options}
            />
            <MobileNavigation 
              active={active}
              options={options}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navigation;