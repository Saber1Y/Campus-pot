"use client";

import { useState } from "react";
import DashboardNav from "@/components/DashboardNav";
import CreatePotModal from "@/components/CreatePotModal";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <>
      <DashboardNav onCreatePot={() => setShowCreate(true)} />
      <main className="pt-16 min-h-screen">{children}</main>
      <CreatePotModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
      />
    </>
  );
}
