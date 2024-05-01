import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";

const Footer: React.FC = () => {
  type IconLink = {
    icon: React.ReactNode,
    href: string,
    aria: string,
  }
  const iconLinks: IconLink[] = [
    {
      icon: <FaGithub className="size-6" />,
      href: "http",
      aria: "Link to GitHub account"
    },
    {
      icon: <FaLinkedin className="size-6"  />,
      href: "http",
      aria: "Link to LinkedIn profile"
    },
    {
      icon: <EnvelopeIcon className="size-6"  />,
      href: "http",
      aria: "Link to mail me"
    },
  ]
  return (
    <footer className="w-full border-t border-slate-900/10 dark:border-slate-200/10" >
      <div className="max-w-5xl mx-auto py-5">
        <div className="flex flex-col items-center space-y-2">
          <h3 className="text-lg text-center font-bold">Get in touch with me and follow my journey!</h3>
          <div className="flex items-center justify-center space-x-2">
            {
              iconLinks.map((item) => {
                return (
                  <Button
                    key={`icon-link-${item.aria}`}
                    isIconOnly
                    as="a"
                    href={item.href}
                    variant="light"
                  >
                    {item.icon}
                  </Button>
                )
              })
            }
          </div>
          <p className="text-sm text-center font-light">Built and Designed by Ammar Ahmed</p>
          <p className="text-sm text-center font-light">All Rights Reserved ©</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;