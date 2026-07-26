import { Container } from "@/components/ui/Container";

const steps = [
  {
    title: "Discover",
    description:
      "We start with your operation, not a tech pitch — what slows your team down, where information gets lost, what a fix is worth.",
  },
  {
    title: "Design",
    description:
      "You see and approve how the system will work — screens and workflows in plain language — before anything is built.",
  },
  {
    title: "Build",
    description:
      "We build in short cycles with working software you can review along the way, not a reveal at the end.",
  },
  {
    title: "Support",
    description:
      "After launch we stay on for training, fixes, and improvements as your business changes.",
  },
];

export function ProcessSection() {
  return (
    <section className="bg-canvas-subtle py-16 sm:py-24">
      <Container>
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold sm:text-4xl">How we work</h2>
        </div>
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-2xl border border-line bg-surface p-6"
            >
              <span className="text-sm font-medium text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-soft">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
