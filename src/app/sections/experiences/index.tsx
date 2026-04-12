import api from "@/lib/api";
import { formatDateRange } from "@/lib/date";
import RichText from "@/components/ui/rich-text";

export const revalidate = 60;

export default async function Experiences() {
  const experiences = await api.experiences.list();

  return (
    <section className="py-16 sm:py-24" id="experience">
      <h2 className="font-mono text-base text-muted mb-2">
        ~/experience $ cat history.log
      </h2>
      <span className="ascii-rule mb-8" />

      <ol className="relative border-l border-border ml-2">
        {experiences.map((experience) => (
          <li
            key={experience.id}
            className="relative pl-8 pb-12 last:pb-0"
          >
            <span
              className="absolute -left-[5px] top-1 w-2 h-2 bg-foreground"
              aria-hidden
            />
            <div className="font-mono text-xs sm:text-sm text-muted tabular-nums uppercase tracking-wider mb-2">
              [
              {experience.timeframe
                ? formatDateRange(experience.timeframe, "MMM yyyy")
                : "----"}
              ]
              {experience.type && (
                <>
                  {" "}
                  <span className="text-muted">·</span>{" "}
                  {experience.type}
                </>
              )}
            </div>
            <h3 className="font-display text-2xl sm:text-3xl leading-tight mb-1">
              {experience.company}
            </h3>
            {experience.role && (
              <p className="font-mono text-base mb-3">
                {experience.role}
              </p>
            )}
            <RichText
              as="p"
              data={experience.description}
              className="font-mono text-base text-muted max-w-[68ch] mb-3 leading-relaxed"
            />
            {experience.skills.length > 0 && (
              <p className="font-mono text-sm text-muted leading-relaxed max-w-[68ch]">
                <span className="text-foreground">
                  [{experience.skills.join(", ")}]
                </span>
              </p>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
