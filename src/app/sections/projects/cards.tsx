"use client";
import { useState, useEffect, useRef, useId, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useOutsideClick } from "@/hooks/outside-click";
import { DateRange, Project } from "@/types/api";
import {
  XIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  SearchIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiGithub } from "react-icons/si";
import {
  ExternalLinkIcon,
  CalendarIcon,
  ListFilterPlusIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useVisibleArray } from "@/hooks/visible-array";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenuGroup,
  DropdownMenuSubContent,
} from "@radix-ui/react-dropdown-menu";

export type ProjectCardsProps = {
  projects: Project[];
};

const formatDateRange = (dateRange: DateRange) => {
  const start = format(dateRange.start, "MMM yyyy");
  const end = dateRange.end
    ? format(dateRange.end, "MMM yyyy")
    : "Present";
  return `${start} - ${end}`;
};

export function ProjectCards({ projects }: ProjectCardsProps) {
  const [active, setActive] = useState<Project | boolean>(false);
  const [query, setQuery] = useState("");
  const [filteredProjects, setFilteredProjects] =
    useState<Project[]>(projects);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [displayedProjects, { reset, showMore }] = useVisibleArray(
    projects,
    4,
  );
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useEffect(() => {
    if (query === "") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => {
          return (
            project.name
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            project.type.some((type) =>
              type.toLowerCase().includes(query.toLowerCase()),
            ) ||
            project.languages.some((language) =>
              language.toLowerCase().includes(query.toLowerCase()),
            ) ||
            project.frameworks.some((framework) =>
              framework.toLowerCase().includes(query.toLowerCase()),
            )
          );
        }),
      );
    }
  }, [projects, query]);

  const isSearching = useMemo(() => query !== "", [query]);

  return (
    <>
      <CardModal
        active={active}
        id={id}
        onClose={() => setActive(false)}
      />
      <div className="flex flex-col items-center gap-4">
        <div className="items-center gap-2 flex w-full">
          <Input
            placeholder="Search by name, type, language, or framework"
            className="w-full"
            startIcon={SearchIcon}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <DropdownMenu
            open={isFilterMenuOpen}
            onOpenChange={setIsFilterMenuOpen}>
            <DropdownMenuTrigger>
              <Button variant="ghost">
                <ListFilterPlusIcon /> Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    Type
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent></DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    Language
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent></DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    Framework
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent></DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <ul className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          {(!isSearching ? displayedProjects : filteredProjects).map(
            (project) => (
              <motion.div
                layoutId={`card-${project.id}-${id}`}
                key={project.id}
                className="h-full"
                onClick={() => setActive(project)}>
                <Card className="h-full py-8 px-5 flex flex-col gap-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer">
                  {project.image && (
                    <motion.div
                      layoutId={`image-${project.id}-${id}`}>
                      <Image
                        width={200}
                        height={200}
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full max-h-60 rounded-lg object-contain object-top"
                        priority
                      />
                    </motion.div>
                  )}
                  <div className="flex flex-col gap-2">
                    <div>
                      <motion.small
                        layoutId={`type-${project.id}-${id}`}
                        className="uppercase text-sm font-bold">
                        {project.type.join(" • ")}
                      </motion.small>
                      <motion.h3
                        layoutId={`title-${project.id}`}
                        className="font-bold text-neutral-800 dark:text-neutral-200 text-base">
                        {project.name}
                      </motion.h3>
                    </div>
                    <motion.div
                      className="flex flex-col gap-2"
                      layoutId={`tags-${project.id}-${id}`}>
                      {project.languages.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.languages.map((lang) => {
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
                      {project.frameworks.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.frameworks.map((framework) => {
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
                    {project.date && (
                      <motion.div
                        layoutId={`date-${project.id}-${id}`}
                        className="flex gap-2 text-neutral-500 items-center">
                        <CalendarIcon className="size-4" />
                        <span>{formatDateRange(project.date)}</span>
                      </motion.div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ),
          )}
        </ul>
        {!isSearching && (
          <Button
            variant="ghost"
            onClick={() => {
              if (displayedProjects.length === projects.length) {
                reset();
              } else {
                showMore(4);
              }
            }}>
            {displayedProjects.length === projects.length ? (
              <ArrowUpIcon />
            ) : (
              <ArrowDownIcon />
            )}{" "}
            {displayedProjects.length === projects.length
              ? "Show Less"
              : "Show More"}
          </Button>
        )}
      </div>
    </>
  );
}

type CardModalProps = {
  active: Project | boolean;
  id: string;
  onClose: () => void;
};
const CardModal = ({ active, id, onClose }: CardModalProps) => {
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
            <Button asChild size="icon" variant="ghost">
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
                  <Image
                    priority
                    width={200}
                    height={200}
                    src={active.image}
                    alt={active.name}
                    className="w-full h-full sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-center"
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
                    className="flex gap-2 text-neutral-500 items-center px-4">
                    <CalendarIcon className="size-4" />
                    <span>{formatDateRange(active.date)}</span>
                  </motion.div>
                )}
              </div>
              <div className="px-4 pb-4">
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-neutral-500">
                  {active.description
                    .map((r) => r.plainText)
                    .join("")}
                </motion.div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
};
