import FadeInView from "@/components/FadeInView";
import PotCard from "@/components/PotCard";

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
  },
  {
    id: 3,
    title: "Open Source Library Dev",
    description:
      "Funding continued development of our Solidity testing library. Every contribution goes to audit costs.",
    goalAmount: "10000",
    totalRaised: "1800",
    deadline: "Aug 20, 2026",
    creator: "0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec",
    contributorCount: 15,
    status: "active" as const,
  },
  {
    id: 4,
    title: "Local Art Mural Fund",
    description:
      "Bringing a large-scale mural to the east side of town. Artists have been commissioned and materials are ready.",
    goalAmount: "3500",
    totalRaised: "3500",
    deadline: "May 30, 2026",
    creator: "0xd8da6bf26964aF9D7eEd9e03E53415D37aA96045",
    contributorCount: 58,
    status: "withdrawn" as const,
  },
  {
    id: 5,
    title: "Music Festival Stage",
    description:
      "Help fund the main stage for this year's local music festival. Every dollar goes directly to sound and lighting.",
    goalAmount: "8000",
    totalRaised: "2400",
    deadline: "Sep 1, 2026",
    creator: "0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5",
    contributorCount: 31,
    status: "active" as const,
  },
  {
    id: 6,
    title: "Youth Coding Camp",
    description:
      "A week-long coding camp for underprivileged youth. Covers laptops, instructors, meals, and transportation.",
    goalAmount: "6000",
    totalRaised: "900",
    deadline: "Jul 1, 2026",
    creator: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B",
    contributorCount: 8,
    status: "active" as const,
  },
];

export default function DashboardPage() {
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

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {samplePots.map((pot, i) => (
          <FadeInView key={pot.id} delay={i * 0.05}>
            <PotCard {...pot} />
          </FadeInView>
        ))}
      </div>
    </div>
  );
}
