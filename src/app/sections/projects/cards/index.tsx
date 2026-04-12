"use client";
import { useMemo, useState } from "react";
import type { Project } from "@/types/api";
import RichText from "@/components/ui/rich-text";
import { formatDateRange } from "@/lib/date";
import ImageWithLoading from "@/components/ui/loading-image";
import { cn } from "@/lib/utils";

export type ProjectCardsProps = {
  projects: Project[];
  allTypes: string[];
  allLanguages: string[];
  allFrameworks: string[];
};

export function ProjectCards({ projects }: ProjectCardsProps) {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!query) return projects;
    const q = query.toLowerCase();
    return projects.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.type.some((t) => t.toLowerCase().includes(q)) ||
        p.languages.some((l) => l.toLowerCase().includes(q)) ||
        p.frameworks.some((f) => f.toLowerCase().includes(q)),
    );
  }, [projects, query]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 mb-4 font-mono text-base border border-border px-2 py-1.5 focus-within:border-foreground">
        <span className="text-muted shrink-0 select-none">
          $ grep
        </span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="_"
          className="bg-transparent flex-1 outline-none font-mono text-base placeholder:text-muted"
          aria-label="Search projects"
        />
      </div>

      <ul className="flex flex-col">
        {filtered.length === 0 && (
          <li className="font-mono text-base text-muted py-4">
            no matches.
          </li>
        )}
        {filtered.map((project) => {
          const isOpen = openId === project.id;
          return (
            <li
              key={project.id}
              className="border-b border-border last:border-b-0"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : project.id)}
                className={cn(
                  "w-full flex items-baseline gap-3 py-3 px-1 font-mono text-base text-left transition-colors",
                  isOpen
                    ? "bg-foreground text-background"
                    : "hover:bg-foreground hover:text-background",
                )}
                aria-expanded={isOpen}
              >
                <span className="shrink-0 tabular-nums w-4 mr-3">
                  {isOpen ? "[-]" : "[+]"}
                </span>
                <span className="flex-1 truncate font-medium">
                  {project.name}
                </span>
                <span
                  className={cn(
                    "hidden sm:inline text-xs shrink-0",
                    isOpen ? "text-background/70" : "text-muted",
                  )}
                >
                  {project.type.join(" · ")}
                </span>
                {project.date && (
                  <span
                    className={cn(
                      "hidden md:inline text-xs shrink-0 tabular-nums",
                      isOpen ? "text-background/70" : "text-muted",
                    )}
                  >
                    {formatDateRange(project.date, "MMM yyyy")}
                  </span>
                )}
              </button>

              <div
                className={cn(
                  "grid transition-all duration-300 ease-out",
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden">
                  <div className="px-6 py-4 grid grid-cols-1 gap-6">
                    <div className="flex flex-col gap-3 max-w-[68ch]">
                      {project.image && (
                        <div className="border border-border p-1">
                          <ImageWithLoading
                            src={project.image}
                            alt={project.name}
                            className="w-full h-auto object-cover"
                            loadingClassName="h-32"
                          />
                        </div>
                      )}
                      <RichText
                        data={project.description}
                        as="p"
                        className="font-mono text-base text-muted leading-relaxed"
                      />
                      {project.languages.length > 0 && (
                        <p className="font-mono text-sm text-muted">
                          <span className="text-foreground">
                            [{project.languages.join(", ")}]
                          </span>
                        </p>
                      )}
                      {project.frameworks.length > 0 && (
                        <p className="font-mono text-sm text-muted">
                          <span className="text-foreground">
                            [{project.frameworks.join(", ")}]
                          </span>
                        </p>
                      )}
                      <div className="flex gap-3 font-mono text-sm">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted hover:text-foreground"
                          >
                            [github↗]
                          </a>
                        )}
                        {project.external && (
                          <a
                            href={project.external}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted hover:text-foreground"
                          >
                            [demo↗]
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
