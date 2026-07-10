"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useCampusPots";

export default function DashboardNav({
  onCreatePot,
}: {
  onCreatePot: () => void;
}) {
  const { login, logout, connected, connecting, address } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <img src="/logo.svg" alt="CampusPots" className="h-7" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/dashboard"
            className="text-sm text-foreground font-medium transition-colors"
          >
            Pots
          </Link>
          <Link
            href="/dashboard"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            My pots
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {connected && address ? (
            <>
              <button
                onClick={onCreatePot}
                className="text-sm bg-accent hover:bg-accent-light text-black font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Create a pot
              </button>
              <div className="flex items-center gap-2 bg-surface border border-border rounded-lg px-3 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-xs font-mono text-muted">
                  {address.slice(0, 6)}...{address.slice(-4)}
                </span>
              </div>
              <button
                onClick={logout}
                className="text-xs text-muted hover:text-foreground transition-colors px-2"
              >
                Disconnect
              </button>
            </>
          ) : (
            <button
              onClick={login}
              disabled={connecting}
              className="text-sm bg-accent hover:bg-accent-light text-black font-medium px-5 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {connecting ? "Connecting..." : "Connect"}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
