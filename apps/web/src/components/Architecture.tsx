import FadeInView from "./FadeInView";

type NodeColor = "green" | "amber" | "blue" | "indigo" | "gray";

interface FlowNode {
  id: string;
  label: string;
  color: NodeColor;
  icon: React.ReactNode;
  subtitle?: string;
}

const colorMap: Record<NodeColor, { iconBg: string; border: string; text: string }> = {
  green: { iconBg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400" },
  amber: { iconBg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-400" },
  blue: { iconBg: "bg-sky-500/10", border: "border-sky-500/20", text: "text-sky-400" },
  indigo: { iconBg: "bg-indigo-500/10", border: "border-indigo-500/20", text: "text-indigo-400" },
  gray: { iconBg: "bg-zinc-500/10", border: "border-zinc-500/20", text: "text-zinc-400" },
};

const iconPlus = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v8M8 12h8" />
  </svg>
);

const iconCross = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 12H4" />
    <path d="M12 4v16" />
    <circle cx="12" cy="12" r="10" />
  </svg>
);

const iconRoute = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="4" r="2" />
    <circle cx="5" cy="20" r="2" />
    <circle cx="19" cy="20" r="2" />
    <path d="M12 6v3l-5 9M12 9l5 9" />
  </svg>
);

const iconShield = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" />
    <path d="M2 7l10 5 10-5M12 22V12" />
  </svg>
);

const iconDB = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

const iconArrowUp = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v20M2 12h20" />
    <path d="M5 9l7-7 7 7" />
  </svg>
);

const iconClock = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const nodes: FlowNode[] = [
  { id: "create", label: "Create Pot", subtitle: "Trigger", color: "green", icon: iconPlus },
  { id: "contribute", label: "Contribute", subtitle: "Action", color: "blue", icon: iconCross },
  { id: "particle-ua", label: "Particle UA", subtitle: "Routing", color: "amber", icon: iconRoute },
  { id: "arbitrum", label: "Arbitrum", subtitle: "Settlement", color: "indigo", icon: iconShield },
  { id: "supabase", label: "Supabase", subtitle: "Metadata", color: "gray", icon: iconDB },
];

const branchWithdraw: FlowNode = { id: "withdraw", label: "Withdraw", subtitle: "Goal met", color: "green", icon: iconArrowUp };
const branchOpen: FlowNode = { id: "open", label: "Open", subtitle: "Awaiting funds", color: "gray", icon: iconClock };

function NodeCard({ node, success = true }: { node: FlowNode; success?: boolean }) {
  const c = colorMap[node.color];
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-[68px] h-[68px] rounded-[18px] bg-surface border border-border shadow-lg shadow-black/20 flex items-center justify-center group hover:border-accent/30 transition-colors cursor-default">
        <div className={`w-10 h-10 rounded-xl ${c.iconBg} ${c.border} border flex items-center justify-center ${c.text}`}>
          {node.icon}
        </div>
        {success && (
          <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500 border-2 border-background flex items-center justify-center shadow-sm">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
        )}
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-border" />
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-border" />
        <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-2 h-2 rounded-full bg-border" />
        <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2 h-2 rounded-full bg-border" />
      </div>
      <span className="text-sm font-medium text-foreground">{node.label}</span>
      {node.subtitle && <span className="text-[11px] text-muted -mt-2.5 font-mono">{node.subtitle}</span>}
    </div>
  );
}

function DashedArrow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg width="52" height="2" viewBox="0 0 52 2" fill="none" className="text-border shrink-0">
        <line x1="0" y1="1" x2="48" y2="1" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" />
        <path d="M46 0l4 1-4 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </div>
  );
}

function ConditionalBranch() {
  return (
    <div className="flex flex-col items-center gap-1 mt-1">
      <svg width="2" height="20" viewBox="0 0 2 20" fill="none">
        <line x1="1" y1="0" x2="1" y2="18" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" strokeLinecap="round" className="text-border" />
        <path d="M0 16l1 2 1-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" className="text-border" />
      </svg>
      <div className="flex items-center gap-10 relative">
        <div className="flex items-center">
          <div className="h-px w-12 border-t border-dashed border-emerald-500/40 relative">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-emerald-400/80">Yes</span>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-500/40 shrink-0" />
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-red-500/40 shrink-0" />
          <div className="h-px w-12 border-t border-dashed border-red-500/40 relative">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-red-400/80">No</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-[104px]">
        <svg width="2" height="18" viewBox="0 0 2 18" fill="none">
          <line x1="1" y1="0" x2="1" y2="16" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" strokeLinecap="round" className="text-emerald-500/30" />
          <path d="M0 14l1 2 1-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" className="text-emerald-500/30" />
        </svg>
        <svg width="2" height="18" viewBox="0 0 2 18" fill="none">
          <line x1="1" y1="0" x2="1" y2="16" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" strokeLinecap="round" className="text-red-500/30" />
          <path d="M0 14l1 2 1-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" className="text-red-500/30" />
        </svg>
      </div>
    </div>
  );
}

export default function Architecture() {
  return (
    <section id="architecture" className="py-24 md:py-32 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <FadeInView>
          <div className="mb-16">
            <span className="text-xs font-mono text-accent tracking-widest">INFRASTRUCTURE</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">Architecture</h2>
          </div>
        </FadeInView>

        <FadeInView delay={0.2}>
          <div className="bg-surface border border-border rounded-2xl p-8 md:p-12 overflow-x-auto">
            <div className="min-w-[700px] flex flex-col items-center">
              {/* Main flow */}
              <div className="flex items-center">
                {nodes.slice(0, 4).map((node, i) => (
                  <div key={node.id} className="flex items-center">
                    <NodeCard node={node} />
                    {i < 3 && <DashedArrow className="mx-3" />}
                  </div>
                ))}
              </div>

              <ConditionalBranch />

              {/* Branch nodes */}
              <div className="flex items-center gap-[104px] mb-2">
                <NodeCard node={branchWithdraw} />
                <NodeCard node={branchOpen} />
              </div>

              {/* Merge back */}
              <div className="flex items-center gap-[104px] -mt-[2px]">
                <svg width="2" height="18" viewBox="0 0 2 18" fill="none">
                  <line x1="1" y1="2" x2="1" y2="16" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" strokeLinecap="round" className="text-border" />
                  <path d="M0 4l1-2 1 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" className="text-border" />
                </svg>
                <svg width="2" height="18" viewBox="0 0 2 18" fill="none">
                  <line x1="1" y1="2" x2="1" y2="16" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" strokeLinecap="round" className="text-border" />
                  <path d="M0 4l1-2 1 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" className="text-border" />
                </svg>
              </div>

              {/* Final node */}
              <div className="flex items-center mt-[2px]">
                <DashedArrow className="mr-3" />
                <NodeCard node={nodes[4]} />
              </div>
            </div>

            <p className="text-center text-xs text-muted mt-10 font-mono">
              All components live · Transactions route through Particle UA into Arbitrum · Metadata indexed to Supabase
            </p>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
