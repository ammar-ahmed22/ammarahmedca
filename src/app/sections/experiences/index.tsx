import api from "@/lib/api";
import Timeline from "@/components/ui/timeline";
import { formatDateRange } from "@/lib/date";
import { Badge } from "@/components/ui/badge";

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
      <Timeline
        data={experiences.map((experience) => {
          return {
            title: experience.company,
            subtitle: experience.timeframe
              ? formatDateRange(experience.timeframe, "MMM yyyy")
              : undefined,
            icon: experience.icon,
            content: (
              <div className="flex flex-col gap-2">
                <small className="uppercase text-sm font-bold">
                  {experience.type}
                </small>
                <p className="text-lg">{experience.role}</p>
                <p className="text-neutral-500">
                  {experience.description
                    .map((r) => r.plainText)
                    .join("")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {experience.skills.map((skill) => {
                    return (
                      <Badge
                        key={`${experience.id}-${skill}`}
                        variant="outline">
                        {skill}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            ),
          };
        })}
      />
    </section>
  );
}
