"use client";

import { usePots } from "@/hooks/usePots";
import FadeInView from "@/components/FadeInView";
import PotCard from "@/components/PotCard";

export default function DashboardContent() {
  const { pots, loading } = usePots();

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <FadeInView>
        <div className="mb-10">
          <span className="text-xs font-mono text-accent tracking-widest">
            EXPLORE
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">All pots</h1>
          <p className="text-muted mt-2 max-w-xl">
            Browse active fundraising pots. Connect your wallet to contribute
            from any chain.
          </p>
        </div>
      </FadeInView>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <span className="w-5 h-5 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
        </div>
      ) : pots.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-muted">No pots yet. Create the first one!</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pots.map((pot, i) => (
            <FadeInView key={pot.id} delay={i * 0.05}>
              <PotCard {...pot} />
            </FadeInView>
          ))}
        </div>
      )}
    </div>
  );
}
