import api from "@/lib/api";
import { ProjectCards } from "./cards";

export const revalidate = 60;

export default async function Projects() {
  const projects = await api.projects.list({ onlyPublished: true });
  const filterProperties = await api.projects.filterProperties({
    onlyPublished: true,
    projects,
  });

  return (
    <section id="projects" className="py-16 sm:py-24">
      <h2 className="font-mono text-base text-muted mb-2">
        ~/projects $ ls
      </h2>
      <span className="ascii-rule mb-4" />
      <ProjectCards
        projects={projects}
        allTypes={filterProperties.types}
        allLanguages={filterProperties.languages}
        allFrameworks={filterProperties.frameworks}
      />
    </section>
  );
}
