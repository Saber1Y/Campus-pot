"use client";

import { useState } from "react";

interface CreatePotModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreatePotModal({ open, onClose }: CreatePotModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [deadline, setDeadline] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-surface border border-border rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/40">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Create a pot
            </h2>
            <p className="text-sm text-muted mt-1">
              Set up a new fundraising pot
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-muted hover:text-foreground transition-colors p-1"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm text-muted mb-1.5">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Help build the community garden"
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted/40 focus:outline-none focus:border-accent/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-muted mb-1.5">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell people what this pot is for..."
              rows={3}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted/40 focus:outline-none focus:border-accent/50 transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-sm text-muted mb-1.5">
              Goal amount (USDC)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={goalAmount}
              onChange={(e) => setGoalAmount(e.target.value)}
              placeholder="1000"
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted/40 focus:outline-none focus:border-accent/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-muted mb-1.5">Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted/40 focus:outline-none focus:border-accent/50 transition-colors"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 pt-0 border-t border-border">
          <button
            onClick={onClose}
            className="text-sm text-muted hover:text-foreground transition-colors px-4 py-2"
          >
            Cancel
          </button>
          <button
            disabled={
              !title.trim() || !goalAmount || parseFloat(goalAmount) <= 0
            }
            className="text-sm bg-accent hover:bg-accent-light text-black font-medium px-6 py-2 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Create pot
          </button>
        </div>
      </div>
    </div>
  );
}
