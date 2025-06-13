"use client";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { MailIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="mt-40 border-t flex flex-col items-center justify-center py-4">
      <span className="font-bold">
        Get in touch with me and follow my journey!
      </span>
      <div className="flex items-center">
        <a
          href="https://www.linkedin.com/in/ammarahmed2203/"
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({
            size: "icon",
            variant: "ghost",
          })}
        >
          <SiLinkedin />
        </a>
        <a
          href="https://github.com/ammar-ahmed22"
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({
            size: "icon",
            variant: "ghost",
          })}
        >
          <SiGithub />
        </a>
        <a
          href="mailto:ammar.ahmed1@uwaterloo.ca"
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({
            size: "icon",
            variant: "ghost",
          })}
        >
          <MailIcon />
        </a>
      </div>
      <span className="text-sm text-neutral">
        Built and Designed by Ammar Ahmed
      </span>
      <small className="text-xs text-neutral">
        All Rights Reserved © 2025
      </small>
    </footer>
  );
}
