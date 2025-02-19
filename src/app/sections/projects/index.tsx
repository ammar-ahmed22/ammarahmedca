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
    <section className="min-h-screen mb-24">
      <h2 className="text-5xl mb-1 font-display font-bold">
        Projects
      </h2>
      <p className="text-neutral-500 text-xl mb-4">
        Check out what I&apos;ve been working on!
      </p>
      <ProjectCards
        projects={projects}
        allTypes={filterProperties.types}
        allLanguages={filterProperties.languages}
        allFrameworks={filterProperties.frameworks}
      />
    </section>
  );
}
