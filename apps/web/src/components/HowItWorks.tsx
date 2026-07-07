import FadeInView from "./FadeInView";

const steps = [
  {
    number: 1,
    title: "Organizer creates a pot",
    description: "Set a goal, add a description, and share the link.",
  },
  {
    number: 2,
    title: "Contributor opens the link",
    description: "They pay from whatever chain or asset they already hold.",
  },
  {
    number: 3,
    title: "Particle UA routes automatically",
    description: "Universal Accounts find the best path — no user choice needed.",
  },
  {
    number: 4,
    title: "Funds settle on Arbitrum",
    description: "One clean USDC balance, ready to withdraw.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <FadeInView>
          <div className="mb-16">
            <span className="text-xs font-mono text-accent tracking-widest">
              HOW IT WORKS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              From link to balance
            </h2>
          </div>
        </FadeInView>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <FadeInView key={step.number} delay={i * 0.1}>
              <div className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 border border-accent/30 text-accent-light font-mono text-sm font-bold">
                    {step.number}
                  </span>
                  {i < steps.length - 1 && (
                    <div className="hidden md:block flex-1 h-px bg-border" />
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{step.description}</p>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
