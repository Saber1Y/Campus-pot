const stack = [
  { name: "Next.js Frontend", layer: "presentation", live: true },
  { name: "Particle Universal Accounts", layer: "routing", live: true },
  { name: "CampusPots Contract", layer: "settlement", live: true, detail: "Arbitrum" },
  { name: "Supabase", layer: "metadata", live: true, detail: "Pot metadata · Contributors" },
];

export default function Architecture() {
  return (
    <section id="architecture" className="py-24 md:py-32 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <span className="text-xs font-mono text-accent tracking-widest">
            INFRASTRUCTURE
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3">Architecture</h2>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-8 md:p-12">
          {/* Flow arrows between layers */}
          <div className="flex flex-col items-center gap-0">
            {stack.map((item, i) => (
              <div key={item.name} className="w-full max-w-lg">
                <div className="bg-surface-light border border-border rounded-xl p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-2 h-2 rounded-full ${item.live ? "bg-green-500 animate-pulse-dot" : "bg-muted"}`}
                    />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  {item.detail && (
                    <span className="text-xs font-mono text-muted bg-background px-2.5 py-1 rounded-md">
                      {item.detail}
                    </span>
                  )}
                </div>
                {i < stack.length - 1 && (
                  <div className="flex justify-center py-3">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-muted"
                    >
                      <path
                        d="M12 5v14m0 0-4-4m4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-muted mt-8 font-mono">
            All components live · Transactions route through Particle UA to Arbitrum
          </p>
        </div>
      </div>
    </section>
  );
}
