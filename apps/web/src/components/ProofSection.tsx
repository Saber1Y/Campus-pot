import FadeInView from "./FadeInView";

export default function ProofSection() {
  return (
    <section id="proof" className="py-24 md:py-32 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <FadeInView>
          <div className="mb-16">
            <span className="text-xs font-mono text-accent tracking-widest">
              PROOF
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              See exactly where it settles
            </h2>
            <p className="text-muted mt-3 max-w-xl leading-relaxed">
              Every contribution is a real on-chain transaction — routed through
              Particle Universal Accounts and settled on Arbitrum. No simulation, no
              demo mode.
            </p>
          </div>
        </FadeInView>

        <FadeInView delay={0.15}>
          <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 max-w-2xl mx-auto mb-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs font-mono text-green-400 tracking-wide">
                TRANSACTION CONFIRMED
              </span>
            </div>

            <div className="space-y-4">
              {[
                { label: "Source", value: "Base · USDC" },
                { label: "Settlement chain", value: "Arbitrum" },
                {
                  label: "Transaction hash",
                  value: "0x7a3b...c9f2",
                  mono: true,
                },
                {
                  label: "Pot contract",
                  value: "0x1a2b...3e4f",
                  mono: true,
                },
                { label: "UA operation status", value: "Completed" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <span className="text-sm text-muted">{row.label}</span>
                  <span
                    className={`text-sm ${row.mono ? "font-mono text-xs" : ""} text-foreground`}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeInView>

        <FadeInView delay={0.3}>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs text-muted/60 leading-relaxed italic border border-border/40 rounded-xl px-6 py-4">
              Hackathon build — demo contributions use small real amounts routed via
              Particle Universal Accounts to Arbitrum mainnet.
            </p>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
