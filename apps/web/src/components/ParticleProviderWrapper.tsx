"use client";

import dynamic from "next/dynamic";

const ParticleAuthProvider = dynamic(
  () => import("@/providers/ParticleAuthProvider"),
  { ssr: false }
);

export default function ParticleProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ParticleAuthProvider>{children}</ParticleAuthProvider>;
}
