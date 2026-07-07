const stats = [
  { value: "0", label: "Chains the contributor has to think about" },
  { value: "1", label: "Balance shown to the organizer" },
  { value: "6+", label: "Supported source chains" },
];

export default function StatsStrip() {
  return (
    <section className="py-16 md:py-20 border-t border-border bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="text-4xl md:text-5xl font-bold text-accent-light mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
