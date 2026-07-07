const capabilities = [
  {
    number: "01",
    title: "Pay from anywhere",
    description:
      "Contributors use whatever balance they already have, on whatever chain it is on.",
    badge: "Particle UA · cross-chain",
  },
  {
    number: "02",
    title: "One balance, always",
    description:
      "Organizers never see multiple assets or chains — just one running total.",
    badge: "Arbitrum settlement",
  },
  {
    number: "03",
    title: "Nothing to configure",
    description:
      "No bridge screen, no gas token, no network switch, no approval flow.",
    badge: "Zero manual routing",
  },
  {
    number: "04",
    title: "Provable, not promised",
    description:
      "Every contribution is a real on-chain transaction you can verify yourself.",
    badge: "On-chain · verifiable",
  },
];

export default function Capabilities() {
  return (
    <section className="py-24 md:py-32 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <span className="text-xs font-mono text-accent tracking-widest">
            CAPABILITIES
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3">
            What CampusPots does for you
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {capabilities.map((cap, i) => (
            <div
              key={cap.number}
              className="group border border-border hover:border-accent/30 bg-surface rounded-xl p-6 md:p-8 transition-all hover:bg-surface-light animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span className="text-4xl font-bold text-accent-dim/40 group-hover:text-accent-dim/60 transition-colors">
                {cap.number}
              </span>
              <h3 className="text-xl font-semibold mt-3 mb-2">{cap.title}</h3>
              <p className="text-muted text-sm leading-relaxed mb-4">
                {cap.description}
              </p>
              <span className="inline-block text-xs font-mono text-accent-light bg-accent/5 border border-accent/20 px-3 py-1 rounded-full">
                {cap.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
