import api from "@/lib/api";
import Timeline from "@/components/ui/timeline";
import { formatDateRange } from "@/lib/date";
import { Badge } from "@/components/ui/badge";
import RichText from "@/components/ui/rich-text";
import { differenceInYears } from "date-fns";

export const revalidate = 60;

export default async function Experiences() {
  const experiences = await api.experiences.list();

  return (
    <section className="min-h-screen mb-24" id="experience">
      <h2 className="text-4xl mb-1 font-display font-bold">
        Experiences
      </h2>
      <p className="text-neutral text-lg mb-4">
        See where I&apos;ve been working!
      </p>
      <Timeline
        data={experiences.map((experience) => {
          return {
            title: experience.company,
            subtitle: experience.timeframe
              ? formatDateRange(experience.timeframe, "MMM yyyy")
              : undefined,
            subsubtitle: experience.timeframe
              ? differenceInYears(
                  experience.timeframe.start,
                  new Date(2001, 2, 22),
                ) + " years old"
              : undefined,
            icon: experience.icon,
            content: (
              <div className="flex flex-col gap-2">
                <small className="uppercase text-sm font-bold">
                  {experience.type}
                </small>
                <p className="text-lg">{experience.role}</p>
                <RichText as="p" data={experience.description} />
                <div className="flex flex-wrap gap-2">
                  {experience.skills.map((skill) => {
                    return (
                      <Badge
                        key={`${experience.id}-${skill}`}
                        variant="outline"
                      >
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
