"use client";

import { useEffect, useState } from "react";
import { createPublicClient, http } from "viem";
import { arbitrum } from "viem/chains";
import { CAMPUSPOTS_ABI } from "@campuspots/shared";
import { fromUSDCUnits } from "@/lib/ua";

export interface PotItem {
  id: number;
  title: string;
  description: string;
  goalAmount: string;
  totalRaised: string;
  deadline: string;
  creator: string;
  contributorCount: number;
  status: "active" | "withdrawn" | "cancelled";
}

export interface PotDetail extends PotItem {
  contributors: { address: string; amount: string; message: string | null }[];
}

const CONTRACT = process.env.NEXT_PUBLIC_CAMPUSPOTS_CONTRACT!;
const isDeployed = CONTRACT !== "0x0000000000000000000000000000000000000000";

const SAMPLE_POTS: PotItem[] = [
  { id: 1, title: "Community Garden Project", description: "Help us build a sustainable community garden in the downtown area with raised beds, irrigation, and a greenhouse.", goalAmount: "5000", totalRaised: "3200", deadline: "Jul 15, 2026", creator: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18", contributorCount: 24, status: "active" },
  { id: 2, title: "Student Hackathon Trip", description: "Sending 10 students to the ETHGlobal hackathon. Need funds for travel, accommodation, and equipment.", goalAmount: "2500", totalRaised: "2500", deadline: "Jun 1, 2026", creator: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063", contributorCount: 42, status: "withdrawn" },
  { id: 3, title: "Open Source Library Dev", description: "Funding continued development of our Solidity testing library.", goalAmount: "10000", totalRaised: "1800", deadline: "Aug 20, 2026", creator: "0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec", contributorCount: 15, status: "active" },
  { id: 4, title: "Local Art Mural Fund", description: "Bringing a large-scale mural to the east side of town.", goalAmount: "3500", totalRaised: "3500", deadline: "May 30, 2026", creator: "0xd8da6bf26964aF9D7eEd9e03E53415D37aA96045", contributorCount: 58, status: "withdrawn" },
  { id: 5, title: "Music Festival Stage", description: "Help fund the main stage for this year's local music festival.", goalAmount: "8000", totalRaised: "2400", deadline: "Sep 1, 2026", creator: "0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5", contributorCount: 31, status: "active" },
  { id: 6, title: "Youth Coding Camp", description: "A week-long coding camp for underprivileged youth.", goalAmount: "6000", totalRaised: "900", deadline: "Jul 1, 2026", creator: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B", contributorCount: 8, status: "active" },
];

const SAMPLE_CONTRIBUTORS: Record<number, { address: string; amount: string; message: string | null }[]> = {
  1: [
    { address: "0x1234...5678", amount: "500", message: "Great project!" },
    { address: "0x8765...4321", amount: "200", message: "Happy to help" },
    { address: "0xabcd...ef01", amount: "1000", message: "Go team!" },
  ],
  2: [
    { address: "0x1111...2222", amount: "100", message: null },
    { address: "0x3333...4444", amount: "50", message: "Good luck!" },
  ],
};

function fetchContractPots(client: ReturnType<typeof createPublicClient>): Promise<(PotItem | null)[]> {
  return client.readContract({
    address: CONTRACT as `0x${string}`,
    abi: CAMPUSPOTS_ABI,
    functionName: "getPotCount",
  }).then((count) => {
    if (count === BigInt(0)) return [];
    return Promise.all(
      Array.from({ length: Number(count) }, (_, i) =>
        client.readContract({
          address: CONTRACT as `0x${string}`,
          abi: CAMPUSPOTS_ABI,
          functionName: "getPot",
          args: [BigInt(i)],
        }).then((raw) => {
          const d = new Date(Number(raw.deadline) * 1000);
          const from = fromUSDCUnits(raw.totalRaised.toString());
          const goal = fromUSDCUnits(raw.goalAmount.toString());
          return {
            id: i,
            title: `Pot #${i}`,
            description: "",
            goalAmount: goal,
            totalRaised: from,
            deadline: d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            creator: raw.creator,
            contributorCount: 0,
            status: raw.cancelled ? "cancelled" as const : raw.withdrawn ? "withdrawn" as const : "active" as const,
          };
        })
      )
    );
  });
}

export function usePots() {
  const [pots, setPots] = useState<PotItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isDeployed) {
      setPots(SAMPLE_POTS);
      setLoading(false);
      return;
    }

    let done = false;
    const client = createPublicClient({ chain: arbitrum, transport: http("https://arb1.arbitrum.io/rpc") });

    fetchContractPots(client)
      .then((items) => { if (!done) setPots(items.filter(Boolean) as PotItem[]); })
      .catch(() => { if (!done) setPots(SAMPLE_POTS); })
      .finally(() => { if (!done) setLoading(false); });

    return () => { done = true; };
  }, []);

  return { pots, loading };
}

export function usePotDetail(id: number) {
  const [pot, setPot] = useState<PotDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isDeployed) {
      const s = SAMPLE_POTS.find((p) => p.id === id);
      setPot(s ? { ...s, contributors: SAMPLE_CONTRIBUTORS[id] ?? [] } : null);
      setLoading(false);
      return;
    }

    let done = false;
    const client = createPublicClient({ chain: arbitrum, transport: http("https://arb1.arbitrum.io/rpc") });

    client.readContract({ address: CONTRACT as `0x${string}`, abi: CAMPUSPOTS_ABI, functionName: "getPot", args: [BigInt(id)] })
      .then((raw) => {
        if (done) return;
        const d = new Date(Number(raw.deadline) * 1000);
        setPot({
          id,
          title: `Pot #${id}`,
          description: "",
          goalAmount: fromUSDCUnits(raw.goalAmount.toString()),
          totalRaised: fromUSDCUnits(raw.totalRaised.toString()),
          deadline: d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
          creator: raw.creator,
          contributorCount: 0,
          status: raw.cancelled ? "cancelled" : raw.withdrawn ? "withdrawn" : "active",
          contributors: [],
        });
      })
      .catch(() => {
        if (done) return;
        const s = SAMPLE_POTS.find((p) => p.id === id);
        setPot(s ? { ...s, contributors: SAMPLE_CONTRIBUTORS[id] ?? [] } : null);
      })
      .finally(() => { if (!done) setLoading(false); });

    return () => { done = true; };
  }, [id]);

  return { pot, loading };
}
