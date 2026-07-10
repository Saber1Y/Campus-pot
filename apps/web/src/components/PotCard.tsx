import Link from "next/link";

interface PotCardProps {
  id: number;
  title: string;
  description: string;
  goalAmount: string;
  totalRaised: string;
  deadline: string;
  creator: string;
  contributorCount: number;
  status: "active" | "withdrawn" | "cancelled";
}

const statusConfig = {
  active: { label: "Active", color: "text-green-400", dot: "bg-green-500" },
  withdrawn: {
    label: "Withdrawn",
    color: "text-blue-400",
    dot: "bg-blue-500",
  },
  cancelled: { label: "Cancelled", color: "text-red-400", dot: "bg-red-500" },
};

export default function PotCard({
  id,
  title,
  description,
  goalAmount,
  totalRaised,
  deadline,
  creator,
  contributorCount,
  status,
}: PotCardProps) {
  const sc = statusConfig[status];
  const progress = Math.min(
    Number(totalRaised) / Number(goalAmount),
    1
  );

  return (
    <Link href={`/pots/${id}`}>
      <div className="group border border-border hover:border-accent/30 bg-surface rounded-xl p-6 transition-all hover:bg-surface-light hover:shadow-lg hover:shadow-accent/5 cursor-pointer">
        {/* Top row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground truncate group-hover:text-accent-light transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted mt-1 line-clamp-2 leading-relaxed">
              {description}
            </p>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-mono ${sc.color} bg-surface-light border border-border rounded-full px-3 py-1 ml-4 shrink-0`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
            {sc.label}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-1.5">
            <span className="text-foreground font-medium">
              ${Number(totalRaised).toLocaleString()}
            </span>
            <span className="text-muted">
              of ${Number(goalAmount).toLocaleString()}
            </span>
          </div>
          <div className="h-2 bg-surface-hover rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-500"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between text-xs text-muted">
          <div className="flex items-center gap-3">
            <span>{contributorCount} contributors</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="font-mono">
              {creator.slice(0, 6)}...{creator.slice(-4)}
            </span>
          </div>
          <span className="font-mono">{deadline}</span>
        </div>

        {/* CTA */}
        <div className="mt-4 pt-3 border-t border-border">
          <span className="text-xs text-accent-light font-mono group-hover:opacity-100 opacity-0 transition-opacity">
            View pot &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
