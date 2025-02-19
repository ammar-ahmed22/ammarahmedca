import api from "@/lib/api";

export const revalidate = 60;

export default async function Experiences() {
  const experiences = await api.experiences.list();

  return (
    <section className="min-h-screen">
      <h2 className="text-5xl mb-1 font-display font-bold">
        Experiences
      </h2>
      <p className="text-neutral-500 text-xl mb-4">
        See where I&apos;ve been working!
      </p>
      {experiences.map((experience) => {
        return (
          <div key={experience.id} className="mb-2">
            <p className="text-xl">{experience.company}</p>
            <p className="text-neutral-500">{experience.role}</p>
          </div>
        );
      })}
    </section>
  );
}
