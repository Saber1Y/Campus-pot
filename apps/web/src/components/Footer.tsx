export default function Footer() {
  return (
    <footer className="relative border-t border-border pt-16 pb-10 overflow-hidden">
      {/* Accent top glow line */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
      <div className="absolute top-0 left-1/3 right-1/3 h-[2px] bg-gradient-to-r from-transparent via-accent-light/20 to-transparent blur-sm" />

      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-accent/3 blur-[80px] rounded-full" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          <div className="flex items-center gap-4">
            <img src="/logo.svg" alt="CampusPots" className="h-7" />
            <div className="h-6 w-px bg-border hidden sm:block" />
            <span className="text-sm text-muted hidden sm:inline">
              Chain-abstracted fundraising
            </span>
          </div>

          <div className="flex items-center gap-8">
            <a
              href="#how-it-works"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              How it works
            </a>
            <a
              href="#architecture"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              Architecture
            </a>
            <a
              href="https://github.com/Saber1Y/Campus-pot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border mb-6" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted/60">
            &copy; {new Date().getFullYear()} CampusPots. Hackathon project.
          </p>

          {/* Settlement badge - accent styled */}
          <div className="flex items-center gap-2.5 bg-accent/5 border border-accent/15 rounded-full px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-40" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="text-xs font-mono text-accent-light tracking-wide">
              Settlement: Arbitrum
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
