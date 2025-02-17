import api from "@/lib/api";
import { ProjectCards } from "./cards";

export const revalidate = 60;

export default async function Projects() {
  const projects = await api.projects.list({ onlyPublished: true });

  return (
    <section className="min-h-screen">
      <h2 className="text-5xl mb-1 font-display font-bold text-center">
        Projects
      </h2>
      <p className="text-neutral-500 text-center text-xl mb-4">
        Check out what I&apos;ve been working on!
      </p>
      <ProjectCards projects={projects} />
    </section>
  );
}
