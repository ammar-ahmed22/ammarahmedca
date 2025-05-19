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
import { ArrowDownIcon, ArrowUpIcon, SearchIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, XIcon } from "lucide-react";
import { useVisibleArray } from "@/hooks/visible-array";
import { Input } from "@/components/ui/input";
import CardModal from "./modal";
import Filter from "./filter";
import { formatDateRange } from "@/lib/date";
import { UIContext } from "@/context/ui";

export type ProjectCardsProps = {
  projects: Project[];
  allTypes: string[];
  allLanguages: string[];
  allFrameworks: string[];
};

export function ProjectCards({
  projects,
  allTypes,
  allFrameworks,
  allLanguages,
}: ProjectCardsProps) {
  const [active, setActive] = useState<Project | boolean>(false);
  const [query, setQuery] = useState("");
  const [filteredProjects, setFilteredProjects] =
    useState<Project[]>(projects);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState<Set<string>>(
    new Set(),
  );
  const [languageFilter, setLanguageFilter] = useState<Set<string>>(
    new Set(),
  );
  const [frameworkFilter, setFrameworkFilter] = useState<Set<string>>(
    new Set(),
  );
  const { setIsNavbarVisible } = useContext(UIContext);
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
      if (
        typeFilter.size > 0 ||
        languageFilter.size > 0 ||
        frameworkFilter.size > 0
      ) {
        setFilteredProjects(
          projects.filter((project) => {
            return (
              project.type.some((type) => typeFilter.has(type)) ||
              project.languages.some((language) =>
                languageFilter.has(language),
              ) ||
              project.frameworks.some((framework) =>
                frameworkFilter.has(framework),
              )
            );
          }),
        );
      } else {
        setFilteredProjects(projects);
      }
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
  }, [projects, query, typeFilter, languageFilter, frameworkFilter]);

  useEffect(() => {
    if (active) {
      setIsNavbarVisible(false);
    }
  }, [active, setIsNavbarVisible]);

  const isSearchFiltering = useMemo(
    () =>
      query !== "" ||
      typeFilter.size > 0 ||
      languageFilter.size > 0 ||
      frameworkFilter.size > 0,
    [
      frameworkFilter.size,
      languageFilter.size,
      query,
      typeFilter.size,
    ],
  );

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
          <Filter
            allTypes={allTypes}
            allLanguages={allLanguages}
            allFrameworks={allFrameworks}
            filteredTypes={typeFilter}
            filteredLanguages={languageFilter}
            filteredFrameworks={frameworkFilter}
            onSelectType={(type) => {
              setTypeFilter((prev) => {
                if (prev.has(type)) {
                  prev.delete(type);
                  return new Set(prev);
                } else {
                  prev.add(type);
                  return new Set(prev);
                }
              });
            }}
            onSelectLanguage={(language) => {
              setLanguageFilter((prev) => {
                if (prev.has(language)) {
                  prev.delete(language);
                  return new Set(prev);
                } else {
                  prev.add(language);
                  return new Set(prev);
                }
              });
            }}
            onSelectFramework={(framework) => {
              setFrameworkFilter((prev) => {
                if (prev.has(framework)) {
                  prev.delete(framework);
                  return new Set(prev);
                } else {
                  prev.add(framework);
                  return new Set(prev);
                }
              });
            }}
            open={isFilterMenuOpen}
            onOpenChange={setIsFilterMenuOpen}
          />
        </div>
        <div className="flex gap-2 flex-wrap items-center w-full">
          {[...typeFilter.values()].map((type) => {
            return (
              <Badge
                key={`filter-badge-type-${type}`}
                className="flex gap-2 hover:bg-primary">
                {type}{" "}
                <Button
                  size="icon"
                  className="size-4 [&_svg]:size-3"
                  variant="default">
                  <XIcon />
                </Button>
              </Badge>
            );
          })}
        </div>
        <ul className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          {(!isSearchFiltering
            ? displayedProjects
            : filteredProjects
          ).map((project) => (
            <motion.div
              layoutId={`card-${project.id}-${id}`}
              key={project.id}
              className="h-full"
              onClick={() => setActive(project)}>
              <Card className="h-full py-8 px-5 flex flex-col gap-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer">
                {project.image && (
                  <motion.div layoutId={`image-${project.id}-${id}`}>
                    <ImageWithLoading
                      src={project.image}
                      alt={project.name}
                      iconClassName="size-12"
                      className="w-full h-full max-h-60 rounded-lg object-contain object-top"
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
                      className="flex gap-2 text-neutral items-center">
                      <CalendarIcon className="size-4" />
                      <span>
                        {formatDateRange(project.date, "MMM yyyy")}
                      </span>
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </ul>
        {!isSearchFiltering && (
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
