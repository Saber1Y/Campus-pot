import HeroParticles from "./HeroParticles";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-surface" />
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-accent-dim/10 blur-[120px] animate-ambient" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] animate-ambient" style={{ animationDelay: "2s" }} />
      <HeroParticles />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24 pb-32">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent-light text-xs font-mono tracking-wider mb-8 animate-fade-in-up">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
          Chain-abstracted fundraising
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 animate-fade-in-up stagger-1">
          <span className="text-foreground">One link.</span>{" "}
          <span className="text-accent-light">One balance.</span>{" "}
          <span className="text-foreground">Any chain.</span>
        </h1>

        {/* Subhead */}
        <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-in-up stagger-2">
          Contributors pay with whatever they already hold. Organizers see one clean
          balance, settled on Arbitrum — no bridges, no gas tokens, no chain switching.
        </p>

        {/* Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up stagger-3">
          {[
            "Particle Universal Accounts · EIP-7702",
            "Settles on Arbitrum",
            "Unified balance, any source chain",
          ].map((pill) => (
            <span
              key={pill}
              className="px-3 py-1.5 text-xs font-mono text-muted bg-surface-light border border-border rounded-full"
            >
              {pill}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up stagger-4">
          <button className="bg-accent hover:bg-accent-light text-black font-semibold px-8 py-3 rounded-xl text-base transition-all hover:scale-105">
            Create a pot
          </button>
          <button className="border border-border hover:border-accent/40 text-foreground px-8 py-3 rounded-xl text-base transition-all hover:scale-105">
            See how it settles
          </button>
        </div>
      </div>
    </section>
  );
}
