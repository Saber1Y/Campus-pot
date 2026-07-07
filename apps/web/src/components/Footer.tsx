export default function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="CampusPots" className="h-6" />
            <span className="text-xs text-muted hidden sm:inline">
              Chain-abstracted fundraising
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#how-it-works" className="text-xs text-muted hover:text-foreground transition-colors">
              How it works
            </a>
            <a href="#architecture" className="text-xs text-muted hover:text-foreground transition-colors">
              Architecture
            </a>
            <a
              href="https://github.com/Saber1Y/Campus-pot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-dot" />
            <span className="text-xs font-mono text-muted">Settlement: Arbitrum</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
