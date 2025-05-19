import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOutsideClick } from "@/hooks/outside-click";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types/api";
import ImageWithLoading from "@/components/ui/loading-image";
import { XIcon, ExternalLinkIcon, CalendarIcon } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { cn } from "@/lib/utils";
import { formatDateRange } from "@/lib/date";
import { Badge } from "@/components/ui/badge";
import RichText from "@/components/ui/rich-text";

type CardModalProps = {
  active: Project | boolean;
  id: string;
  onClose: () => void;
};

export default function CardModal({
  active,
  id,
  onClose,
}: CardModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => onClose());

  if (!active) {
    return <></>;
  }
  return (
    <>
      <AnimatePresence>
        {active && typeof active !== "boolean" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <Button
              asChild
              className="z-[100]"
              size="icon"
              variant="ghost">
              <motion.button
                key={`button-${active.id}-${id}`}
                layout
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                  transition: {
                    duration: 0.05,
                  },
                }}
                className="flex absolute top-2 right-2 items-center justify-center"
                onClick={() => onClose()}>
                <XIcon />
              </motion.button>
            </Button>
            <motion.div
              layoutId={`card-${active.id}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-background border sm:rounded-3xl gap-4 overflow-scroll">
              {active.image && (
                <motion.div layoutId={`image-${active.id}-${id}`}>
                  <ImageWithLoading
                    src={active.image}
                    alt={active.name}
                    className="w-full h-full max-h-[40vh] sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-center"
                    containerClassName="max-h-[40vh]"
                    loadingClassName="h-[40vh]"
                  />
                </motion.div>
              )}
              <div className={cn({ "pt-4": !active.image })}>
                <div className="flex justify-between items-center px-4 mb-2">
                  <div>
                    <motion.small
                      layoutId={`type-${active.id}-${id}`}
                      className="uppercase text-sm font-bold">
                      {active.type.join(" • ")}
                    </motion.small>
                    <motion.h3
                      layoutId={`title-${active.id}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200 text-base">
                      {active.name}
                    </motion.h3>
                  </div>

                  <div className="flex items-center gap-2">
                    {active.github && (
                      <Button asChild className="rounded-full">
                        <motion.a
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          href={active.github}
                          target="_blank">
                          <SiGithub /> GitHub
                        </motion.a>
                      </Button>
                    )}
                    {active.external && (
                      <Button
                        asChild
                        className="rounded-full"
                        variant="outline">
                        <motion.a
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          href={active.external}
                          target="_blank">
                          <ExternalLinkIcon /> Demo
                        </motion.a>
                      </Button>
                    )}
                  </div>
                </div>
                <motion.div
                  className="flex flex-col gap-2 px-4 pb-2"
                  layoutId={`tags-${active.id}-${id}`}>
                  {active.languages.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {active.languages.map((lang) => {
                        return (
                          <Badge
                            key={lang}
                            className="text-xs"
                            variant="outline">
                            {lang}
                          </Badge>
                        );
                      })}
                    </div>
                  )}
                  {active.frameworks.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {active.frameworks.map((framework) => {
                        return (
                          <Badge
                            key={framework}
                            className="text-xs"
                            variant="secondary">
                            {framework}
                          </Badge>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
                {active.date && (
                  <motion.div
                    layoutId={`date-${active.id}-${id}`}
                    className="flex gap-2 text-neutral items-center px-4">
                    <CalendarIcon className="size-4" />
                    <span>
                      {formatDateRange(active.date, "MMM yyyy")}
                    </span>
                  </motion.div>
                )}
              </div>
              <div className="px-4 pb-4">
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}>
                  <RichText data={active.description} as="p" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
