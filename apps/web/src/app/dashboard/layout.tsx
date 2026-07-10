import { Suspense } from "react";
import DashboardShell from "./DashboardShell";

export const metadata = {
  title: "Dashboard — CampusPots",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={null}>
      <DashboardShell>{children}</DashboardShell>
    </Suspense>
  );
}
