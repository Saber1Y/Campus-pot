import Link from "next/link";

const navLinks = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#architecture", label: "Architecture" },
  { href: "#proof", label: "Proof" },
];

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="CampusPots" className="h-7" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="text-sm text-muted hover:text-foreground transition-colors px-4 py-2">
            Connect
          </button>
          <button className="text-sm bg-accent hover:bg-accent-light text-black font-medium px-4 py-2 rounded-lg transition-colors">
            Create a pot
          </button>
        </div>
      </div>
    </nav>
  );
}
