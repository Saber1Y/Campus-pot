import { notFound } from "next/navigation";
import PotDetailClient from "./PotDetailClient";

const samplePots = [
  {
    id: 1,
    title: "Community Garden Project",
    description:
      "Help us build a sustainable community garden in the downtown area with raised beds, irrigation, and a greenhouse.",
    goalAmount: "5000",
    totalRaised: "3200",
    deadline: "Jul 15, 2026",
    creator: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18",
    contributorCount: 24,
    status: "active" as const,
    contributors: [
      { address: "0x1234...5678", amount: "500", message: "Great project!" },
      { address: "0x8765...4321", amount: "200", message: "Happy to help" },
      { address: "0xabcd...ef01", amount: "1000", message: "Go team!" },
    ],
  },
  {
    id: 2,
    title: "Student Hackathon Trip",
    description:
      "Sending 10 students to the ETHGlobal hackathon. Need funds for travel, accommodation, and equipment.",
    goalAmount: "2500",
    totalRaised: "2500",
    deadline: "Jun 1, 2026",
    creator: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    contributorCount: 42,
    status: "withdrawn" as const,
    contributors: [
      { address: "0x1111...2222", amount: "100", message: null },
      { address: "0x3333...4444", amount: "50", message: "Good luck!" },
    ],
  },
];

export default async function PotDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pot = samplePots.find((p) => p.id === Number(id));
  if (!pot) notFound();

  return <PotDetailClient pot={pot} />;
}
