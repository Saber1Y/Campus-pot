// CampusPots shared types and ABIs

export const CAMPUSPOTS_ABI = [
  {
    type: "function",
    name: "createPot",
    inputs: [
      { name: "payoutAddress", type: "address", internalType: "address" },
      { name: "token", type: "address", internalType: "address" },
      { name: "goalAmount", type: "uint256", internalType: "uint256" },
      { name: "deadline", type: "uint256", internalType: "uint256" },
      { name: "metadataURI", type: "string", internalType: "string" },
    ],
    outputs: [{ name: "potId", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "contribute",
    inputs: [
      { name: "potId", type: "uint256", internalType: "uint256" },
      { name: "amount", type: "uint256", internalType: "uint256" },
      { name: "message", type: "string", internalType: "string" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "withdraw",
    inputs: [{ name: "potId", type: "uint256", internalType: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "cancelPot",
    inputs: [{ name: "potId", type: "uint256", internalType: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getPot",
    inputs: [{ name: "potId", type: "uint256", internalType: "uint256" }],
    outputs: [
      {
        type: "tuple",
        name: "",
        components: [
          { name: "creator", type: "address", internalType: "address" },
          { name: "payoutAddress", type: "address", internalType: "address" },
          { name: "token", type: "address", internalType: "address" },
          { name: "goalAmount", type: "uint256", internalType: "uint256" },
          { name: "totalRaised", type: "uint256", internalType: "uint256" },
          { name: "deadline", type: "uint256", internalType: "uint256" },
          { name: "withdrawn", type: "bool", internalType: "bool" },
          { name: "cancelled", type: "bool", internalType: "bool" },
        ],
        internalType: "struct CampusPots.Pot",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getContributors",
    inputs: [{ name: "potId", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "address[]", internalType: "address[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getContribution",
    inputs: [
      { name: "potId", type: "uint256", internalType: "uint256" },
      { name: "contributor", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPotCount",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "PotCreated",
    inputs: [
      { name: "potId", type: "uint256", indexed: true, internalType: "uint256" },
      { name: "creator", type: "address", indexed: true, internalType: "address" },
      { name: "token", type: "address", indexed: true, internalType: "address" },
      { name: "goalAmount", type: "uint256", indexed: false, internalType: "uint256" },
      { name: "deadline", type: "uint256", indexed: false, internalType: "uint256" },
      { name: "metadataURI", type: "string", indexed: false, internalType: "string" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ContributionReceived",
    inputs: [
      { name: "potId", type: "uint256", indexed: true, internalType: "uint256" },
      { name: "contributor", type: "address", indexed: true, internalType: "address" },
      { name: "amount", type: "uint256", indexed: false, internalType: "uint256" },
      { name: "message", type: "string", indexed: false, internalType: "string" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PotWithdrawn",
    inputs: [
      { name: "potId", type: "uint256", indexed: true, internalType: "uint256" },
      { name: "creator", type: "address", indexed: true, internalType: "address" },
      { name: "amount", type: "uint256", indexed: false, internalType: "uint256" },
      { name: "to", type: "address", indexed: true, internalType: "address" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PotCancelled",
    inputs: [
      { name: "potId", type: "uint256", indexed: true, internalType: "uint256" },
      { name: "creator", type: "address", indexed: true, internalType: "address" },
    ],
    anonymous: false,
  },
] as const;

export interface Pot {
  creator: string;
  payoutAddress: string;
  token: string;
  goalAmount: bigint;
  totalRaised: bigint;
  deadline: bigint;
  withdrawn: boolean;
  cancelled: boolean;
}

export const SUPPORTED_CHAINS = {
  ARBITRUM_ONE: 42161,
  BASE: 8453,
  ETHEREUM: 1,
  BNB_CHAIN: 56,
  SOLANA: 101,
} as const;

export const USDC_ADDRESSES: Record<number, string> = {
  [SUPPORTED_CHAINS.ARBITRUM_ONE]: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
  [SUPPORTED_CHAINS.BASE]: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  [SUPPORTED_CHAINS.ETHEREUM]: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  [SUPPORTED_CHAINS.BNB_CHAIN]: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
};
