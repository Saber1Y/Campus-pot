"use client";

import { useState } from "react";
import { useAuth, useUniversalAccount } from "@/hooks/useCampusPots";

interface ContributeModalProps {
  open: boolean;
  onClose: () => void;
  potId: number;
  potTitle: string;
}

export default function ContributeModal({
  open,
  onClose,
  potId,
  potTitle,
}: ContributeModalProps) {
  const { address } = useAuth();
  const { contribute, initializing } = useUniversalAccount();
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleContribute = async () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setSending(true);
    setError("");

    try {
      await contribute({
        potId,
        amount,
        message: message.trim() || "Contribution",
      });
      setAmount("");
      setMessage("");
      onClose();
    } catch (e: any) {
      setError(e?.message ?? "Failed to contribute");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-surface border border-border rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Contribute
            </h2>
            <p className="text-sm text-muted mt-1 truncate max-w-[280px]">
              {potTitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-muted hover:text-foreground transition-colors p-1"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm text-muted mb-1.5">Amount (USDC)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="10"
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted/40 focus:outline-none focus:border-accent/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-muted mb-1.5">Pay from</label>
            <div className="bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500 shrink-0" />
              <span>Auto (best route via Particle UA)</span>
            </div>
            <p className="text-xs text-muted/60 mt-1.5">
              Your USDC is sourced from any chain you hold it on
            </p>
          </div>

          <div>
            <label className="block text-sm text-muted mb-1.5">
              Message <span className="text-muted/40">(optional)</span>
            </label>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Good luck!"
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted/40 focus:outline-none focus:border-accent/50 transition-colors"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">{error}</p>
          )}

          {!address && (
            <p className="text-sm text-accent bg-accent/10 border border-accent/20 rounded-lg px-4 py-2">
              Connect your wallet first to contribute
            </p>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 p-6 pt-0 border-t border-border">
          <button
            onClick={onClose}
            className="text-sm text-muted hover:text-foreground transition-colors px-4 py-2"
          >
            Cancel
          </button>
          <button
            onClick={handleContribute}
            disabled={!amount || parseFloat(amount) <= 0 || !address || sending || initializing}
            className="text-sm bg-accent hover:bg-accent-light text-black font-medium px-6 py-2 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {sending && (
              <span className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            )}
            {sending ? "Sending..." : `Contribute $${amount || "0"} USDC`}
          </button>
        </div>
      </div>
    </div>
  );
}
