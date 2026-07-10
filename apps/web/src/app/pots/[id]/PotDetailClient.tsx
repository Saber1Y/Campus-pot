"use client";

import { useState } from "react";
import Link from "next/link";
import ContributeModal from "@/components/ContributeModal";

interface PotData {
  id: number;
  title: string;
  description: string;
  goalAmount: string;
  totalRaised: string;
  deadline: string;
  creator: string;
  contributorCount: number;
  status: "active" | "withdrawn" | "cancelled";
  contributors: { address: string; amount: string; message: string | null }[];
}

export default function PotDetailClient({ pot }: { pot: PotData }) {
  const [showContribute, setShowContribute] = useState(false);

  const progress = Math.min(
    Number(pot.totalRaised) / Number(pot.goalAmount),
    1
  );
  const isActive = pot.status === "active";

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 pt-28">
      {/* Back link */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors mb-8"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to pots
      </Link>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left — main info */}
        <div className="md:col-span-2 space-y-6">
          {/* Title + status */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              {pot.status === "active" && (
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-green-400 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Active
                </span>
              )}
              {pot.status === "withdrawn" && (
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Withdrawn
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              {pot.title}
            </h1>
          </div>

          {/* Description */}
          <p className="text-muted leading-relaxed">{pot.description}</p>

          {/* Progress */}
          <div>
            <div className="flex items-center justify-between text-sm mb-1.5">
              <span className="text-foreground font-medium">
                ${Number(pot.totalRaised).toLocaleString()}{" "}
                <span className="text-muted font-normal">
                  raised of ${Number(pot.goalAmount).toLocaleString()} goal
                </span>
              </span>
            </div>
            <div className="h-3 bg-surface-hover rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex items-center gap-6 text-sm">
            <div>
              <span className="text-muted">Contributors</span>
              <p className="text-foreground font-medium">
                {pot.contributorCount}
              </p>
            </div>
            <div>
              <span className="text-muted">Deadline</span>
              <p className="text-foreground font-medium">{pot.deadline}</p>
            </div>
            <div>
              <span className="text-muted">Created by</span>
              <p className="text-foreground font-mono text-xs">
                {pot.creator.slice(0, 8)}...{pot.creator.slice(-6)}
              </p>
            </div>
          </div>

          {/* CTA */}
          {isActive && (
            <button
              onClick={() => setShowContribute(true)}
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-black font-medium px-6 py-3 rounded-xl transition-colors text-base"
            >
              Contribute from any chain
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          )}
          {!isActive && (
            <div className="inline-flex items-center gap-2 bg-surface border border-border rounded-xl px-5 py-3 text-sm text-muted">
              This pot is {pot.status}
            </div>
          )}
        </div>

        {/* Right — contributors */}
        <div className="bg-surface border border-border rounded-xl p-5">
          <h3 className="text-sm font-medium text-foreground mb-4">
            Contributors
          </h3>
          <div className="space-y-3">
            {pot.contributors.map((c, i) => (
              <div
                key={i}
                className="border-b border-border last:border-0 pb-3 last:pb-0"
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-mono text-xs text-foreground">
                    {c.address}
                  </span>
                  <span className="text-sm text-accent-light font-medium">
                    ${c.amount}
                  </span>
                </div>
                {c.message && (
                  <p className="text-xs text-muted mt-0.5 italic">
                    &ldquo;{c.message}&rdquo;
                  </p>
                )}
              </div>
            ))}
          </div>
          {pot.contributors.length === 0 && (
            <p className="text-sm text-muted">No contributions yet</p>
          )}
        </div>
      </div>

      <ContributeModal
        open={showContribute}
        onClose={() => setShowContribute(false)}
        potId={pot.id}
        potTitle={pot.title}
      />
    </div>
  );
}
