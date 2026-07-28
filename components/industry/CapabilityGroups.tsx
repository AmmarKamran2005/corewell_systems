import { Reveal } from "@/components/motion/Reveal";
import type { CapabilityGroup } from "@/lib/capabilities";

/**
 * The capability inventory for an industry — what the systems we have built
 * actually do. Rendered as expandable groups so the page stays scannable
 * while the depth remains available to a buyer who wants it.
 */
export function CapabilityGroups({ groups }: { groups: CapabilityGroup[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {groups.map((group, index) => (
        <Reveal key={group.title} delay={index * 0.05}>
          <details
            className="group h-full rounded-2xl border border-line bg-surface p-6 sm:p-7"
            open={index < 2}
          >
            <summary className="cursor-pointer list-none">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{group.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-soft">
                    {group.summary}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="mt-1 shrink-0 text-sm text-accent transition-transform duration-150 group-open:rotate-180"
                >
                  ↓
                </span>
              </div>
            </summary>
            <ul className="mt-5 space-y-3 border-t border-line pt-5">
              {group.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span className="text-sm leading-relaxed text-soft">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </details>
        </Reveal>
      ))}
    </div>
  );
}
