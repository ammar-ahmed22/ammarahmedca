"use client";
import {
  useState,
  useEffect,
  useId,
  useMemo,
  useContext,
} from "react";
import { motion } from "framer-motion";
import ImageWithLoading from "@/components/ui/loading-image";
import type { Project } from "@/types/api";
import { SearchIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import CardModal from "./modal";
import { formatDateRange } from "@/lib/date";
import { UIContext } from "@/context/ui";

export type ProjectCardsProps = {
  projects: Project[];
  allTypes: string[];
  allLanguages: string[];
  allFrameworks: string[];
};

export function ProjectCards({ projects }: ProjectCardsProps) {
  const [active, setActive] = useState<Project | boolean>(false);
  const [query, setQuery] = useState("");
  const [filteredProjects, setFilteredProjects] =
    useState<Project[]>(projects);
  const { setIsNavbarVisible } = useContext(UIContext);
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
        // TODO: Seems a little wonky; try adding multiple filters
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

  useEffect(() => {
    if (active) {
      setIsNavbarVisible(false);
    }
  }, [active, setIsNavbarVisible]);

  const isSearchFiltering = useMemo(() => query !== "", [query]);

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
        </div>
        <ul className="w-full columns-1 md:columns-2 gap-4 space-y-4">
          {(!isSearchFiltering ? projects : filteredProjects).map(
            (project) => (
              <motion.div
                layoutId={`card-${project.id}-${id}`}
                key={project.id}
                className="break-inside-avoid"
                onClick={() => setActive(project)}
              >
                <Card className="py-8 px-5 flex flex-col gap-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer">
                  {project.image && (
                    <motion.div
                      layoutId={`image-${project.id}-${id}`}
                    >
                      <ImageWithLoading
                        src={project.image}
                        alt={project.name}
                        iconClassName="size-12"
                        className="w-full h-full max-h-60 rounded-lg object-cover object-center"
                        containerClassName="max-h-60"
                        loadingClassName="h-60"
                      />
                    </motion.div>
                  )}
                  <div className="flex flex-col gap-2">
                    <div>
                      <motion.small
                        layoutId={`type-${project.id}-${id}`}
                        className="uppercase text-sm font-bold"
                      >
                        {project.type.join(" • ")}
                      </motion.small>
                      <motion.h3
                        layoutId={`title-${project.id}`}
                        className="font-bold text-neutral-800 dark:text-neutral-200 text-base"
                      >
                        {project.name}
                      </motion.h3>
                    </div>
                    <motion.div
                      className="flex flex-col gap-2"
                      layoutId={`tags-${project.id}-${id}`}
                    >
                      {project.languages.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.languages.map((lang) => {
                            return (
                              <Badge
                                key={lang}
                                className="text-xs"
                                variant="outline"
                              >
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
                                variant="secondary"
                              >
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
                        className="flex gap-2 text-neutral items-center"
                      >
                        <CalendarIcon className="size-4" />
                        <span>
                          {formatDateRange(project.date, "MMM yyyy")}
                        </span>
                      </motion.div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ),
          )}
        </ul>
      </div>
    </>
  );
}
