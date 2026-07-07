import FadeInView from "./FadeInView";

const cards = [
  {
    title: "Deployed contract",
    description: "View the CampusPots contract on Arbiscan",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-accent-light">
        <path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Sample transaction",
    description: "See a real contribution routed through UA",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-accent-light">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "GitHub repo",
    description: "Source code, contracts, and frontend",
    href: "https://github.com/Saber1Y/Campus-pot",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-accent-light">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12c0-5.523-4.477-10-10-10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function TransparencySection() {
  return (
    <section className="py-24 md:py-32 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <FadeInView>
          <div className="mb-16">
            <span className="text-xs font-mono text-accent tracking-widest">
              TRANSPARENCY
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">Verify it yourself</h2>
          </div>
        </FadeInView>

        <div className="grid md:grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <FadeInView key={card.title} delay={i * 0.1}>
              <a
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="block border border-border hover:border-accent/30 bg-surface rounded-xl p-6 transition-all hover:bg-surface-light group"
              >
                <div className="mb-4">{card.icon}</div>
                <h3 className="font-semibold mb-1 group-hover:text-accent-light transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-muted">{card.description}</p>
              </a>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
